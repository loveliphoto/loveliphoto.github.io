'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('contactForm').addEventListener('submit', sendEmail);
});

function sendEmail(event) {
	event.preventDefault();

	var apigClient = apigClientFactory.newClient();
	var body = {};

	var formData = new FormData(event.target);
	for (var key of formData.keys()) {
			body[key] = formData.get(key);
	}
	/*
	apigClient.sendLoveLiEmailGet(null, body)
    	.then(function(result){
      		// Add success callback code here.
    	}).catch( function(result){
      		// Add error callback code here.
    	});
    */
}

