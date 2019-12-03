import { create, tsx } from '@dojo/framework/core/vdom';
import injector from '@dojo/framework/core/middleware/injector';

interface ExampleProperties {
	content?: string;
	widgetName: string;
}

const factory = create({ injector }).properties<ExampleProperties>();

export default factory(function Example({ children, properties, middleware: { injector } }) {
	const { content } = properties();

	const tabs = [
		<div
			classes={
				'bg-white rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 p-4'
			}
		>
			{children()}
		</div>
	];
	if (content) {
		tabs.push(
			<div classes={'rounded-b-lg bg-gray-800'}>
				<pre classes={['bg-blue-900', 'language-ts', 'rounded', 'px-4', 'py-4']}>
					<code classes={['language-ts']} innerHTML={content} />
				</pre>
			</div>
		);
	}
	return <div>{tabs}</div>;
});
