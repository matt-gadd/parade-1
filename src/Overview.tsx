import { create, tsx } from '@dojo/framework/core/vdom';

import HorizontalRule from './HorizontalRule';
import ThemeTable from './ThemeTable';
import PropertyTable from './PropertyTable';
import Example from './Example';

const factory = create().properties<{
	widgetName: string;
	widgetReadmes: any;
	widgetExamples: any;
	widgetProperties: any;
	widgetThemes: any;
	config: any;
}>();

export default factory(function Overview({ properties }) {
	const {
		config,
		widgetName,
		widgetReadmes,
		widgetExamples,
		widgetProperties,
		widgetThemes
	} = properties();

	const example = config.widgets[widgetName];
	const filename = example.overview.example.filename;
	const codesandboxPath = config.codesandboxPath(widgetName, filename);
	const examplePath = config.examplePath(widgetName, filename);
	const readmePath = config.readmePath(widgetName);

	const widgetReadme = widgetReadmes[readmePath];
	const widgetExample = widgetExamples[examplePath];
	const widgetProperty = widgetProperties[widgetName];
	const widgetTheme = widgetThemes[widgetName];

	return (
		<div>
			<div innerHTML={widgetReadme} />
			<HorizontalRule />
			<h2 classes={'text-2xl mb-4'}>Basic Usage</h2>
			<div
				classes={
					'bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4'
				}
			>
				<example.overview.example.module />
			</div>
			<div classes={'rounded-b-lg bg-gray-800'}>
				<pre classes={['bg-blue-900', 'language-ts', 'rounded', 'px-4', 'py-4']}>
					<code classes={['language-ts']} innerHTML={widgetExample} />
				</pre>
			</div>
			<div classes={'my-4'}>
				<a href={codesandboxPath}>
					<img
						alt={`Edit ${examplePath} example`}
						src="https://codesandbox.io/static/img/play-codesandbox.svg"
					/>
				</a>
			</div>
			<PropertyTable props={widgetProperty} />
			<ThemeTable themes={widgetTheme} />
		</div>
	);
});
