let currentImageIndex = 0;
let images = [];

function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    // Get all images from the page
    const imageElements = document.querySelectorAll('.pinterest-item img');
    images = Array.from(imageElements).map(img => img.src);
    
    console.log('All images:', images); // Debug log
    
    // Find the index of the clicked image
    currentImageIndex = images.findIndex(img => img === imageSrc);
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    console.log('Current index:', currentImageIndex); // Debug log
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    modalImg.onload = function() {
        console.log('Image loaded:', this.src);
    };
    modalImg.onerror = function() {
        console.log('Image failed to load:', this.src);
    };
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

function prevImage() {
    if (images.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        const modalImg = document.getElementById('modalImage');
        modalImg.src = images[currentImageIndex];
        console.log('Previous image:', images[currentImageIndex]); // Debug log
    }
}

function nextImage() {
    if (images.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const modalImg = document.getElementById('modalImage');
        modalImg.src = images[currentImageIndex];
        console.log('Next image:', images[currentImageIndex]); // Debug log
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}