function openOrderModal(service, price) {
    document.getElementById('orderModal').style.display = 'block';
    document.getElementById('serviceTitle').textContent = 'Order ' + service;
    document.getElementById('servicePrice').textContent = 'Starting at ' + price;
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderModal();
    }
}