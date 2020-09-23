// DOM Objects
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Global Storage
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// API Details
const apiKey = 'sNUIVh1QLE7PIXbPwhNYsmjRbxdl9edb0vM3MD8lmI0';
let count = 5;
const URL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Handle image loading
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded == totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

// Set multiple attributes at once
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create elements for links and photos
function displayPhotos() {
	totalImages += photosArray.length;
	// For each photo
	photosArray.forEach((photo) => {
		const link = photo.links.html;
		// Create link
		const a = document.createElement('a');
		setAttributes(a, {
			href: photo.links.html,
			target: '_blank',
		});
		// Create image
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		// Wait for image to load
		img.addEventListener('load', imageLoaded);

		a.appendChild(img);
		imageContainer.append(a);
	});
}

async function getPhotos() {
	try {
		const response = await fetch(URL);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		console.log('Ran into an error!', error);
	}
}

window.addEventListener('scroll', (event) => {
	if (
		window.innerHeight + window.scrollY >
			document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// on Load

getPhotos();
count = 20;
