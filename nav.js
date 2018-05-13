'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('nav-button-text').addEventListener('click', toggleNav);
	document.getElementById('nav-button-icon').addEventListener('click', toggleNav);
});

function toggleNav(event) {
	document.querySelector('nav').classList.toggle('transform');
}