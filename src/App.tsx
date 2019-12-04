import { create, tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';
import Outlet from '@dojo/framework/routing/Outlet';

import readme from './readme.block';
import getWidgetProperties from './properties.block';
import getTheme from './theme.block';
import code from './code.block';
import MainMenu from './MainMenu';
import Landing from './Landing';
import SideBar from './SideBar';
import Overview from './Overview';

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

interface AppProperties {
	config: any;
}

const factory = create({ block }).properties<AppProperties>();

export default factory(function App({ properties, middleware: { block } }) {
	const { config } = properties();
	const widgetFilenames = getWidgetFileNames(config.widgets, config.widgetPath);
	const exampleFilenames = getExampleFileNames(config.widgets, config.examplePath);
	const readmeFilenames = getReadmeFileNames(config.widgets, config.readmePath);
	if (config.home) {
		readmeFilenames.push(config.home);
	}
	const widgetReadmeContent = block(readme)(readmeFilenames) || {};
	const widgetExampleContent = block(code)(exampleFilenames) || {};
	const widgetProperties = block(getWidgetProperties)(widgetFilenames) || {};
	const widgetThemeClasses = block(getTheme)(widgetFilenames) || {};
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
							<MainMenu config={config} />
						</div>
					</div>
					<div
						id="content-wrapper"
						classes="min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5"
					>
						<div id="content">
							<div id="app" classes="flex">
								<div classes="pt-24 pb-16 lg:pt-28 w-full">
									<div classes="flex">
										<div classes="markdown px-6 xl:px-12 w-full max-w-3xl mx-auto lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4">
											<Outlet
												id="landing"
												renderer={() => {
													return (
														<Landing
															config={config}
															widgetReadmes={widgetReadmeContent}
														/>
													);
												}}
											/>
											<Outlet
												key="tests"
												id="tests"
												renderer={({ params, queryParams }) => {
													return null;
													/*const { widget: widgetName, example: exampleName } = params;
													return <Tests />*/
												}}
											/>
											<Outlet
												key="example"
												id="example"
												renderer={({ params, queryParams }) => {
													const { widget: widgetName } = params;
													return <Overview widgetName={ widgetName } config={ config } widgetReadmes={ widgetReadmeContent } widgetProperties={ widgetProperties } widgetThemes={ widgetThemeClasses } widgetExamples={ widgetExampleContent }/>
												}}
											/>
										</div>
										<div classes="hidden xl:text-sm xl:block xl:w-1/4 xl:px-6">
											{ /*<SideBar config={config} widgetName={widgetName} />*/ }
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
