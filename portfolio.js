'use strict';

class Portfolio extends HTMLElement {
	constructor() {
		super();
	}
}
customElements.define('li-portfolio', Portfolio);

let START_INDEX = [];
let photoIndex = [];
let tx = [];
// pIndex - portfolio index

window.addEventListener('load', function(event) {
	let carousels = document.querySelectorAll('.carousel');
	for (let pIndex = 0; pIndex < carousels.length; pIndex++) {
		initCarousel(carousels[pIndex], pIndex);
	}

	let xButtons = document.querySelectorAll('.portfolio-x-button');
	for (let button of xButtons) {
		button.addEventListener('click', closePortfolio);
	}

	let leftArrows = document.querySelectorAll('.portfolio-left-arrow-div');
	for (let arrow of leftArrows) {
		arrow.firstElementChild.addEventListener('click', scrollLeft);
	}

	let rightArrows = document.querySelectorAll('.portfolio-right-arrow-div');
	for (let arrow of rightArrows) {
		arrow.firstElementChild.addEventListener('click', scrollRight);
	}

	let portfolioLinks = document.querySelectorAll('.portfolio-link');
	for (let link of portfolioLinks) {
		link.addEventListener('click', openPortfolio);
	}
});

function initCarousel(carousel, pIndex) {
	let photos = carousel.children;

	START_INDEX.push(Math.floor(photos.length / 2));
	photoIndex.push(START_INDEX[pIndex]);

	let t = 0;

	for (let i = 0; i < START_INDEX[pIndex]; i++) {
		t += photos[i].clientWidth;
	}

	t -= ((carousel.clientWidth - photos[START_INDEX[pIndex]].clientWidth) / 2);

	tx.push([]);
	for (let img of photos) {
		img.addEventListener('transitionend', visible);
		img.style.transform = 'translate3d(' + (-1) * t + 'px, 0, 0)';
		tx[pIndex].push(t);
	}
}

function visible(event) {
	event.currentTarget.style.opacity = 1;
	event.currentTarget.removeEventListener('transitionend', visible);
}



function openPortfolio(event) {
	document.body.classList.toggle('portfolio-view');

	let links = event.currentTarget.parentElement.children;
	let pIndex = 0;
	while (pIndex < links.length) {
		if (links[pIndex] == event.currentTarget) {
			break;
		}
		pIndex++;
	}
	
	let portfolio = document.querySelectorAll('li-portfolio')[pIndex];
	portfolio.style.zIndex = 1;
	portfolio.style.opacity = 1;
}

function closePortfolio(event) {
	document.body.classList.toggle('portfolio-view');

	let portfolio = event.currentTarget.parentElement;
	portfolio.style.opacity = 0;
	portfolio.addEventListener('transitionend', zHide);
}

function zHide(event) {
	event.currentTarget.style.zIndex = -1;
	event.currentTarget.removeEventListener('transitionend', zHide);
}

function scrollLeft(event) {
	let carousel = event.currentTarget.parentElement.parentElement.firstElementChild;
	let photos = carousel.children;

	let carousels = document.querySelectorAll('.carousel');
	let pIndex = 0;
	while (pIndex < carousels.length) {
		if (carousels[pIndex] == carousel) {
			break;
		}
		pIndex++;
	}

	let endIndex = photoIndex[pIndex] + photos.length - 1 - START_INDEX[pIndex];
	if (endIndex >= photos.length) {
		endIndex %= photos.length;
	}

	photos[endIndex].style.opacity = 0;
	photos[endIndex].addEventListener('transitionend', visible);

	for (let i = 0; i < photos.length; i++) {
		tx[pIndex][endIndex] += photos[i].clientWidth;
	}

	let leftIndex = photoIndex[pIndex] - 1;
	if (leftIndex < 0) {
		leftIndex += photos.length;
	}

	let t = photos[leftIndex].clientWidth +
		((carousel.clientWidth - photos[leftIndex].clientWidth) / 2) -
		((carousel.clientWidth - photos[photoIndex[pIndex]].clientWidth) / 2);

	for (let i = 0; i < photos.length; i++) {
		tx[pIndex][i] -= t;
		photos[i].style.transform = 'translate3d(' + (-1) * tx[pIndex][i] + 'px, 0, 0)';
	}

	photoIndex[pIndex]--;
	if (photoIndex[pIndex] < 0) {
		photoIndex[pIndex] += photos.length;
	}
}

function scrollRight(event) {
	let carousel = event.currentTarget.parentElement.parentElement.firstElementChild;
	let photos = carousel.children;

	let carousels = document.querySelectorAll('.carousel');
	let pIndex = 0;
	while (pIndex < carousels.length) {
		if (carousels[pIndex] == carousel) {
			break;
		}
		pIndex++;
	}

	let startIndex = photoIndex[pIndex] - START_INDEX[pIndex];
	if (startIndex < 0) {
		startIndex += photos.length;
	}

	photos[startIndex].style.opacity = 0;
	photos[startIndex].addEventListener('transitionend', visible);

	for (let i = 0; i < photos.length; i++) {
		tx[pIndex][startIndex] -= photos[i].clientWidth;
	}

	let rightIndex = photoIndex[pIndex] + 1;
	if (rightIndex >= photos.length) {
		rightIndex %= photos.length;
	}

	let t = carousel.clientWidth -
		((carousel.clientWidth - photos[photoIndex[pIndex]].clientWidth) / 2) - 
		((carousel.clientWidth - photos[rightIndex].clientWidth) / 2);

	for (let i = 0; i < photos.length; i++) {
		tx[pIndex][i] += t;
		photos[i].style.transform = 'translate3d(' + (-1) * tx[pIndex][i] + 'px, 0, 0)';
	}

	photoIndex[pIndex]++;
	if (photoIndex[pIndex] >= photos.length) {
		photoIndex[pIndex] %= photos.length;
	}
}