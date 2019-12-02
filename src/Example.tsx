import { create, tsx } from '@dojo/framework/core/vdom';
import injector from '@dojo/framework/core/middleware/injector';
import has from '@dojo/framework/core/has';

import * as css from './Example.m.css';

interface ExampleProperties {
	content?: string;
	widgetName: string;
}

const factory = create({ injector }).properties<ExampleProperties>();

export default factory(function Example({ children, properties, middleware: { injector } }) {
	const { content, widgetName } = properties();

	const tabs = [
		<div>
			<h3 classes={'text-2xl'}>Demo</h3>
			<div classes={'px-4 py-12 border-2 border-gray-400'}>{children()}</div>
		</div>
	];
	if (content) {
		tabs.push(
			<div>
				<h3 classes={'text-2xl'}>Code</h3>
				<pre classes={['language-ts']}>
					<code classes={['language-ts']} innerHTML={content} />
				</pre>
			</div>
		);
	}
	if (!has('docs')) {
		tabs.push(
			<div>
				<iframe
					classes={css.iframe}
					src={`./intern?config=intern/intern.json&widget=${widgetName}`}
				/>
			</div>
		);
	}
	return <div>{tabs}</div>;
});
