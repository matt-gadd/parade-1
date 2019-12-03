export default [
	{
		path: '/',
		outlet: 'landing',
		defaultRoute: true
	},
	{
		path: 'tests/{widget}',
		outlet: 'tests'
	},
	{
		path: 'widget/{widget}',
		outlet: 'basic',
		children: [
			{
				path: '{example}',
				outlet: 'example'
			}
		]
	}
];
