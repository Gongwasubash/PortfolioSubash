# Voice Agent Setup Guide

## Features Added

### 🎤 Voice Input
- **Click microphone button** to start voice recording
- **Say "Hey Assistant" or "Hello AI"** to activate wake word mode
- **Speak naturally** - your speech will be converted to text

### 🔊 Text-to-Speech
- **AI responses are automatically spoken**
- **Click speaker button** to stop current speech
- **Voice commands**: "stop talking", "repeat", "clear chat"

### 🎯 Wake Word Detection
- Say **"Hey Assistant"** or **"Hello AI"** to activate voice mode
- Voice mode stays active for 30 seconds
- Continuous listening for wake words

## Voice Commands

| Command | Action |
|---------|--------|
| "Hey Assistant" | Activate voice mode |
| "Stop talking" | Stop AI speech |
| "Repeat" | Repeat last AI response |
| "Clear chat" | Clear conversation |

## Browser Compatibility

### ✅ Supported Browsers
- Chrome/Chromium (Best support)
- Edge
- Safari (Limited)
- Firefox (Limited)

### 🔧 Setup Requirements
1. **HTTPS required** for voice recognition
2. **Microphone permission** needed
3. **Modern browser** with Web Speech API

## Usage Instructions

### Basic Voice Chat
1. Open chat widget
2. Click 🎤 microphone button
3. Speak your message
4. AI will respond with voice

### Wake Word Mode
1. Say "Hey Assistant" 
2. Voice mode activates (green indicator)
3. Continue speaking naturally
4. Mode auto-deactivates after 30s

### Voice Settings
- Click ⚙️ in chat header for settings
- Adjust speech rate, pitch, volume
- Select preferred voice

## Troubleshooting

### No Voice Recognition
- Check microphone permissions
- Ensure HTTPS connection
- Try Chrome browser

### No Speech Output
- Check browser audio settings
- Ensure speakers/headphones work
- Try refreshing page

### Wake Words Not Working
- Speak clearly and slowly
- Ensure quiet environment
- Check microphone sensitivity

## Technical Implementation

### Files Added
- `voice-agent.js` - Basic voice functionality
- `advanced-voice-agent.js` - Enhanced features
- `voice-styles.css` - Voice UI styles

### Integration Points
- Chat widget enhanced with voice controls
- Auto-speech for AI responses
- Voice status indicators
- Responsive voice controls

## Future Enhancements
- Multiple language support
- Custom wake words
- Voice training
- Noise cancellation
- Voice authentication