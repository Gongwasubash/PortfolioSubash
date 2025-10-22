// Advanced Voice Agent with Wake Word Detection
class AdvancedVoiceAgent {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.isSpeaking = false;
        this.isWakeWordActive = false;
        this.wakeWords = ['hey assistant', 'hello ai', 'voice assistant'];
        this.voices = [];
        this.selectedVoice = null;
        this.init();
    }

    init() {
        this.initSpeechRecognition();
        this.loadVoices();
        this.createVoiceSettings();
    }

    initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateVoiceStatus('listening');
            };

            this.recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (finalTranscript) {
                    this.processVoiceInput(finalTranscript.toLowerCase().trim());
                }

                // Show interim results
                if (interimTranscript) {
                    this.showInterimText(interimTranscript);
                }
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceStatus('idle');
                if (this.isWakeWordActive) {
                    setTimeout(() => this.startWakeWordDetection(), 1000);
                }
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isListening = false;
                this.updateVoiceStatus('error');
            };
        }
    }

    loadVoices() {
        this.voices = this.synthesis.getVoices();
        if (this.voices.length === 0) {
            this.synthesis.onvoiceschanged = () => {
                this.voices = this.synthesis.getVoices();
                this.selectBestVoice();
            };
        } else {
            this.selectBestVoice();
        }
    }

    selectBestVoice() {
        // Prefer female English voices
        const preferredVoices = ['Google UK English Female', 'Microsoft Zira', 'Alex', 'Samantha'];
        
        for (const voiceName of preferredVoices) {
            const voice = this.voices.find(v => v.name.includes(voiceName));
            if (voice) {
                this.selectedVoice = voice;
                return;
            }
        }

        // Fallback to any English voice
        this.selectedVoice = this.voices.find(v => v.lang.startsWith('en')) || this.voices[0];
    }

    processVoiceInput(text) {
        // Check for wake words
        if (!this.isWakeWordActive) {
            const hasWakeWord = this.wakeWords.some(word => text.includes(word));
            if (hasWakeWord) {
                this.activateVoiceMode();
                const command = text.replace(new RegExp(this.wakeWords.join('|'), 'gi'), '').trim();
                if (command) {
                    this.executeVoiceCommand(command);
                }
                return;
            }
        }

        // Process voice commands
        if (this.isWakeWordActive || text.length > 0) {
            this.executeVoiceCommand(text);
        }
    }

    executeVoiceCommand(command) {
        // Voice commands
        if (command.includes('stop talking') || command.includes('be quiet')) {
            this.stopSpeaking();
            return;
        }

        if (command.includes('repeat') || command.includes('say again')) {
            this.repeatLastResponse();
            return;
        }

        if (command.includes('clear chat') || command.includes('clear conversation')) {
            this.clearChat();
            return;
        }

        // Send as regular message
        document.getElementById('chat-input').value = command;
        this.sendMessage();
    }

    activateVoiceMode() {
        this.isWakeWordActive = true;
        this.speak("Voice mode activated. How can I help you?");
        this.updateVoiceStatus('active');
        
        // Auto-deactivate after 30 seconds of inactivity
        setTimeout(() => {
            if (this.isWakeWordActive) {
                this.deactivateVoiceMode();
            }
        }, 30000);
    }

    deactivateVoiceMode() {
        this.isWakeWordActive = false;
        this.updateVoiceStatus('idle');
    }

    startWakeWordDetection() {
        if (this.recognition && !this.isListening) {
            this.recognition.start();
        }
    }

    speak(text, options = {}) {
        if (this.synthesis) {
            this.synthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = this.selectedVoice;
            utterance.rate = options.rate || 0.9;
            utterance.pitch = options.pitch || 1;
            utterance.volume = options.volume || 0.8;
            
            utterance.onstart = () => {
                this.isSpeaking = true;
                this.updateSpeakerStatus('speaking');
            };
            
            utterance.onend = () => {
                this.isSpeaking = false;
                this.updateSpeakerStatus('idle');
            };
            
            this.synthesis.speak(utterance);
        }
    }

    stopSpeaking() {
        if (this.synthesis) {
            this.synthesis.cancel();
            this.isSpeaking = false;
            this.updateSpeakerStatus('idle');
        }
    }

    showInterimText(text) {
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = text;
            input.style.fontStyle = 'italic';
            input.style.opacity = '0.7';
        }
    }

    clearInterimText() {
        const input = document.getElementById('chat-input');
        if (input) {
            input.style.fontStyle = 'normal';
            input.style.opacity = '1';
        }
    }

    updateVoiceStatus(status) {
        const voiceBtn = document.getElementById('voice-btn');
        const statusIndicator = document.getElementById('voice-status');
        
        if (voiceBtn) {
            voiceBtn.className = `voice-btn ${status}`;
            switch(status) {
                case 'listening':
                    voiceBtn.innerHTML = '🔴';
                    voiceBtn.title = 'Listening...';
                    break;
                case 'active':
                    voiceBtn.innerHTML = '🟢';
                    voiceBtn.title = 'Voice mode active';
                    break;
                case 'error':
                    voiceBtn.innerHTML = '⚠️';
                    voiceBtn.title = 'Voice error';
                    break;
                default:
                    voiceBtn.innerHTML = '🎤';
                    voiceBtn.title = 'Start voice input';
            }
        }

        if (statusIndicator) {
            statusIndicator.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        }
    }

    updateSpeakerStatus(status) {
        const speakerBtn = document.getElementById('speaker-btn');
        if (speakerBtn) {
            speakerBtn.className = `speaker-btn ${status}`;
            speakerBtn.innerHTML = status === 'speaking' ? '🔇' : '🔊';
            speakerBtn.title = status === 'speaking' ? 'Stop speaking' : 'Toggle speech';
        }
    }

    createVoiceSettings() {
        // Add voice settings to chat header
        const chatHeader = document.getElementById('chat-header');
        if (chatHeader) {
            const settingsBtn = document.createElement('button');
            settingsBtn.innerHTML = '⚙️';
            settingsBtn.className = 'voice-settings-btn';
            settingsBtn.onclick = () => this.toggleVoiceSettings();
            settingsBtn.title = 'Voice settings';
            chatHeader.appendChild(settingsBtn);
        }
    }

    toggleVoiceSettings() {
        // Implementation for voice settings panel
        console.log('Voice settings panel - to be implemented');
    }

    repeatLastResponse() {
        const messages = document.querySelectorAll('.chat-msg-ai span');
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1].textContent;
            this.speak(lastMessage);
        }
    }

    clearChat() {
        const messagesDiv = document.getElementById('chat-messages');
        if (messagesDiv) {
            messagesDiv.innerHTML = '<div class="chat-msg chat-msg-ai"><div class="ai-avatar">🤖</div><span>Chat cleared. How can I help you?</span></div>';
        }
    }

    sendMessage() {
        if (window.sendMessage) {
            window.sendMessage();
            this.clearInterimText();
        }
    }
}

// Initialize advanced voice agent
const advancedVoiceAgent = new AdvancedVoiceAgent();

// Enhanced voice control functions
function toggleVoiceRecording() {
    if (advancedVoiceAgent.isWakeWordActive) {
        advancedVoiceAgent.deactivateVoiceMode();
    } else {
        advancedVoiceAgent.startWakeWordDetection();
    }
}

function toggleSpeaker() {
    if (advancedVoiceAgent.isSpeaking) {
        advancedVoiceAgent.stopSpeaking();
    }
}

function speakAIResponse(text) {
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/[🤖👋❌⚠️🔊]/g, '');
    if (cleanText.trim()) {
        advancedVoiceAgent.speak(cleanText);
    }
}