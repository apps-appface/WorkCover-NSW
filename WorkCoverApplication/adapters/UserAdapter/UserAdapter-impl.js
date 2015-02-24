var verifyUserStatement = WL.Server
		.createSQLStatement("select * from USER where user_name=? and user_password=?;");

function verifyUser(name, password) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : verifyUserStatement,
		parameters : [ name, password ]
	});
}

var getUserStatement = WL.Server
.createSQLStatement("select * from USER where user_id=?;");

function getUserData(userId) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getUserStatement,
		parameters : [ userId ]
	});
}


var updateUserStatement = WL.Server
.createSQLStatement("update USER set user_address1=?,user_address2=?,auto_sync_interval=?,gps_mapping=?,user_fullname=? where user_id=?;");
function updateUserData(addr1,addr2,autoSync,gpsMapping, userName,userId) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateUserStatement,
		parameters : [ addr1,addr2,autoSync,gpsMapping, userName,userId ]
	});
}

//---------------------------------------------------------------------------------------------------

function onAuthRequired(headers, errorMessage) {
	errorMessage = errorMessage ? errorMessage : null;
	return {
		authRequired : true,
		errorMessage : errorMessage
	};
}

var userDetail;

function submitAuthentication(name, password) {
	
	WL.Logger.debug("Authentication Started...");
	
	userDetail = verifyUser(name, password);

	if (userDetail.resultSet.length > 0) {
		
		var userName = userDetail.resultSet[0].user_name;
		var userId = userDetail.resultSet[0].user_id;

		WL.Logger.info('Authenticated...');

		var userIdentity = {
			userId : ""+userId,
			displayName : userName
		};

		WL.Server.setActiveUser("LoginRealm", userIdentity);

		WL.Logger.info('Logged in...');

		return {
			authRequired : false,
		};
	}
	return onAuthRequired(null, "* Invalid login credentials");
}

function onLogout() {
	WL.Server.setActiveUser("LoginRealm", null);
	WL.Logger.info('Logged out...');
}

//---------------------------------------------------------------------------------------------------

function getSecretData() {
	return {
		userId : userDetail.resultSet[0].user_id,
		userName : userDetail.resultSet[0].user_name,
		userRole:userDetail.resultSet[0].user_role,
		userMobile : userDetail.resultSet[0].user_mobile,
		userEmail : userDetail.resultSet[0].user_email,
		userAddress1:userDetail.resultSet[0].user_address1,
		userAddress2:userDetail.resultSet[0].user_address2,
		userFullName:userDetail.resultSet[0].user_fullname,
		userAutoSyncInterval:userDetail.resultSet[0].auto_sync_interval,
		userGpsMapping:userDetail.resultSet[0].gps_mapping
	};
}