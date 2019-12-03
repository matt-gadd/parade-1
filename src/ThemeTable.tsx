import { create, tsx } from '@dojo/framework/core/vdom';

interface ThemeTableProperties {
	themes?: { [index: string]: string };
}

const factory = create().properties<ThemeTableProperties>();

export default factory(function ThemeTable({ properties }) {
	const { themes } = properties();
	if (!themes) {
		return null;
	}
	return (
		<virtual>
			<hr classes="my-8 border-b-2 border-gray-200" />
			<h2 classes={'text-3xl mb-4'}>Theme</h2>
			<div classes={'bg-white rounded-lg border border-gray-400 inline-block'}>
				<table>
					<thead>
						<tr>
							<th
								classes={
									'px-4 py-2 text-gray-800 border-r border-b border-gray-400'
								}
							>
								Name
							</th>
							<th classes={'px-4 py-2 text-gray-800 border-b border-gray-400'}>
								Description
							</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(themes).map((key) => {
							return (
								<tr>
									<td classes={'px-4 py-2'}>{key}</td>
									<td classes={'px-4 py-2'}>{themes[key]}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</virtual>
	);
});
