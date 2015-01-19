var	pluginifier
=	require('steal-tools').pluginifier
,	fs
=	require('fs')

pluginifier(
	{
		config:	__dirname+'/stealconfig.js'
	,	main:	'table'
	}
).then(
	function(pluginify)
	{
		// Get the main module, ignoring a dependency we don't want.
		var tablePlugin
		=	pluginify(
				'table'
		,	{
				ignoreAllDependencies:		true
			,	minify:						true
			,	removeDevelopmentCode:		true
			,	useNormalizedDependencies:	false
			,	format:						'steal'
			}
		)

		// writes the pluginified module.
		fs.writeFileSync(
			'table.min.js'
		,	tablePlugin
		,	'utf8'
		)
	}
)