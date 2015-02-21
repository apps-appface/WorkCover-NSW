
/* JavaScript content from js/mainPage.js in folder common */
$("#adminResponse").click(function() {
	busyIndicator.show();
	$.mobile.changePage($("#responseVerificationPage"));
	busyIndicator.hide();
});

$("#verificationCheck").click(function() {
	getList();
});

$("#certification").click(function() {
	getNoticeList();	
});

$("#notice").click(function() {
	alert("Under construction");
});