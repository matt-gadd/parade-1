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
	const tabNames = ['example'];

	if (content) {
		tabNames.push('code');
	}
	if (!has('docs')) {
		tabNames.push('tests');
	}
	const tabs = [
		<div>
			<h3 classes={'text-2xl'}>Demo</h3>
			<div>{children()}</div>
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
