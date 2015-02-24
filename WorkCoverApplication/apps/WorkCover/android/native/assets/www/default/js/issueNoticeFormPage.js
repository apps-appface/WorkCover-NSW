
/* JavaScript content from js/issueNoticeFormPage.js in folder common */
var checktextEnable = 0;

$("#rccBack").click(function() {
	getNoticeList();
});

$("#rccSignatureClear").click(function() {
	sigCapture.clear();
});

$("#submitNewNotice").click(
		function() {

			busyIndicator.show();

			var rccNoticeNumber = $("#rccNoticeNumberField").val();
			var rccRegisteredName = $("#rccRegisteredNameField").val();
			var rccBusinessName = $("#rccBusinessNameField").val();
			// var rccABN = $('#rccABNField').find("option:selected").val();
			var rccABN = $('#rccABNField').val();
			var sig = sigCapture.toString();
			var rccBuildingName = $("#rccBuildingNameField").val();
			var rccNumber = $("#rccNumberField").val();
			var rccStreetName = $("#rccStreetNameField").val();
			var rccSuburb = $("#rccSuburbField").val();
			var status = $("#rccStatusText").val();
			var rccState = $("#rccStateText").val();

			// if (checktextEnable == 0) {
			// rccState = $("#rccStateField").val();
			// } else {
			// rccState = $("#rccStateText").val();
			// }

			var rccPostCode = $("#rccPostCodeField").val();
			var rccOfficerName = user_full_name;
			var rccOfficerAddress = user_address1 + ", " + user_address2;

			if (rccNoticeNumber != ''
					&& (rccRegisteredName != '' || rccBusinessName != '')
					&& rccABN != '' && status != '' && rccState != ''
					&& rccPostCode != '' && sig != null) {

				var invocationData = {
					adapter : 'SubmitForm',
					procedure : 'submitCurrencyCertificateRequest',
					parameters : [ rccNoticeNumber, rccRegisteredName,
							rccBusinessName, rccABN, rccBuildingName,
							rccNumber, rccStreetName, rccSuburb, rccState,
							rccPostCode, rccOfficerName, rccOfficerAddress,
							convertDate(lDate), sig, user_role, status ]
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

$('#rccABNField').focus(function() {
	$('#popupABN').popup("open");
});

$('#ABNSearchBtn').click(function() {
	var abnNumber = $('#ABNNumber').val();
	if (abnNumber != null) {
		busyIndicator.show();
		var invocationData = {
			adapter : 'ABNLookupSOAPAdapter',
			procedure : 'getABNDetailByABN',
			parameters : [ abnNumber ]
		};
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : getABNDetailSuccess,
			onFailure : getABNDetailFail
		});
	} else {
		alert("Please enter ABN");
	}
});

function getABNDetailSuccess(result) {
	var res = result.invocationResult;
	$('#rccABNField')
			.val(
					res.Envelope.Body.ABRSearchByABNResponse.ABRPayloadSearchResults.response.businessEntity.ABN.identifierValue);

	if (res.Envelope.Body.ABRSearchByABNResponse.ABRPayloadSearchResults.response.businessEntity.mainName!=null) {

		$('#rccBusinessNameField')
				.val(
						res.Envelope.Body.ABRSearchByABNResponse.ABRPayloadSearchResults.response.businessEntity.mainName[0].organisationName);
		$('#rccStatusText')
				.val(
						res.Envelope.Body.ABRSearchByABNResponse.ABRPayloadSearchResults.response.businessEntity.entityStatus.entityStatusCode);
	} else {
		$('#rccRegisteredNameField')
				.val(
						res.Envelope.Body.ABRSearchByABNResponse.ABRPayloadSearchResults.response.businessEntity.legalName[0].organisationName);

		$('#rccStatusText')
				.val(
						res.Envelope.Body.ABRSearchByABNResponse.ABRPayloadSearchResults.response.businessEntity.entityStatus[0].entityStatusCode);
	}

	$('#rccStateText')
			.val(
					getState(res.Envelope.Body.ABRSearchByABNResponse.ABRPayloadSearchResults.response.businessEntity.mainBusinessPhysicalAddress[0].stateCode));
	$('#rccPostCodeField')
			.val(
					res.Envelope.Body.ABRSearchByABNResponse.ABRPayloadSearchResults.response.businessEntity.mainBusinessPhysicalAddress[0].postcode);
	$("#rccStateText").prop("disabled", true);
	$("#rccPostCodeField").prop("disabled", true);
	$("#rccBusinessNameField").prop("disabled", true);
	$('#rccStatusText').prop("disabled", true);
	$('#popupABN').popup("close");
	busyIndicator.hide();
}

function getABNDetailFail(errMsg) {
	busyIndicator.hide();
}

function getState(str) {
	switch (str) {
	case 'VIC':
		return "Victoria";
		break;
	case 'SA':
		return "South Australia";
		break;
	case 'TAS':
		return "Tasmania";
		break;
	case 'WA':
		return "Western Australia";
		break;
	case 'NSW':
		return "New South Wales";
		break;
	case 'QLD':
		return "Queensland";
		break;
	default:
		"";
	}
}

// $("#rccABNField").change(function() {

// $("#popUPText").focus(function() {
// $('#popupABN').popup("open"); });
// $('#abnSubmitButton').click(function() {
// $('#popupABN').popup("close"); });

// var abn_result = $(this).find("option:selected").val();
//
// if (abn_result == "none") {
// $("#stateSelect").show();
// $("#stateText").hide();
// $("#rccPostCodeField").prop("disabled", false);
// $("#rccRegisteredNameField").prop("disabled", false);
// $("#rccBusinessNameField").prop("disabled", false);
// $("#rccBuildingNameField").prop("disabled", false);
// $("#rccNumberField").prop("disabled", false);
// $("#rccStreetNameField").prop("disabled", false);
// $("#rccSuburbField").prop("disabled", false);
// $("#rccStateText").prop("disabled", false);
// $("#rccRegisteredNameField").val('');
// $("#rccBusinessNameField").val('');
// $("#rccABNField").val('');
// $("#rccBuildingNameField").val('');
// $("#rccNumberField").val('');
// $("#rccStreetNameField").val('');
// $("#rccSuburbField").val('');
// $("#rccStateField").val('');
// $("#rccPostCodeField").val('');
//
// } else {
// busyIndicator.show();
// var invocationData = {
// adapter : 'GetABNDetailsAdapter',
// procedure : 'getABNDetails',
// parameters : [ abn_result ]
// };
// WL.Client.invokeProcedure(invocationData, {
// onSuccess : rccABNDetailsSuccess,
// onFailure : rccABNDetailsFailed
// });
// }
// });

// function rccABNDetailsSuccess(result) {
// var res = result.invocationResult;
// for (var i = 0; i < res.resultSet.length; i++) {
// checktextEnable = 1;
// $("#stateSelect").hide();
// $("#stateText").show();
// $("#rccRegisteredNameField").val(res.resultSet[i].registerd_name);
// $("#rccBusinessNameField").val(res.resultSet[i].trading_name);
// $("#rccBuildingNameField").val(res.resultSet[i].building_name);
// $("#rccNumberField").val(res.resultSet[i].street_number);
// $("#rccStreetNameField").val(res.resultSet[i].street_name);
// $("#rccSuburbField").val(res.resultSet[i].suburb_name);
// $("#rccPostCodeField").val(res.resultSet[i].postcode);
// $("#rccStateText").val(res.resultSet[i].state);
// $("#rccPostCodeField").prop("disabled", true);
// $("#rccRegisteredNameField").prop("disabled", true);
// $("#rccBusinessNameField").prop("disabled", true);
// $("#rccBuildingNameField").prop("disabled", true);
// $("#rccNumberField").prop("disabled", true);
// $("#rccStreetNameField").prop("disabled", true);
// $("#rccSuburbField").prop("disabled", true);
// $("#rccStateText").prop("disabled", true);
// busyIndicator.hide();
// }
// }
//
// function rccABNDetailsFailed(errMsg) {
// busyIndicator.hide();
// alert("Unable to fetch data");
// }
