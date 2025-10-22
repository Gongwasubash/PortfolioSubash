// Voice Agent for Chat Bot
class VoiceAgent {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.isSpeaking = false;
        this.initSpeechRecognition();
    }

    initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateVoiceButton('listening');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('chat-input').value = transcript;
                this.sendMessage();
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceButton('idle');
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isListening = false;
                this.updateVoiceButton('idle');
            };
        }
    }

    startListening() {
        if (this.recognition && !this.isListening) {
            this.recognition.start();
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    speak(text) {
        if (this.synthesis) {
            // Stop any ongoing speech
            this.synthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            
            utterance.onstart = () => {
                this.isSpeaking = true;
                this.updateSpeakerButton('speaking');
            };
            
            utterance.onend = () => {
                this.isSpeaking = false;
                this.updateSpeakerButton('idle');
            };
            
            this.synthesis.speak(utterance);
        }
    }

    stopSpeaking() {
        if (this.synthesis) {
            this.synthesis.cancel();
            this.isSpeaking = false;
            this.updateSpeakerButton('idle');
        }
    }

    updateVoiceButton(state) {
        const voiceBtn = document.getElementById('voice-btn');
        if (voiceBtn) {
            voiceBtn.className = `voice-btn ${state}`;
            voiceBtn.innerHTML = state === 'listening' ? '🔴' : '🎤';
        }
    }

    updateSpeakerButton(state) {
        const speakerBtn = document.getElementById('speaker-btn');
        if (speakerBtn) {
            speakerBtn.className = `speaker-btn ${state}`;
            speakerBtn.innerHTML = state === 'speaking' ? '🔇' : '🔊';
        }
    }

    sendMessage() {
        // Use the existing sendMessage function
        if (window.sendMessage) {
            window.sendMessage();
        }
    }
}

// Initialize voice agent
const voiceAgent = new VoiceAgent();

// Voice control functions
function toggleVoiceRecording() {
    if (voiceAgent.isListening) {
        voiceAgent.stopListening();
    } else {
        voiceAgent.startListening();
    }
}

function toggleSpeaker() {
    if (voiceAgent.isSpeaking) {
        voiceAgent.stopSpeaking();
    }
}

// Auto-speak AI responses
function speakAIResponse(text) {
    // Clean text for speech
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/[🤖👋❌⚠️]/g, '');
    voiceAgent.speak(cleanText);
}