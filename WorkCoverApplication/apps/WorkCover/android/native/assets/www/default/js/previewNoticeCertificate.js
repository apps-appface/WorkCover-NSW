
/* JavaScript content from js/previewNoticeCertificate.js in folder common */
var noticeDetail;

var notice_id = "";

function getNoticeDetail(noticeId) {
	busyIndicator.show();
	notice_id = noticeId;
	var invocationData = {
		adapter : "SubmitForm",
		procedure : "retrieveNoticeData",
		parameters : [ noticeId ]
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getDataSuccess,
		onFailure : getDataFail
	});
}

function getDataSuccess(result) {

	noticeDetail = result.invocationResult;

	$("#testrccNoticeNumberField")
			.html(noticeDetail.resultSet[0].notice_number);

	$("#testrccRegisteredNameField").html(
			noticeDetail.resultSet[0].registered_name);

	$("#testrccBusinessNameField")
			.html(noticeDetail.resultSet[0].business_name);

	$("#testrccABNField").html(noticeDetail.resultSet[0].abn);

	$("#testrccBuildingNameField")
			.html(noticeDetail.resultSet[0].building_name);

	$("#testrccNumberField").html(noticeDetail.resultSet[0].number);

	$("#testrccStreetNameField").html(noticeDetail.resultSet[0].street_name);

	$("#testrccSuburbField").html(noticeDetail.resultSet[0].suburb);

	$("#testrccStateField").html(noticeDetail.resultSet[0].state);

	$("#testrccStatusField").html(noticeDetail.resultSet[0].status);

	$("#testrccPostCodeField").html(noticeDetail.resultSet[0].post_code);

	$("#testrccOfficerNameField").html(noticeDetail.resultSet[0].officer_name);

	$("#testrccOfficerAddressField").html(
			noticeDetail.resultSet[0].officer_address);

	$("#testrccDateField").html(
			"Date : " + getDate(noticeDetail.resultSet[0].date));

	$("#testrccOfficerSignature").attr('src',
			noticeDetail.resultSet[0].officer_signature);

	$.mobile.changePage($("#certificatePreviewPage"));

	busyIndicator.hide();
}

$('#savePdfBtn').click(
		function() {
			busyIndicator.show();
			cordova.exec(function(result) {
				busyIndicator.hide();
				alert("PDF is generated in your file system");
				getNoticeList();
			}, function(error) {
				busyIndicator.hide();
				alert("Error : PDF is not generated");
			}, "Html2pdf", "create", [ $('#pdfContent').html(),
					noticeDetail.resultSet[0].notice_number + ".pdf" ]);

		});

$('#previewBack').click(function() {
	getNoticeList();
});

function getDataFail(errMsg) {
	busyIndicator.hide();
	alert("Unable to fetch notice data");
}

$('#previewDeleteBtn').click(function() {
	WL.SimpleDialog.show("Delete", "Are you sure ? ", [ {
		text : 'Cancel'
	}, {
		text : 'Ok',
		handler : function() {
			busyIndicator.show();
			var invocationData = {
				adapter : "SubmitForm",
				procedure : "deleteNotice",
				parameters : [ notice_id ]
			};

			WL.Client.invokeProcedure(invocationData, {
				onSuccess : deleteNoticeSuccess,
				onFailure : deleteNoticeFail
			});
		}
	} ], null);
});

function deleteNoticeSuccess(result) {
	busyIndicator.hide();
	alert("Notice successfully deleted");
	getNoticeList();
}

function deleteNoticeFail(errMsg) {
	busyIndicator.hide();
	alert("Unable to delete notice");
}

function getDate(date) {
	var d1 = date.split("T");
	var d2 = d1[0].split("-");
	return d2[2] + "/" + d2[1] + "/" + d2[0];
}