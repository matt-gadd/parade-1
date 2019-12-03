import { create, tsx } from '@dojo/framework/core/vdom';
import { PropertyInterface } from './properties.block';

interface PropertyTableProperties {
	props?: PropertyInterface[];
}

const factory = create().properties<PropertyTableProperties>();

export default factory(function PropertyTable({ properties }) {
	const { props } = properties();
	if (!props) {
		return null;
	}
	return (
		<virtual>
			<hr classes="my-8 border-b-2 border-gray-200" />
			<h2 classes={'text-3xl mb-4'}>Properties</h2>
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
							<th
								classes={
									'px-4 py-2 text-gray-800 border-r border-b border-gray-400'
								}
							>
								Type
							</th>
							<th classes={'px-4 py-2 text-gray-800 border-b border-gray-400'}>
								Description
							</th>
						</tr>
					</thead>
					<tbody>
						{props.map((prop) => {
							return (
								<tr>
									<td classes={'px-4 py-2'}>{`${prop.name}${
										prop.optional ? '?' : ''
									}`}</td>
									<td classes={'px-4 py-2'}>{prop.type}</td>
									<td classes={'px-4 py-2'}>{prop.description}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</virtual>
	);
});
