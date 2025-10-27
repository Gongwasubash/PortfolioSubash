// Chat Memory Management with Cookies
class ChatMemory {
    constructor() {
        this.maxMessages = 20; // Store last 20 messages
        this.cookieName = 'chat_history';
        this.cookieExpiry = 7; // 7 days
    }

    // Save chat history to cookies
    saveChatHistory(messages) {
        const chatData = {
            messages: messages.slice(-this.maxMessages),
            timestamp: Date.now()
        };
        this.setCookie(this.cookieName, JSON.stringify(chatData), this.cookieExpiry);
        console.log('Saved to memory:', messages.length, 'messages'); // Debug
    }

    // Load chat history from cookies
    loadChatHistory() {
        const cookieData = this.getCookie(this.cookieName);
        if (cookieData) {
            try {
                const chatData = JSON.parse(cookieData);
                return chatData.messages || [];
            } catch (e) {
                console.error('Error parsing chat history:', e);
                return [];
            }
        }
        return [];
    }

    // Add message to history
    addMessage(role, content) {
        const history = this.loadChatHistory();
        // Clean all emojis and special characters
        const cleanContent = content
            .replace(/<[^>]*>/g, '') // Remove HTML
            .replace(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}]/gu, '') // Remove emojis
            .replace(/\s+/g, ' ') // Normalize spaces
            .trim();
        
        if (cleanContent) { // Only add if content exists after cleaning
            const newMessage = {
                role: role,
                content: cleanContent,
                timestamp: Date.now()
            };
            history.push(newMessage);
            this.saveChatHistory(history);
            console.log('Added to memory:', role, '"' + cleanContent + '"');
        }
        return history;
    }

    // Get conversation context for AI
    getContextForAI() {
        const history = this.loadChatHistory();
        return history.map(msg => ({
            role: msg.role,
            content: msg.content
        }));
    }

    // Get formatted conversation for AI
    getFormattedContext() {
        const history = this.loadChatHistory();
        if (history.length === 0) return '';
        
        return history.map(msg => {
            const role = msg.role === 'user' ? 'User' : 'Assistant';
            return `${role}: ${msg.content}`;
        }).join('\n');
    }

    // Get last few messages for context
    getRecentContext(count = 10) {
        const history = this.loadChatHistory();
        const recent = history.slice(-count);
        return recent.map(msg => {
            const role = msg.role === 'user' ? 'User' : 'Assistant';
            return `${role}: ${msg.content}`;
        }).join('\n');
    }

    // Clear chat history
    clearHistory() {
        this.deleteCookie(this.cookieName);
    }

    // Cookie utilities
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

// Initialize chat memory
const chatMemory = new ChatMemory();