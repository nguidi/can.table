steal(
	'can/model'
,	'can/util/fixture'
,	'can/view/mustache'
,	'table.js'
,	function()
	{
		var	personasStore
		=	can.fixture.store(
				10
			,	function(i)
				{
					return	{
								id:	(i+1)
							,	nombre:	'Nombre '+(i+1)
							,	apellido: 'Apellido '+(i+1)  
							}
				}
			)

		can.fixture(
			{
				'GET /persona':	function(req)
				{
					return	personasStore
								.findAll(
									{
										data:
										{
											order:	req.data.sort ? [req.data.sort] : undefined
										,	limit:	req.data.limit
										,	offset:	req.data.skip
										,	query:	req.data.query
										}
									,	type:	'get'
									,	url:	'/persona'
									}
								)
				}
			}
		)

		var	Personas
		=	can.Model.extend(
				{
					findAll: function(query)
					{
						var	 self
						=	this

						return	can.ajax(
									{
										type:	'get'
									,	url:	'/persona'
									,	data:	query
									}
								)
					}
				}
			,	{	}
			)

		new	can.Table(
			can.$('#myTable')
		,	{
				view:	'#tableView'
			,	model:	Personas
			,	pagination:
				{
					limit:		5
				,	maxIndex:	5
				,	view:		'#paginationView'
				}
			,	sort:
				{
					desc:	'glyphicon-chevron-down'
				,	asc:	'glyphicon-chevron-up'
				,	plugin:	'glyphicon'
				}
			}
		)
	}
)