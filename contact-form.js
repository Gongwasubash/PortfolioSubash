document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    try {
        // Try Django server first
        const response = await fetch('http://127.0.0.1:8000/send-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            alert('Message sent successfully!');
            this.reset();
        } else {
            console.error('Server error:', result.error);
            alert('Failed to send message: ' + (result.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Error: Make sure Django server is running on http://127.0.0.1:8000');
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
});