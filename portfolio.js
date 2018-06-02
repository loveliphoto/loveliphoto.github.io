'use strict';

class Portfolio extends HTMLElement {
	constructor() {
		super();
	}
}
customElements.define('li-portfolio', Portfolio);

let START_INDEX;
let index;
let tx = [];

window.addEventListener('load', function(event) {
	let carousel = document.getElementById('portfolio-seniors').firstElementChild;
	let photos = carousel.children;

	START_INDEX = Math.floor(photos.length / 2);
	index = START_INDEX;

	let t = 0;

	for (let i = 0; i < START_INDEX; i++) {
		t += photos[i].clientWidth;
	}

	t -= ((carousel.clientWidth - photos[START_INDEX].clientWidth) / 2);

	for (let img of photos) {
		img.addEventListener('transitionend', visible);
		img.style.transform = 'translate3d(' + (-1) * t + 'px, 0, 0)';
		tx.push(t);
	}

	let xButtons = document.querySelectorAll('.portfolio-x-button');
	for (let xButton of xButtons) {
		xButton.addEventListener('click', togglePortfolio);
	}

	let leftArrows = document.querySelectorAll('.portfolio-left-arrow-div');
	for (let arrow of leftArrows) {
		arrow.firstElementChild.addEventListener('click', scrollLeft);
	}

	let rightArrows = document.querySelectorAll('.portfolio-right-arrow-div');
	for (let arrow of rightArrows) {
		arrow.firstElementChild.addEventListener('click', scrollRight);
	}

	document.getElementById('portfolio-seniors-button').addEventListener('click', togglePortfolio);
});

function visible(event) {
	event.target.style.opacity = 1;
	event.target.removeEventListener('transitionend', visible);
}

function togglePortfolio(event) {
	document.body.classList.toggle('portfolio-view');
	let portfolio = document.getElementById('portfolio-seniors');

	if (window.getComputedStyle(portfolio).zIndex == -1) {
		portfolio.style.zIndex = 1;
		portfolio.style.opacity = 1;
	} else {
		portfolio.style.opacity = 0;
		portfolio.addEventListener('transitionend', zHide);
	}
}

function zHide(event) {
	event.target.style.zIndex = -1;
	event.target.removeEventListener('transitionend', zHide);
}

function scrollLeft(event) {
	let carousel = document.getElementById('portfolio-seniors').firstElementChild;
	let photos = carousel.children;

	let endIndex = index + photos.length - 1 - START_INDEX;
	if (endIndex >= photos.length) {
		endIndex %= photos.length;
	}

	photos[endIndex].style.opacity = 0;
	photos[endIndex].addEventListener('transitionend', visible);

	for (let i = 0; i < photos.length; i++) {
		tx[endIndex] += photos[i].clientWidth;
	}

	let leftIndex = index - 1;
	if (leftIndex < 0) {
		leftIndex += photos.length;
	}

	let t = photos[leftIndex].clientWidth +
		((carousel.clientWidth - photos[leftIndex].clientWidth) / 2) -
		((carousel.clientWidth - photos[index].clientWidth) / 2);

	for (let i = 0; i < photos.length; i++) {
		tx[i] -= t;
		photos[i].style.transform = 'translate3d(' + (-1) * tx[i] + 'px, 0, 0)';
	}

	index--;
	if (index < 0) {
		index += photos.length;
	}
}

function scrollRight(event) {
	let carousel = document.getElementById('portfolio-seniors').firstElementChild;
	let photos = carousel.children;

	let startIndex = index - START_INDEX;
	if (startIndex < 0) {
		startIndex += photos.length;
	}

	photos[startIndex].style.opacity = 0;
	photos[startIndex].addEventListener('transitionend', visible);

	for (let i = 0; i < photos.length; i++) {
		tx[startIndex] -= photos[i].clientWidth;
	}

	let rightIndex = index + 1;
	if (rightIndex >= photos.length) {
		rightIndex %= photos.length;
	}

	let t = carousel.clientWidth -
		((carousel.clientWidth - photos[index].clientWidth) / 2) - 
		((carousel.clientWidth - photos[rightIndex].clientWidth) / 2);

	for (let i = 0; i < photos.length; i++) {
		tx[i] += t;
		photos[i].style.transform = 'translate3d(' + (-1) * tx[i] + 'px, 0, 0)';
	}

	index++;
	if (index >= photos.length) {
		index %= photos.length;
	}
}