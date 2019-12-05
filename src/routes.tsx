export default [
	{
		path: '/',
		outlet: 'landing',
		defaultRoute: true
	},
	{
		path: 'widget/{widget}',
		children: [
			{
				path: 'tests',
				outlet: 'tests'
			},
			{
				path: 'overview',
				outlet: 'overview'
			},
			{
				path: 'example/{example}',
				outlet: 'example'
			}
		]
	}
];
