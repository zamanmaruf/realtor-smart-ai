// Chatbot functionality
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        
        this.init();
    }

    init() {
        // Get DOM elements
        this.toggleBtn = document.getElementById('chatbotToggle');
        this.window = document.getElementById('chatbotWindow');
        this.closeBtn = document.getElementById('closeChatbot');
        this.messagesContainer = document.getElementById('chatMessages');
        this.input = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendMessage');

        // Add event listeners
        this.toggleBtn.addEventListener('click', () => this.toggle());
        this.closeBtn.addEventListener('click', () => this.close());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Add welcome message
        this.addMessage('assistant', 'Hello! I\'m your RealtorSmart AI assistant. How can I help you with our properties today?');
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.window.classList.remove('hidden');
            this.input.focus();
        } else {
            this.window.classList.add('hidden');
        }
    }

    close() {
        this.isOpen = false;
        this.window.classList.add('hidden');
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;

        // Add user message
        this.addMessage('user', message);
        this.input.value = '';

        // Show typing indicator
        this.showTyping();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            // Hide typing indicator
            this.hideTyping();

            if (data.success) {
                // Add assistant response
                this.addMessage('assistant', data.response);
            } else {
                this.addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            this.hideTyping();
            this.addMessage('assistant', 'Sorry, I\'m having trouble connecting. Please try again later.');
        }
    }

    addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-4 ${sender === 'user' ? 'text-right' : 'text-left'}`;

        const bubble = document.createElement('div');
        bubble.className = `inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800'
        }`;

        bubble.textContent = text;
        messageDiv.appendChild(bubble);

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTyping() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'mb-4 text-left';
        typingDiv.id = 'typing-indicator';
        
        const bubble = document.createElement('div');
        bubble.className = 'inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-lg';
        bubble.innerHTML = `
            <div class="flex items-center space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
        `;
        
        typingDiv.appendChild(bubble);
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Demo conversation automation
let demoMode = false;
let demoQuestions = [
    "Hello, can you help me with property information?",
    "What properties do you have available?",
    "How much do they cost?",
    "Can you tell me about the bedrooms and bathrooms?",
    "What's the location like?",
    "Are there good schools nearby?",
    "Can I schedule a viewing?",
    "What financing options do you offer?",
    "Tell me about the property features",
    "How's the real estate market doing?",
    "What are the property taxes?",
    "Do you provide home inspections?",
    "How long does the closing process take?",
    "Are there HOA fees?",
    "What about utilities and monthly costs?",
    "How's the commute to downtown?",
    "Are there shopping and restaurants nearby?",
    "Is this a good investment property?",
    "Can you tell me about the property history?",
    "How can I contact a real estate agent?"
];

let demoAnswers = [
    "Hello! I'm your RealtorSmart AI assistant. I can help you with property information, scheduling viewings, financing options, and more. What would you like to know?",
    "Yes, this property is still available! We have several properties currently on the market. Would you like me to show you our latest listings or schedule a viewing?",
    "Our properties range from $550,000 to $725,000. The 1234 Waterfront Drive is $725,000, 5678 Oak Street is $650,000, and 9012 Maple Avenue is $550,000. Which property interests you most?",
    "Our properties feature 2-4 bedrooms and 2-3 bathrooms, ranging from 1,500 to 2,200 square feet. Each property is unique - would you like specific details about any particular listing?",
    "All our properties are in prime locations with excellent schools, shopping centers, and public transportation nearby. The neighborhoods are family-friendly with low crime rates and great amenities.",
    "All properties are in highly-rated school districts with excellent public and private school options. The schools have great test scores and offer various programs for students.",
    "I can schedule a viewing for you! We have availability this week and next. Would you prefer weekday or weekend? I can also arrange virtual tours if you'd like to see the properties remotely.",
    "We work with several trusted lenders offering competitive rates. We can help you with conventional loans, FHA, VA, and other financing options. Would you like me to connect you with our mortgage specialist?",
    "Our properties feature modern kitchens, updated bathrooms, energy-efficient appliances, and beautiful landscaping. Many have smart home features, security systems, and spacious garages.",
    "The local real estate market is strong with steady appreciation. Properties in this area have shown 5-8% annual growth. It's an excellent time to invest in real estate here.",
    "Property taxes in this area range from $3,500 to $6,000 annually depending on the property value. I can provide specific tax information for any property you're interested in.",
    "All our properties are thoroughly inspected and well-maintained. We provide detailed inspection reports and can arrange additional inspections if needed. Would you like to see recent inspection reports?",
    "The typical closing process takes 30-45 days. Closing costs are usually 2-5% of the purchase price. I can walk you through the entire process and help you understand all the costs involved.",
    "Some properties have HOA fees ranging from $150 to $300 monthly. These cover landscaping, maintenance, and community amenities. I can provide specific HOA details for any property.",
    "Typical monthly utilities range from $200 to $400 including electricity, water, gas, and internet. I can provide detailed utility cost estimates for specific properties.",
    "Properties are conveniently located near major highways and public transportation. Commute times to downtown are 15-25 minutes depending on traffic. There are also bike lanes and walking paths.",
    "All properties are near shopping centers, restaurants, parks, and entertainment venues. You'll find everything you need within a 10-minute drive, including grocery stores, gyms, and movie theaters.",
    "These properties offer excellent investment potential with strong rental demand. Expected ROI is 6-8% annually. Many investors are interested in this area due to its growth potential.",
    "Our properties are well-maintained with detailed ownership history available. Most are 5-15 years old with recent updates. I can provide complete property history reports for any listing.",
    "I can connect you with our real estate agents who are available 7 days a week. You can also call us at (555) 123-4567 or email info@realtorsmartai.com. Would you like me to schedule a consultation?"
];

let currentDemoIndex = 0;
let demoInterval;

// Add demo mode toggle button
function addDemoModeButton() {
    const demoButton = document.createElement('button');
    demoButton.id = 'demoModeButton';
    demoButton.innerHTML = '🎬 Demo Mode';
    demoButton.className = 'fixed top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 z-50';
    demoButton.onclick = toggleDemoMode;
    document.body.appendChild(demoButton);
}

function toggleDemoMode() {
    demoMode = !demoMode;
    const button = document.getElementById('demoModeButton');
    
    if (demoMode) {
        button.innerHTML = '⏸️ Stop Demo';
        button.className = 'fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 z-50';
        startDemoConversation();
    } else {
        button.innerHTML = '🎬 Demo Mode';
        button.className = 'fixed top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 z-50';
        stopDemoConversation();
    }
}

function startDemoConversation() {
    currentDemoIndex = 0;
    demoInterval = setInterval(() => {
        if (currentDemoIndex < demoQuestions.length) {
            // Simulate user typing
            setTimeout(() => {
                // Add user message to chatbot
                const chatbot = window.chatbotInstance;
                if (chatbot) {
                    chatbot.addMessage('user', demoQuestions[currentDemoIndex]);
                    
                    // Simulate bot response
                    setTimeout(() => {
                        chatbot.addMessage('assistant', demoAnswers[currentDemoIndex]);
                        currentDemoIndex++;
                    }, 1000);
                }
            }, 500);
        } else {
            stopDemoConversation();
        }
    }, 3000); // 3 seconds between each Q&A
}

function stopDemoConversation() {
    if (demoInterval) {
        clearInterval(demoInterval);
        demoInterval = null;
    }
    demoMode = false;
    const button = document.getElementById('demoModeButton');
    button.innerHTML = '🎬 Demo Mode';
    button.className = 'fixed top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 z-50';
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.chatbotInstance = new Chatbot();
    addDemoModeButton(); // Add the demo mode button
}); 