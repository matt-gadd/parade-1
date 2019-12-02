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
			<h3 classes={'text-3xl'}>Properties</h3>
			<div>
				<table classes={'border-collapse border-2 border-gray-400'}>
					<thead>
						<tr>
							<th classes={'border border-gray-400 px-4 py-2 text-gray-800'}>Name</th>
							<th classes={'border border-gray-400 px-4 py-2 text-gray-800'}>Type</th>
							<th classes={'border border-gray-400 px-4 py-2 text-gray-800'}>Description</th>
						</tr>
					</thead>
					<tbody>
						{props.map((prop) => {
							return (
								<tr>
									<td classes={'border border-gray-400 px-4 py-2'}>{`${prop.name}${prop.optional ? '?' : ''}`}</td>
									<td classes={'border border-gray-400 px-4 py-2'}>{prop.type}</td>
									<td classes={'border border-gray-400 px-4 py-2'}>{prop.description}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</virtual>
	);
});
