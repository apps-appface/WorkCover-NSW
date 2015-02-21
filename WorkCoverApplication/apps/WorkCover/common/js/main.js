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
var user_address;
var user_id;

$(".ui-btn-right").click(function() {
	$.mobile.changePage("#loginPage");
	WL.Client.reloadApp();
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
	user_role=user_detail.userRole;
	user_name=user_detail.userName;
	user_full_name=user_detail.userFullName;
	user_mobile=user_detail.userMobile;
	user_email=user_detail.userEmail;
	user_address=user_detail.userAddress;
	user_id=user_detail.userId;
	
	$('#welcomelbl').html("Welcome " + user_role + " " + user_full_name + " !");
}

function fail(errMsg) {
	busyIndicator.hide();
	alert(JSON.stringify(errMsg));
}

$("#listBack").click(function() {
	$.mobile.changePage($("#loginPage"));
});

$("#rvpBack").click(function() {
	$.mobile.changePage($("#loginPage"));
});

$("#vBack").click(function() {
	$.mobile.changePage($("#showListPage"));
});

$('#save')
		.click(
				function() {
					busyIndicator.show();
					workerName = $('#workername').val();
					dateOfBirth = $('#birthday').val();
					haveLicence = $("#licence :radio:checked").val();
					if (haveLicence == "Yes") {
						haveLicence = 1;
					} else {
						haveLicence = 0;
					}
					hrwExpiryDate = $('#expirydate').val();
					licenceClasses = $('#licenceclasses').val();
					hrwLicenceNo = $('#hrwlicenceno').val();
					issuingJurisdiction = $('#issuejurisdiction').val();
					enrolledTrain = $("input[name=enrollintraining]:checked")
							.val();

					interStateCheck = $('#interstatecheckdate').val();
					isLicenceValid = $("#licencevalid :radio:checked").val();
					if (isLicenceValid == "Yes") {
						isLicenceValid = 1;
					} else {
						isLicenceValid = 0;
					}
					initiatedRFS = $("input[name=initiatedRFS]:checked").val();
					noticesIssued = $('#noticeissued').val();
					addComment = $('#textareaComments').val();

					var invocationData = {
						adapter : 'VerificationCheckAdapter',
						procedure : 'submitVerificationCheck',
						parameters : [ workerName, dateOfBirth, haveLicence,
								hrwExpiryDate, licenceClasses, hrwLicenceNo,
								issuingJurisdiction, enrolledTrain,
								interStateCheck, isLicenceValid, initiatedRFS,
								noticesIssued, addComment ]
					};
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : success,
						onFailure : saveFail
					});
				});

$('input[name=workerlicence]').click(function() {
	var result = $("input[name=workerlicence]:checked").val();
	if (result == "Yes") {
		$("#yesDiv").show();
		$("#noDiv").hide();
	} else {
		$("#noDiv").show();
		$("#yesDiv").hide();
	}
});
function success(result) {
	busyIndicator.hide();
	alert("Successfully Saved");
	$.mobile.changePage($("#loginPage"));
}

function saveFail(errMsg) {
	busyIndicator.hide();
	alert("Unable to save empty fields");
}