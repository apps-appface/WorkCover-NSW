
var procedure1Statement = WL.Server
		.createSQLStatement("select * from ABN_DETAILS where abn_number = ?");
function getABNDetails(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : [ param ]
	});
}
