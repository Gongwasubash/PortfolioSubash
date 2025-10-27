// Debug Memory System
function debugMemory() {
    console.log('=== MEMORY DEBUG ===');
    const history = chatMemory.loadChatHistory();
    console.log('Total messages in memory:', history.length);
    
    history.forEach((msg, i) => {
        console.log(`${i+1}. ${msg.role}: ${msg.content}`);
    });
    
    console.log('Formatted context:');
    console.log(chatMemory.getFormattedContext());
    console.log('===================');
}

// Add debug button to chat
function addDebugButton() {
    const header = document.getElementById('chat-header');
    if (header && !document.getElementById('debug-btn')) {
        const debugBtn = document.createElement('button');
        debugBtn.id = 'debug-btn';
        debugBtn.innerHTML = '🐛';
        debugBtn.onclick = debugMemory;
        debugBtn.style.cssText = 'background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 1rem;';
        debugBtn.title = 'Debug Memory';
        header.querySelector('div').insertBefore(debugBtn, header.querySelector('div').firstChild);
    }
}

// Auto-add debug button when chat opens
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addDebugButton, 1000);
});