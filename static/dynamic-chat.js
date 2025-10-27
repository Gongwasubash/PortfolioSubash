// Dynamic Chatbot with Configurable Webhook
class DynamicChatbot {
    constructor() {
        this.webhookUrl = null;
        this.isConfigured = false;
        this.memory = [];
        
        // Auto-load saved webhook
        setTimeout(() => this.loadSavedWebhook(), 100);
    }

    // Configure webhook URL
    setWebhook(url) {
        this.webhookUrl = url;
        this.isConfigured = true;
        console.log('Webhook configured:', url);
        this.showStatus('Connected', 'success');
        
        // Store webhook URL in localStorage
        localStorage.setItem('chatbot_webhook', url);
    }

    // Load saved webhook on init
    loadSavedWebhook() {
        const savedUrl = localStorage.getItem('chatbot_webhook');
        if (savedUrl) {
            this.setWebhook(savedUrl);
            return true;
        }
        return false;
    }

    // Send message to configured webhook
    async sendMessage(message) {
        if (!this.isConfigured) {
            this.showError('Webhook not configured');
            return;
        }

        try {
            this.addToMemory('user', message);
            this.showTyping();

            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    message: message,
                    conversation_history: this.getMemoryAsText()
                })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            const aiResponse = data.output || data.response || data.message || data.text || 'No response';
            
            this.hideTyping();
            this.addToMemory('assistant', aiResponse);
            this.displayMessage('ai', aiResponse);
            
        } catch (error) {
            this.hideTyping();
            this.showError(`Connection failed: ${error.message}`);
        }
    }

    // Memory management
    addToMemory(role, content) {
        this.memory.push({role, content, timestamp: Date.now()});
        if (this.memory.length > 20) this.memory.shift();
    }

    getMemoryAsText() {
        return this.memory.map(m => `${m.role}: ${m.content}`).join('\n');
    }

    // UI methods
    displayMessage(type, content) {
        const messagesDiv = document.getElementById('chat-messages');
        const msgClass = type === 'user' ? 'chat-msg-user' : 'chat-msg-ai';
        const avatar = type === 'ai' ? '<div class="ai-avatar">🤖</div>' : '';
        
        messagesDiv.innerHTML += `<div class="chat-msg ${msgClass}">${avatar}<span>${content}</span></div>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    showTyping() {
        const messagesDiv = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'chat-msg chat-msg-ai';
        typingDiv.innerHTML = '<div class="ai-avatar">🤖</div><span>Typing...</span>';
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    showStatus(message, type = 'info') {
        const statusEl = document.getElementById('webhook-status');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.className = `status ${type}`;
        }
    }

    showError(message) {
        this.displayMessage('ai', `❌ ${message}`);
    }

    clearChat() {
        this.memory = [];
        document.getElementById('chat-messages').innerHTML = '';
        this.displayMessage('ai', 'Chat cleared. Configure webhook to start.');
    }
}

// Initialize dynamic chatbot
const dynamicChat = new DynamicChatbot();