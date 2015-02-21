
/* JavaScript content from js/noticeListPage.js in folder common */
var sigCapture = null;

function getNoticeList() {
	busyIndicator.show();
	var invocationData = {
		adapter : 'SubmitForm',
		procedure : 'retrieveData',
		parameters : []
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : rccmbRetrieveSuccess,
		onFailure : rccmbRetrieveFail
	});
}

function rccmbRetrieveSuccess(result) {

	var res = result.invocationResult;

	$("#rccmpSubHead").html(
			"Notice Issued By " + user_role + " " + user_full_name);

	var noticeList = "";
	var j = 0;
	for (var i = 0; i < res.resultSet.length; i++) {
		if (user_full_name == res.resultSet[i].officer_name) {
			noticeList += "<li id=\"rccmpLi\"><div style=\"float:left; margin-left:4px;\">"
					+ "<label id=\"rccmpSlNo\">"
					+ (++j)
					+ ".</label>"
					+ "<label id=\"rccmpName\">"
					+ res.resultSet[i].notice_number
					+ "<i style=\"font-size: 12px;\">&nbsp;&nbsp;&nbsp;&nbsp;issued to "
					+ res.resultSet[i].registered_name
					+ "</i></label></div>"
					+ "<div id=\"rccmpButtons\">"
					+ "<button class=\"ui-btn ui-btn-inline rccmpViewBut\" id=\""
					+ res.resultSet[i].notice_id
					+ "\" onclick=\"rccmbViewNotice(this.id)\">View</button>"
					+ "<button class=\"ui-btn ui-btn-inline rccmpPrintBut\" id=\""
					+ res.resultSet[i].notice_id
					+ "\" onclick=\"rccmbPrintNotice(this.id)\">Print</button>"
					+ "<button class=\"ui-btn ui-btn-inline rccmpMailBut\" id=\""
					+ res.resultSet[i].notice_id
					+ "\" onclick=\"rccmbMailNotice(this.id)\">Mail</button>"
					+ "</div>" + "</li>";
		}
	}
	$("#rccmpList").html(noticeList);
	busyIndicator.hide();
	$.mobile.changePage($("#noticeListPage"));
	$("#rccmpList").listview('refresh');
}

function rccmbRetrieveFail(errMsg) {
	busyIndicator.hide();
	alert("Unable to fetch data");
}

$("#nListBack").on('tap click', function() {
	$.mobile.changePage("#loginPage");
});

function rccmbViewNotice(noticeId) {
	getNoticeDetail(noticeId);
}

function rccmbPrintNotice(noticeId) {
	alert("Under construction");
}

function rccmbMailNotice(noticeId) {
	alert("Under construction");
}

$("#rccmpAdd").on('tap click', function() {
	sigCapture = new SignatureCapture("rccSignatureCanvas");
	var date = new Date();
	lDate = date.toString().slice(0, 25);
	$("#rccDateField").html("Date : " + convertDate(lDate));
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
	$("#rccOfficerNameField").val(user_full_name);
	$("#rccOfficerAddressField").val(user_address);
	$('#rccNoticeNumberField').val(getNoticeNumber());
	$.mobile.changePage($("#currencyCertificateRequestPage"));
});

function convertDate(inputFormat) {
	function pad(s) {
		return (s < 10) ? '0' + s : s;
	}
	var d = new Date(inputFormat);
	return [ d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate()) ]
			.join('-');
}

function getNoticeNumber() {
	var role_value = "";
	if (user_role == "Admin") {
		role_value = "001";
	} else {
		role_value = "002";
	}
	var date = new Date();
	var lDate = date.toString().slice(0, 25);
	var chars = "0123456789";
	var string_length = 3;
	var randomstring = '';
	for (var i = 0; i < string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum + 1);
	}
	return 'NSW-WC-NT-' + convertDate1(lDate) + role_value + randomstring;
}

function convertDate1(inputFormat) {
	function pad(s) {
		return (s < 10) ? '0' + s : s;
	}
	var d = new Date(inputFormat);
	return [ pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear() ]
			.join('');
};