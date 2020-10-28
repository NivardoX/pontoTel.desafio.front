import alertify from 'alertifyjs';

const AlertifySuccess = (messages) => 
{
	for (let i = 0; i < messages.length; i++) {
		alertify.success(messages[i].message);
	}
}

const AlertifyError = (messages) => 
{
	for (let i = 0; i < messages.length ; i++) {
		alertify.error(messages[i].message);
	}
}

const AlertifyConfirmDelete = (handleConfirm) => {
	alertify.confirm('Confirm Title', 'Confirm Message', handleConfirm, function(){});
}


export { AlertifySuccess, AlertifyError, AlertifyConfirmDelete};