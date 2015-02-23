
/* JavaScript content from js/currencyCertificateRequestPage.js in folder common */
var rccNoticeNumber;
var rccRegisteredName;
var rccBusinessName;
var rccABN;
var rccBuildingName;
var rccNumber;
var rccStreetName;
var rccSuburb;
var rccState;
var rccPostCode;
var rccOfficerName;
var rccOfficerAddress;
var rccDate;
var checktextEnable = 0;

$("#rccABNField").on('change',function() {

	var abn_result = $(this).find("option:selected").val();

	if (abn_result == "none") {
		$("#stateSelect").show();
		$("#stateText").hide();
		$("#rccPostCodeField").prop("disabled", false);
		$("#rccRegisteredNameField").prop("disabled", false);
		$("#rccBusinessNameField").prop("disabled", false);
		$("#rccBuildingNameField").prop("disabled", false);
		$("#rccNumberField").prop("disabled", false);
		$("#rccStreetNameField").prop("disabled", false);
		$("#rccSuburbField").prop("disabled", false);
		$("#rccStateText").prop("disabled", false);
		$("#rccRegisteredNameField").val('');
		$("#rccBusinessNameField").val('');
		$("#rccABNField").val('');
		$("#rccBuildingNameField").val('');
		$("#rccNumberField").val('');
		$("#rccStreetNameField").val('');
		$("#rccSuburbField").val('');
		$("#rccStateField").val('');
		$("#rccPostCodeField").val('');

	} else {
		busyIndicator.show();
		var invocationData = {
			adapter : 'GetABNDetailsAdapter',
			procedure : 'getABNDetails',
			parameters : [ abn_result ]
		};
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : rccABNDetailsSuccess,
			onFailure : rccABNDetailsFailed
		});
	}
});
function rccABNDetailsSuccess(result) {
	var res = result.invocationResult;
	for (var i = 0; i < res.resultSet.length; i++) {
		checktextEnable = 1;
		$("#stateSelect").hide();
		$("#stateText").show();
		$("#rccRegisteredNameField").val(res.resultSet[i].registerd_name);
		$("#rccBusinessNameField").val(res.resultSet[i].trading_name);
		$("#rccBuildingNameField").val(res.resultSet[i].building_name);
		$("#rccNumberField").val(res.resultSet[i].street_number);
		$("#rccStreetNameField").val(res.resultSet[i].street_name);
		$("#rccSuburbField").val(res.resultSet[i].suburb_name);
		$("#rccPostCodeField").val(res.resultSet[i].postcode);
		$("#rccStateText").val(res.resultSet[i].state);
		$("#rccPostCodeField").prop("disabled", true);
		$("#rccRegisteredNameField").prop("disabled", true);
		$("#rccBusinessNameField").prop("disabled", true);
		$("#rccBuildingNameField").prop("disabled", true);
		$("#rccNumberField").prop("disabled", true);
		$("#rccStreetNameField").prop("disabled", true);
		$("#rccSuburbField").prop("disabled", true);
		$("#rccStateText").prop("disabled", true);
		busyIndicator.hide();
	}
}
function rccABNDetailsFailed(errMsg) {
	busyIndicator.hide();
	alert("Unable to fetch data");
}

$("#submitNewNotice").click(
		function() {
			busyIndicator.show();
			rccNoticeNumber = $("#rccNoticeNumberField").val();
			rccRegisteredName = $("#rccRegisteredNameField").val();
			rccBusinessName = $("#rccBusinessNameField").val();
			rccABN = $('#rccABNField').find("option:selected").val();
			var sig = sigCapture.toString();
			rccBuildingName = $("#rccBuildingNameField").val();
			rccNumber = $("#rccNumberField").val();
			rccStreetName = $("#rccStreetNameField").val();
			rccSuburb = $("#rccSuburbField").val();
			if (checktextEnable == 0) {
				rccState = $("#rccStateField").val();
			} else {
				rccState = $("#rccStateText").val();
			}
			rccPostCode = $("#rccPostCodeField").val();
			rccOfficerName = user_full_name;
			rccOfficerAddress = 1+" "user_address2;
			if (rccNoticeNumber != '' && rccRegisteredName != ''
					&& rccBusinessName != '' && rccBuildingName != ''
					&& rccNumber != '' && rccStreetName != ''
					&& rccSuburb != '' && rccPostCode != ''
					&& rccOfficerName != '' && rccOfficerAddress != ''
					&& sig != null) {
				var invocationData = {
					adapter : 'SubmitForm',
					procedure : 'submitCurrencyCertificateRequest',
					parameters : [ rccNoticeNumber, rccRegisteredName,
							rccBusinessName, rccABN, rccBuildingName,
							rccNumber, rccStreetName, rccSuburb, rccState,
							rccPostCode, rccOfficerName, rccOfficerAddress,
							convertDate(lDate), sig, user_role ]
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rccSubmitSuccess1,
					onFailure : rccSubmitFailed1
				});
			} else {
				busyIndicator.hide();
				alert("Please fill all the details");
			}

		});

function rccSubmitSuccess1(result) {
	busyIndicator.hide();
	alert("Data saved successfully");
	getNoticeList();
}

function rccSubmitFailed1(error) {
	busyIndicator.hide();
	alert("Unable to save data");
}

$("#rccBack").click(function() {
	getNoticeList();
});

$("#rccSignatureClear").click(function() {
	sigCapture.clear();
});
