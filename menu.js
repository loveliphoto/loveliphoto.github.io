'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('menu').addEventListener('click', toggleIcon);
});

function toggleIcon(event) {
	event.currentTarget.classList.toggle('transform');
}