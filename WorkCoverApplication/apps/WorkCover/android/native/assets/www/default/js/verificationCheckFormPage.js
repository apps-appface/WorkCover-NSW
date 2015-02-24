
/* JavaScript content from js/verificationCheckFormPage.js in folder common */
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
						onSuccess : saveSuccess,
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

function saveSuccess(result) {
	busyIndicator.hide();
	alert("Successfully saved");
	getList();
}

function saveFail(errMsg) {
	busyIndicator.hide();
	alert("Unable to save empty fields");
}