'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('menu-menu').addEventListener('click', toggleMenu);
	document.getElementById('menu-icon').addEventListener('click', toggleMenu);
});

function toggleMenu(event) {
	document.getElementById('menu').classList.toggle('transform');
}