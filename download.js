function downloadImage(imageSrc, fileName) {
    try {
        // Validate inputs
        if (!imageSrc || !fileName) {
            console.error('Invalid parameters: imageSrc and fileName are required');
            return;
        }
        
        // Validate that imageSrc is a relative path to prevent open redirect
        if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://') || imageSrc.startsWith('//')) {
            console.error('External URLs are not allowed for security reasons');
            return;
        }
        
        // Sanitize fileName to prevent XSS
        const sanitizedFileName = fileName.replace(/[<>"'&]/g, '');
        
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = sanitizedFileName;
        // No need to append to DOM - click() works without it
        link.click();
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}