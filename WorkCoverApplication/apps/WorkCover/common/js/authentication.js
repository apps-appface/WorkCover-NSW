var NSWAuthenticationChallengeHandler = WL.Client
		.createChallengeHandler("LoginRealm");

NSWAuthenticationChallengeHandler.isCustomResponse = function(response) {
	if (!response || !response.responseJSON || response.responseText === null) {
		return false;
	}
	if (typeof (response.responseJSON.authRequired) !== 'undefined') {
		return true;
	} else {
		return false;
	}
};

NSWAuthenticationChallengeHandler.handleChallenge = function(response) {
	var authRequired = response.responseJSON.authRequired;

	if (authRequired == true) {
		busyIndicator.hide();
		$('#AuthBody').show();
		$("#AppBody").hide();
		$("#username").empty();
		$("#password").empty();

		if (response.responseJSON.errorMessage) {
			busyIndicator.hide();
			$("#errorMessage").html(response.responseJSON.errorMessage);
		}

	} else if (authRequired == false) {

		$('#AuthBody').hide();
		$("#AppBody").show();

		NSWAuthenticationChallengeHandler.submitSuccess();
	}
};

$("#loginButton").bind(
		'click',
		function() {
			busyIndicator.show();
			var email = $("#username").val();
			var password = $("#password").val();

			var invocationData = {
				adapter : "UserAdapter",
				procedure : "submitAuthentication",
				parameters : [ email.toString(), password ]
			};

			NSWAuthenticationChallengeHandler.submitAdapterAuthentication(
					invocationData, {});
		});