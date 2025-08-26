const images = [
    'pictures/post/CG.jpg',
    'pictures/post/cg 2.jpg',
    'pictures/post/CHOCOFUN 1.jpg',
    'pictures/post/CHOCOFUN 2.jpg',
    'pictures/post/ghode jatra pathao.jpg',
    'pictures/post/IMG-20250306-WA0000.jpg',
    'pictures/post/janai purnima.jpg',
    'pictures/post/ktm.jpg',
    'pictures/post/ktm2.jpg',
    'pictures/post/laxmi puja ko subhakamana.jpg',
    'pictures/post/mahashivaratri.png',
    'pictures/post/social media.jpg',
    'pictures/post/teej ko subhakamana.jpg',
    'pictures/post/thakali.jpg',
    'pictures/post/thakali 1.jpg'
];

let currentImageIndex = 0;

function openModal(imageSrc) {
    currentImageIndex = images.indexOf(imageSrc);
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.getElementById('modalImage').src = images[currentImageIndex];
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    document.getElementById('modalImage').src = images[currentImageIndex];
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking outside the image
    document.getElementById('imageModal').onclick = function(event) {
        if (event.target === this) {
            closeModal();
        }
    }
    
    // Close button
    document.getElementById('closeBtn').onclick = closeModal;
    
    // Navigation buttons
    document.getElementById('nextBtn').onclick = nextImage;
    document.getElementById('prevBtn').onclick = prevImage;
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (document.getElementById('imageModal').style.display === 'block') {
            if (event.key === 'Escape') closeModal();
            if (event.key === 'ArrowRight') nextImage();
            if (event.key === 'ArrowLeft') prevImage();
        }
    });
});