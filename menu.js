'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('menuButton').addEventListener('click', toggleIcon);
});

function toggleIcon(event) {
	document.getElementById('menu').classList.toggle('transform');
}