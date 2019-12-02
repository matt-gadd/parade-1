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
			<h3 classes={'text-3xl'}>Theme</h3>
			<div classes={['docs']}>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(themes).map((key) => {
							return (
								<tr>
									<td>{key}</td>
									<td>{themes[key]}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</virtual>
	);
});
