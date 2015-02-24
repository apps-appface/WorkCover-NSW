
/* JavaScript content from js/verificationListPage.js in folder common */
function getList() {
	busyIndicator.show();
	var invocationData = {
		adapter : 'GetWorkersListAdapter',
		procedure : 'getWorkersList',
		parameters : []
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getTitleSuccess,
		onFailure : getTitleFailure,
	});
}

var res;
function getTitleSuccess(result) {
	var main_user = user_role, user2 = "Inspector";
	$('#showlist').html('');
	res = result.invocationResult;
	var j = 1;
	$('#showlist').append('<lable id=\"currentusername\">Admin</label>');
	for (var i = 0; i < res.resultSet.length; i++) {
		if (main_user == res.resultSet[i].user_role) {
			if (main_user == "Inspector") {
				$('#showlist')
						.append(
								' <li data-inline=\"true\" id=\"vlpList\">'
										+ '<label id=\"serialnumber\">'
										+ (j)
										+ '.'
										+ '</label>'
										+ ' '
										+ '<label id=\"name\" style=\"color:#3e3e3e; text-shadow:none;\">'

										+ res.resultSet[i].name
										+ '</label>'
										+ '<div id=\"vlpButtons\" data-inline=\"true\"><button  id=\"'
										+ res.resultSet[i].worker_id
										+ '\" class=\"ui-btn ui-btn-inline edit\" onclick=\"false\">Edit</button>'
										+ '<button  id=\"'
										+ res.resultSet[i].worker_id
										+ '\" class=\"ui-btn ui-btn-inline delete\" onclick=\"false\">Delete</button></div>'
										+ '</li>');
				j++;
			} else {
				$('#showlist')
						.append(
								' <li data-inline=\"true\" id=\"vlpList\">'
										+ '<label id=\"serialnumber\">'
										+ (j)
										+ '.'
										+ '</label>'
										+ ' '
										+ '<label id=\"name\" style=\"color:#3e3e3e; text-shadow:none;\">'

										+ res.resultSet[i].name
										+ '</label>'
										+ '<div id=\"vlpButtons\" data-inline=\"true\"><button id=\"'
										+ res.resultSet[i].worker_id
										+ '\" class=\"ui-btn ui-btn-inline edit\" onclick=\"workerEdit(this.id)\">Edit</button>'
										+ '<button id=\"'
										+ res.resultSet[i].worker_id
										+ '\" class=\"ui-btn ui-btn-inline delete\" onclick=\"workerDelete(this.id)\">Delete</button></div>'
										+ '</li>');
				j++;
			}
		}
	}

	$('#showlist')
			.append('<lable id=\"currentusername\">' + user2 + '</label>');
	for (var i = 0; i < res.resultSet.length; i++) {
		if (main_user != res.resultSet[i].user_role) {

			$('#showlist')
					.append(
							' <li data-inline=\"true\" id=\"vlpList\">'
									+ '<label id=\"serialnumber\">'
									+ (j)
									+ '.'
									+ '</label>'
									+ ' '
									+ '<label id=\"name\" style=\"color:#3e3e3e; text-shadow:none;\">'

									+ res.resultSet[i].name
									+ '</label>'
									+ '<div id=\"vlpButtons\" data-inline=\"true\"><button id=\"'
									+ res.resultSet[i].worker_id
									+ '\" class=\"edit\" onclick=\"workerEdit(this.id)\" >Edit</button>'
									+ '<button id=\"'
									+ res.resultSet[i].worker_id
									+ '\" class=\"delete\" onclick=\"workerDelete(this.id)\" >Delete</button></div>'
									+ '</li>');
			j++;
		}
	}
	busyIndicator.hide();
	$.mobile.changePage($("#showListPage"));
	$('#showlist').listview('refresh');
}

$("#addNew").click(function() {
	workerEdit(0);
});

function workerEdit(element) {
	busyIndicator.show();
	if (element == 0) {
		$("#yesDiv").hide();
		$("#noDiv").hide();
		$.mobile.changePage($("#verificationCheckPage"));
		busyIndicator.hide();
	} else {
		for (var i = 0; i < res.resultSet.length; i++) {
			if (res.resultSet[i].worker_id == element) {
				$("#yesDiv").hide();
				$("#noDiv").hide();
				$('#birthday').val('');
				$('input[name="workerlicence"]').attr('checked', false);
				$('#hrwlicenceno').val('');
				$('#issuejurisdiction').val('');
				$('input[name=enrollintraining]').attr('checked', false);
				$('#expirydate').val('');
				$('#licenceclasses').val('');
				$('#interstatecheckdate').val('');
				$('input[name=validlicence]').attr('checked', false);
				$('input[name=initiatedRFS]').attr('checked', false);
				$('#noticeissued').val('');
				$('#textareaComments').val('');
				$('#workername').val('');
				$.mobile.changePage($("#verificationCheckPage"));
				busyIndicator.hide();
			}
		}
	}
};

function workerDelete(element) {
	WL.SimpleDialog.show("Delete",
			"Are you sure you want to delete data from database", [ {
				text : 'Cancel'
			}, {
				text : 'Ok',
				handler : function() {
					busyIndicator.show();
					var invocationData = {
						adapter : 'DeleteWorkerDetailsAdapter',
						procedure : 'deleteWorkerDetail',
						parameters : [ element ]
					};
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : deleteSuccess,
						onFailure : deleteFailure
					});
				}
			} ], null);
}

function deleteSuccess() {
	busyIndicator.hide();
	alert("Worker deleted successfully");
	getList();
}

function deleteFailure() {
	busyIndicator.hide();
	alert("Unable to delete");
}

function getTitleFailure(result) {
	busyIndicator.hide();
	alert("Unable to load data");
	$.mobile.changePage($("#loginPage"));
}

$("#listBack").click(function() {
	$.mobile.changePage($("#loginPage"));
});