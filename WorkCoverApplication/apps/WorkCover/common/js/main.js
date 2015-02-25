function wlCommonInit() {
	busyIndicator = new WL.BusyIndicator('loginPage');
	getSecretData();
}

var busyIndicator;
var lDate;
var user_role;
var user_name;
var user_full_name;
var user_mobile;
var user_email;
var user_address1;
var user_address2;
var user_auto_sync_interval;
var user_gps_mapping;
var user_id;

$(".logOutButton").click(function() {
	busyIndicator.show();
	$.mobile.changePage("#loginPage");
	WL.Client.reloadApp();
	busyIndicator.hide();
});

function getSecretData() {
	var invocationData = {
		adapter : 'UserAdapter',
		procedure : 'getSecretData',
		parameters : []
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getUserDetailSuccess,
		onFailure : fail
	});
}

function getUserDetailSuccess(result) {
	busyIndicator.hide();
	var user_detail = result.invocationResult;
	user_role = user_detail.userRole;
	user_name = user_detail.userName;
	user_full_name = user_detail.userFullName;
	user_mobile = user_detail.userMobile;
	user_email = user_detail.userEmail;
	user_address1 = user_detail.userAddress1;
	user_address2 = user_detail.userAddress2;
	user_auto_sync_interval = user_detail.userAutoSyncInterval;
	user_id = user_detail.userId;
	user_gps_mapping = user_detail.userGpsMapping;
	$('#welcomelbl').html("Welcome " + user_role + " " + user_full_name + " !");
}

function fail(errMsg) {
	busyIndicator.hide();
	alert("Login failed. Try again");
}