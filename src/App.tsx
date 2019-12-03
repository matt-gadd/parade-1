import { create, tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';
import Outlet from '@dojo/framework/routing/Outlet';
import ActiveLink from './ActiveLink';

import readme from './readme.block';
import getWidgetProperties, { PropertyInterface } from './properties.block';
import getTheme from './theme.block';
import code from './code.block';
import Example from './Example';
import ThemeTable from './ThemeTable';
import PropertyTable from './PropertyTable';

function getWidgetFileNames(config: any, widgetPathFunc: any): { [index: string]: string } {
	return Object.keys(config).reduce((newConfig, widget) => {
		return {
			...newConfig,
			[widget]: widgetPathFunc(widget, config[widget].filename)
		};
	}, {});
}

function getReadmeFileNames(config: any, readmePathFunc: any): string[] {
	const filenames: string[] = [];
	Object.keys(config).forEach((key) => {
		filenames.push(readmePathFunc(key));
	});
	return filenames;
}

function getExampleFileNames(config: any, examplePathFunc: any): string[] {
	const filenames: string[] = [];
	Object.keys(config).forEach((key) => {
		const widget = config[key];
		if (widget.overview && widget.overview.example) {
			filenames.push(examplePathFunc(key, widget.overview.example.filename));
		}
		if (widget.examples) {
			widget.examples.forEach((example: any) => {
				filenames.push(examplePathFunc(key, example.filename));
			});
		}
	});
	return filenames;
}

export function formatWidgetName(widget: string) {
	return widget
		.split('-')
		.map((item) => `${item[0].toUpperCase()}${item.slice(1)}`)
		.join(' ');
}

interface AppProperties {
	includeDocs: boolean;
	config: any;
}

const factory = create({ block }).properties<AppProperties>();

interface Content {
	[index: string]: string;
}

const main = ({
	test,
	config,
	exampleName,
	widgetName,
	widgetProperties,
	widgetThemeClasses,
	widgetExampleContent,
	widgetReadmeContent
}: any) => {
	const widgetConfig = config.widgets[widgetName];
	const { overview, examples = [] } = widgetConfig;
	const isBasic = exampleName === 'basic';
	const readmeContent = widgetReadmeContent[config.readmePath(widgetName)];
	const example = isBasic
		? overview.example
		: examples.find((example: any) => example.filename.toLowerCase() === exampleName);
	let widgetPath, content, propertyInterface, themeClasses;
	if (!test) {
		widgetPath = config.examplePath(widgetName, example.filename);
		content = widgetExampleContent[widgetPath];
		propertyInterface = widgetProperties[widgetName];
		themeClasses = widgetThemeClasses[widgetName];
	}
	return (
		<div id="content">
			<div id="app" classes="flex">
				<div classes="pt-24 pb-16 lg:pt-28 w-full">
					<div classes="flex">
						<div classes="markdown px-6 xl:px-12 w-full max-w-3xl mx-auto lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4">
							{isBasic && (
								<div>
									<div innerHTML={readmeContent} />
									<hr classes="my-8 border-b-2 border-gray-200" />
								</div>
							)}
							{!test && (
								<div>
									<h2 classes={'text-3xl mb-4'}>
										{isBasic ? 'Basic Usage' : example.title}
									</h2>
									<Example widgetName={widgetName} content={content}>
										<example.module />
									</Example>
									<div classes={'my-4'}>
										{config.codesandboxPath && (
											<a
												href={config.codesandboxPath(
													widgetName,
													example.filename
												)}
											>
												<img
													alt={`Edit ${widgetPath} example`}
													src="https://codesandbox.io/static/img/play-codesandbox.svg"
												/>
											</a>
										)}
									</div>
									{isBasic && <PropertyTable props={propertyInterface} />}
									{isBasic && <ThemeTable themes={themeClasses} />}
								</div>
							)}
							{config.tests && test && (
								<div>
									<h2 classes={'text-3xl mb-4'}>Tests</h2>
									<iframe
										classes={'w-full'}
										onload={
											"this.style.height=this.contentDocument.body.scrollHeight +'px';" as any
										}
										src={`./intern?config=intern/intern.json&widget=${widgetName}`}
									/>
								</div>
							)}
						</div>
						<div classes="hidden xl:text-sm xl:block xl:w-1/4 xl:px-6">
							<div classes="flex flex-col justify-between overflow-y-auto sticky top-16 max-h-(screen-16) pt-12 pb-4 -mt-12">
								<div classes="mb-8">
									<h5 classes="text-gray-500 uppercase tracking-wide font-bold text-sm lg:text-xs">
										{widgetName}
									</h5>
									<ul classes="mt-4 overflow-x-hidden">
										<li classes="mb-2">
											<ActiveLink
												key={'basic'}
												classes="block transition-fast hover:translate-r-2px hover:text-gray-900 text-gray-600 font-medium"
												to="example"
												params={{
													widget: widgetName,
													example: 'basic'
												}}
												activeClasses={['font-bold']}
											>
												Overview
											</ActiveLink>
										</li>
										<li classes="mb-2">
											<ActiveLink
												key={'basic'}
												classes="block transition-fast hover:translate-r-2px hover:text-gray-900 text-gray-600 font-medium"
												to="tests"
												activeClasses={['font-bold']}
											>
												Tests
											</ActiveLink>
										</li>
									</ul>
									<hr classes="my-1 border-b-2 border-gray-200" />
									<ul classes="mt-4 overflow-x-hidden">
										{(widgetConfig.examples || []).map((example: any) => {
											return (
												<li classes="mb-2">
													<ActiveLink
														key={example.filename}
														classes="block transition-fast hover:translate-r-2px hover:text-gray-900 text-gray-600 font-medium"
														to="example"
														params={{
															widget: widgetName,
															example: example.filename.toLowerCase()
														}}
														activeClasses={['font-bold']}
													>
														{example.filename
															.replace(/([A-Z])/g, ' $1')
															.trim()}
													</ActiveLink>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default factory(function App({ properties, middleware: { block } }) {
	const { config } = properties();
	const configs = config.widgets;
	const widgets = Object.keys(configs).sort();
	const widgetFilenames = getWidgetFileNames(configs, config.widgetPath);
	const exampleFilenames = getExampleFileNames(configs, config.examplePath);
	const readmeFilenames = getReadmeFileNames(configs, config.readmePath);
	if (config.home) {
		readmeFilenames.push(config.home);
	}
	let widgetReadmeContent: Content = {};
	let widgetExampleContent: Content = {};
	let widgetProperties: { [index: string]: PropertyInterface[] } = {};
	let widgetThemeClasses: { [index: string]: { [index: string]: string } } = {};
	widgetReadmeContent = block(readme)(readmeFilenames) || {};
	widgetExampleContent = block(code)(exampleFilenames) || {};
	widgetProperties = block(getWidgetProperties)(widgetFilenames) || {};
	widgetThemeClasses = block(getTheme)(widgetFilenames) || {};
	return (
		<div>
			<div
				classes={
					'flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-100 h-16 items-center'
				}
			>
				<div classes={'w-full max-w-screen-xl relative mx-auto px-6'}>
					<div classes={'flex items-center -mx-6'}>
						<div classes={'lg:w-1/4 xl:w-1/5 pl-6 pr-6 lg:pr-8'}>
							<h1 classes={'text-4xl'}>{config.name || 'Parade'}</h1>
						</div>
					</div>
				</div>
			</div>
			<div classes={'w-full max-w-screen-xl mx-auto px-6'}>
				<div classes={'lg:flex -mx-6'}>
					<div
						classes={
							'hidden fixed inset-0 pt-16 h-full bg-white z-90 w-full border-b -mb-16 lg:-mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 xl:w-1/5'
						}
					>
						<div
							classes={
								'h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:top-16 bg-white lg:bg-transparent'
							}
						>
							<nav
								classes={
									'px-6 pt-6 overflow-y-auto text-base lg:text-sm lg:py-12 lg:pl-6 lg:pr-8 sticky?lg:h-(screen-16)'
								}
							>
								<div classes="mb-10">
									{config.home && (
										<ActiveLink
											to="landing"
											classes="flex items-center px-2 -mx-2 py-1 hover:text-gray-900 font-medium text-gray-600"
											activeClasses={['font-bold']}
										>
											Home
										</ActiveLink>
									)}
									{config.home && (
										<hr classes="my-1 border-b-2 border-gray-200" />
									)}
									{widgets.map((widget) => {
										return (
											<ActiveLink
												to="example"
												classes="flex items-center px-2 -mx-2 py-1 hover:text-gray-900 font-medium text-gray-600"
												params={{
													widget,
													example: 'basic'
												}}
												matchParams={{ widget }}
												activeClasses={['font-bold']}
											>
												{formatWidgetName(widget)}
											</ActiveLink>
										);
									})}
								</div>
							</nav>
						</div>
					</div>

					<div
						id="content-wrapper"
						classes="min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5"
					>
						<Outlet
							id="landing"
							renderer={() => {
								const readmeContent = widgetReadmeContent[config.home];
								return (
									<div id="content">
										<div id="app" classes="flex">
											<div classes="pt-24 pb-16 lg:pt-28 w-full">
												<div classes="flex">
													<div classes="markdown px-6 xl:px-12 w-full max-w-3xl mx-auto lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4">
														<div innerHTML={readmeContent} />
													</div>
												</div>
											</div>
										</div>
									</div>
								);
							}}
						/>
						<Outlet
							key="tests"
							id="tests"
							renderer={({ params, queryParams }) => {
								const { widget: widgetName, example: exampleName } = params;
								return main({
									test: true,
									config,
									widgetName,
									exampleName,
									widgetProperties,
									widgetThemeClasses,
									widgetExampleContent,
									widgetReadmeContent
								});
							}}
						/>
						<Outlet
							key="example"
							id="example"
							renderer={({ params, queryParams }) => {
								const { widget: widgetName, example: exampleName } = params;
								return main({
									test: false,
									config,
									widgetName,
									exampleName,
									widgetProperties,
									widgetThemeClasses,
									widgetExampleContent,
									widgetReadmeContent
								});
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
});
