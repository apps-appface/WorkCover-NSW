$("#settingsBack").click(function() {
	$.mobile.changePage("#loginPage");
});

$("#printer").click(function() {
	alert("Coming soon in pilot");
});

$("#saveSetting").click(function() {
	busyIndicator.show();
	 var gpsMapping = $("#slider-flip-m").val();
	var invocationData = {
			adapter : "UserAdapter",
			procedure : "updateUserData",
			parameters : [  $('#settingUserAddress1').val(),$('#settingUserAddress2').val(),$("#slider").val(),gpsMapping, $('#settingUserName').val(),user_id ]
		};

		WL.Client.invokeProcedure(invocationData, {
			onSuccess : updateUserSuccess,
			onFailure : updateUserFail
		});
});

function updateUserSuccess(result){
	var invocationData = {
			adapter : 'UserAdapter',
			procedure : 'getUserData',
			parameters : [user_id]
		};

		WL.Client.invokeProcedure(invocationData, {
			onSuccess : getUserDataSuccess,
			onFailure : getUserDataFail
		});
}

function getUserDataSuccess(result){	
	var user_detail = result.invocationResult;
	user_role=user_detail.resultSet[0].user_role;
	user_name=user_detail.resultSet[0].user_name;
	user_full_name=user_detail.resultSet[0].user_fullname;
	user_mobile=user_detail.resultSet[0].user_mobile;
	user_email=user_detail.resultSet[0].user_email;
	user_address1=user_detail.resultSet[0].user_address1;
	user_address2=user_detail.resultSet[0].user_address2;
	user_auto_sync_interval=user_detail.resultSet[0].auto_sync_interval;
	user_id=user_detail.resultSet[0].user_id;
	user_gps_mapping=user_detail.resultSet[0].gps_mapping;
	$('#welcomelbl').html("Welcome " + user_detail.resultSet[0].user_role + " " + user_detail.resultSet[0].user_fullname + " !");
	busyIndicator.hide();
	alert("Data updated successfully");
	$.mobile.changePage($("#loginPage"));
}

function updateUserFail(errMsg){
	busyIndicator.hide();
	alert("Unable to update");
}

function getUserDataFail(errMsg){
	busyIndicator.hide();
	alert("Unable to update");
}