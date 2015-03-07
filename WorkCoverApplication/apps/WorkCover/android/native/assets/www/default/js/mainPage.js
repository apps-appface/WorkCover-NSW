
/* JavaScript content from js/mainPage.js in folder common */
$("#myWSMS").click(function() {
	$.mobile.changePage($("#myWsmsPage"));
});

$("#cMgmt").click(function() {
	$.mobile.changePage($("#cMgmtPage"));
});

$("#reports").click(function() {
	$.mobile.changePage($("#reportsPage"));
});

$("#nMgmt").click(function() {
	getNoticeList();
});

$("#settings")
		.click(
				function() {
					$("#settingUserName").val(user_full_name);
					$("#settingUserAddress1").val(user_address1);
					$("#settingUserAddress2").val(user_address2);
					$("#slider").attr('value',user_auto_sync_interval);

					if (user_gps_mapping == "on") {
						$('#slider-flip-m').val('on');
					} else {
						$('#slider-flip-m').val('off');
					}
					try {
						$('#slider').slider("refresh");
						$('#slider-flip-m').slider("refresh");
					} catch (err) {
						console
								.log("Error occurred refreshing slider (probabily first time!)");
					}
					$.mobile.changePage($("#settingsPage"));
				});

$("#cSurvey").click(function() {
	getList();
});
