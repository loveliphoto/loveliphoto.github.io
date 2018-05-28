'use strict';

let START_INDEX;
let index;
let tx = [];

window.addEventListener('load', function(event) {
	let carousel = document.getElementById('carousel');
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

	document.getElementById('left-arrow').addEventListener('click', scrollLeft);
	document.getElementById('right-arrow').addEventListener('click', scrollRight);
});

function visible(event) {
	event.target.style.opacity = 1;
	event.target.removeEventListener('transitionend', visible);
}

function scrollLeft(event) {
	let carousel = document.getElementById('carousel');
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
	let carousel = document.getElementById('carousel');
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