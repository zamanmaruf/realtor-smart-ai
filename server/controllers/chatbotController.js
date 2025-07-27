const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const chatsFilePath = path.join(__dirname, '../data/chats.json');

// Initialize OpenAI (will use environment variable or default to demo mode)
let openai;
try {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || 'demo-mode'
    });
} catch (error) {
    console.log('OpenAI not configured, using demo mode');
}

// Ensure data directory exists
const ensureDataFile = () => {
    const dataDir = path.dirname(chatsFilePath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(chatsFilePath)) {
        fs.writeFileSync(chatsFilePath, JSON.stringify([], null, 2));
    }
};

// Comprehensive Q&A responses for demo video
const getResponse = async (message) => {
    const lowerMessage = message.toLowerCase();
    
    // If OpenAI is configured, use real AI
    if (openai && process.env.OPENAI_API_KEY) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are RealtorSmart AI, a professional real estate assistant. You help clients with:
                        - Property information and listings
                        - Mortgage and financing questions
                        - Scheduling viewings and appointments
                        - Market analysis and trends
                        - General real estate advice
                        
                        Be helpful, professional, and concise. Always encourage clients to submit their contact information for personalized assistance.`
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                max_tokens: 150,
                temperature: 0.7
            });
            
            return completion.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI error:', error);
            // Fallback to keyword-based responses
        }
    }
    
    // Fallback keyword-based responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! I'm your RealtorSmart AI assistant. I can help you with property information, scheduling viewings, financing options, and more. What would you like to know?";
    }
    
    // 2. Property Availability
    if (lowerMessage.includes('available') || lowerMessage.includes('still available') || lowerMessage.includes('on market')) {
        return "Yes, this property is still available! We have several properties currently on the market. Would you like me to show you our latest listings or schedule a viewing?";
    }
    
    // 3. Pricing Information
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || lowerMessage.includes('listing price')) {
        return "Our properties range from $550,000 to $725,000. The 1234 Waterfront Drive is $725,000, 5678 Oak Street is $650,000, and 9012 Maple Avenue is $550,000. Which property interests you most?";
    }
    
    // 4. Property Details
    if (lowerMessage.includes('bedroom') || lowerMessage.includes('bath') || lowerMessage.includes('size') || lowerMessage.includes('square feet')) {
        return "Our properties feature 2-4 bedrooms and 2-3 bathrooms, ranging from 1,500 to 2,200 square feet. Each property is unique - would you like specific details about any particular listing?";
    }
    
    // 5. Location & Neighborhood
    if (lowerMessage.includes('location') || lowerMessage.includes('area') || lowerMessage.includes('neighborhood') || lowerMessage.includes('schools')) {
        return "All our properties are in prime locations with excellent schools, shopping centers, and public transportation nearby. The neighborhoods are family-friendly with low crime rates and great amenities.";
    }
    
    // 6. Scheduling Viewings
    if (lowerMessage.includes('viewing') || lowerMessage.includes('schedule') || lowerMessage.includes('tour') || lowerMessage.includes('visit')) {
        return "I can schedule a viewing for you! We have availability this week and next. Would you prefer weekday or weekend? I can also arrange virtual tours if you'd like to see the properties remotely.";
    }
    
    // 7. Financing Options
    if (lowerMessage.includes('financing') || lowerMessage.includes('mortgage') || lowerMessage.includes('loan') || lowerMessage.includes('payment')) {
        return "We work with several trusted lenders offering competitive rates. We can help you with conventional loans, FHA, VA, and other financing options. Would you like me to connect you with our mortgage specialist?";
    }
    
    // 8. Property Features
    if (lowerMessage.includes('features') || lowerMessage.includes('amenities') || lowerMessage.includes('upgrades') || lowerMessage.includes('modern')) {
        return "Our properties feature modern kitchens, updated bathrooms, energy-efficient appliances, and beautiful landscaping. Many have smart home features, security systems, and spacious garages.";
    }
    
    // 9. Market Information
    if (lowerMessage.includes('market') || lowerMessage.includes('trends') || lowerMessage.includes('appreciation') || lowerMessage.includes('investment')) {
        return "The local real estate market is strong with steady appreciation. Properties in this area have shown 5-8% annual growth. It's an excellent time to invest in real estate here.";
    }
    
    // 10. Property Taxes
    if (lowerMessage.includes('taxes') || lowerMessage.includes('property tax') || lowerMessage.includes('annual tax')) {
        return "Property taxes in this area range from $3,500 to $6,000 annually depending on the property value. I can provide specific tax information for any property you're interested in.";
    }
    
    // 11. Home Inspection
    if (lowerMessage.includes('inspection') || lowerMessage.includes('condition') || lowerMessage.includes('maintenance')) {
        return "All our properties are thoroughly inspected and well-maintained. We provide detailed inspection reports and can arrange additional inspections if needed. Would you like to see recent inspection reports?";
    }
    
    // 12. Closing Process
    if (lowerMessage.includes('closing') || lowerMessage.includes('closing cost') || lowerMessage.includes('timeline') || lowerMessage.includes('escrow')) {
        return "The typical closing process takes 30-45 days. Closing costs are usually 2-5% of the purchase price. I can walk you through the entire process and help you understand all the costs involved.";
    }
    
    // 13. HOA Information
    if (lowerMessage.includes('hoa') || lowerMessage.includes('association') || lowerMessage.includes('fees') || lowerMessage.includes('community')) {
        return "Some properties have HOA fees ranging from $150 to $300 monthly. These cover landscaping, maintenance, and community amenities. I can provide specific HOA details for any property.";
    }
    
    // 14. Utilities & Expenses
    if (lowerMessage.includes('utilities') || lowerMessage.includes('electricity') || lowerMessage.includes('water') || lowerMessage.includes('monthly cost')) {
        return "Typical monthly utilities range from $200 to $400 including electricity, water, gas, and internet. I can provide detailed utility cost estimates for specific properties.";
    }
    
    // 15. Schools & Education
    if (lowerMessage.includes('school') || lowerMessage.includes('education') || lowerMessage.includes('district') || lowerMessage.includes('rating')) {
        return "All properties are in highly-rated school districts with excellent public and private school options. The schools have great test scores and offer various programs for students.";
    }
    
    // 16. Transportation & Commute
    if (lowerMessage.includes('transport') || lowerMessage.includes('commute') || lowerMessage.includes('highway') || lowerMessage.includes('public transit')) {
        return "Properties are conveniently located near major highways and public transportation. Commute times to downtown are 15-25 minutes depending on traffic. There are also bike lanes and walking paths.";
    }
    
    // 17. Shopping & Entertainment
    if (lowerMessage.includes('shopping') || lowerMessage.includes('restaurant') || lowerMessage.includes('entertainment') || lowerMessage.includes('amenities')) {
        return "All properties are near shopping centers, restaurants, parks, and entertainment venues. You'll find everything you need within a 10-minute drive, including grocery stores, gyms, and movie theaters.";
    }
    
    // 18. Investment Potential
    if (lowerMessage.includes('investment') || lowerMessage.includes('rental') || lowerMessage.includes('roi') || lowerMessage.includes('return')) {
        return "These properties offer excellent investment potential with strong rental demand. Expected ROI is 6-8% annually. Many investors are interested in this area due to its growth potential.";
    }
    
    // 19. Property History
    if (lowerMessage.includes('history') || lowerMessage.includes('previous') || lowerMessage.includes('owner') || lowerMessage.includes('age')) {
        return "Our properties are well-maintained with detailed ownership history available. Most are 5-15 years old with recent updates. I can provide complete property history reports for any listing.";
    }
    
    // 20. Contact Information
    if (lowerMessage.includes('contact') || lowerMessage.includes('agent') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
        return "I can connect you with our real estate agents who are available 7 days a week. You can also call us at (555) 123-4567 or email info@realtorsmartai.com. Would you like me to schedule a consultation?";
    }
    
    // Default response
    return "Thank you for your question! I can help you with property details, pricing, viewings, financing, market information, and more. What specific information would you like to know about our properties?";
};

// Handle chat message
const handleChat = async (req, res) => {
    try {
        ensureDataFile();
        
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        const response = await getResponse(message);
        
        const chatEntry = {
            id: Date.now().toString(),
            userMessage: message,
            botResponse: response,
            timestamp: new Date().toISOString()
        };

        // Read existing chats
        const existingChats = JSON.parse(fs.readFileSync(chatsFilePath, 'utf8'));
        
        // Add new chat entry
        existingChats.push(chatEntry);
        
        // Write back to file
        fs.writeFileSync(chatsFilePath, JSON.stringify(existingChats, null, 2));

        res.json({
            success: true,
            response: response,
            chatEntry: chatEntry
        });

    } catch (error) {
        console.error('Error handling chat:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing chat message'
        });
    }
};

// Get all chats
const getChats = (req, res) => {
    try {
        ensureDataFile();
        
        const chats = JSON.parse(fs.readFileSync(chatsFilePath, 'utf8'));
        
        res.json({
            success: true,
            chats: chats
        });

    } catch (error) {
        console.error('Error reading chats:', error);
        res.status(500).json({
            success: false,
            message: 'Error reading chat history'
        });
    }
};

module.exports = {
    handleChat,
    getChats
}; 