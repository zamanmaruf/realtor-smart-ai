# 🏠 RealtorSmart AI - Smart Real Estate Assistant

A comprehensive, lead-generating Real Estate AI Assistant web demo with advanced features for property listings, lead capture, AI chatbot, and CRM management.

## ✨ Features

### 🎯 **Enhanced Lead Capture Flow**
- **Comprehensive Form Fields**: Name, email, phone, budget, timeline, pre-approval status, property type
- **Front-end Validation**: Email format, phone number validation, required field checking
- **Marketing Attribution**: Hidden fields for source tracking and referral codes
- **Success Messaging**: Professional confirmation with next steps
- **Data Storage**: JSON-based storage with email notification hooks

### 🔍 **Advanced Property Search & Filters**
- **Smart Search Bar**: Search by address, neighborhood, or keywords with real-time filtering
- **Comprehensive Filters**: Price range, bedrooms, bathrooms, property type, square footage, year built, features
- **Visual Feedback**: Properties fade and scale when filtered out
- **Saved Searches**: Users can save their search criteria for future use
- **Auto-apply Filters**: Filters apply automatically as users make selections
- **Results Counter**: Shows number of properties matching criteria

### ❤️ **Saved Properties (Favorites)**
- **Heart Icons**: Click heart icons on property cards to save favorites
- **Visual Feedback**: Heart icons fill with red when properties are favorited
- **Favorites Preview**: See your top 3 favorites in the search section
- **Favorites Modal**: View all saved properties in a dedicated modal
- **Local Storage**: Favorites persist across browser sessions
- **Quick Actions**: Remove favorites directly from the modal or preview

### 📱 **Social Sharing**
- **Share Buttons**: Green share icons on all property cards
- **Multi-Platform Support**: Facebook, Twitter, LinkedIn, Email sharing
- **Share Modal**: Beautiful modal with property preview and sharing options
- **Copy Link**: One-click link copying to clipboard
- **Custom Messages**: Pre-filled sharing text with property details
- **Direct Integration**: Opens native sharing dialogs for each platform

### 🖨️ **Print Property Reports**
- **Print Buttons**: Purple print icons on all property cards
- **Professional Layout**: Clean, print-optimized property reports
- **Complete Information**: Property details, features, and contact info
- **Branded Reports**: Includes RealtorSmart AI branding and contact details
- **Print Preview**: Opens in new window with print dialog
- **PDF-Ready**: Optimized for PDF generation and printing

### 📝 **Enhanced Contact Form**
- **File Upload**: Drag-and-drop document upload with validation
- **Multiple File Support**: Upload PDF, DOC, DOCX, JPG, PNG, TXT files
- **File Validation**: Size limits (10MB) and type validation
- **Additional Information**: Textarea for detailed requirements
- **Marketing Preferences**: Optional marketing consent checkbox
- **Privacy Compliance**: Required privacy policy consent
- **Enhanced Validation**: Comprehensive form validation with error messages

### 🤖 **AI Integration (OpenAI)**
- **Real AI Responses**: Integration with OpenAI GPT-3.5-turbo for intelligent responses
- **Fallback System**: Automatic fallback to keyword-based responses if AI is unavailable
- **Professional Context**: AI trained on real estate knowledge and best practices
- **Lead Generation**: AI encourages contact form submission for personalized assistance
- **Environment Configuration**: Uses `OPENAI_API_KEY` environment variable for production

### 📊 **Google Analytics Integration**
- **Event Tracking**: Comprehensive tracking of user interactions
- **Property Views**: Track which properties users view most
- **Lead Submissions**: Monitor form completion rates
- **Search Analytics**: Track search terms and filter usage
- **Social Sharing**: Monitor which platforms users share properties on
- **Print Tracking**: Track property report downloads
- **Favorites**: Monitor user engagement with saved properties

### 📱 **Progressive Web App (PWA)**
- **Installable App**: Users can install the app on their devices
- **Offline Functionality**: Service worker caches resources for offline use
- **Background Sync**: Form submissions saved when offline, synced when online
- **Push Notifications**: Real-time notifications for new listings and updates
- **App Manifest**: Proper app metadata and icons
- **Responsive Design**: Optimized for all device sizes

### 🔔 **Push Notifications**
- **Real-time Alerts**: Notifications for new properties and price changes
- **VAPID Protocol**: Secure push notification delivery
- **User Consent**: Opt-in notification system with clear controls
- **Rich Notifications**: Include property images and action buttons
- **Background Processing**: Notifications work even when app is closed
- **Subscription Management**: Users can subscribe/unsubscribe easily

### 🌙 **Dark Mode**
- **Toggle Switch**: Easy dark/light mode switching
- **Persistent Preference**: Remembers user's mode choice
- **Comprehensive Styling**: All components support dark mode
- **Smooth Transitions**: Animated mode switching
- **Accessibility**: High contrast for better readability

### 🌍 **Multi-Language Support**
- **5 Languages**: English, Spanish, French, German, Chinese
- **Dynamic Translation**: Real-time language switching
- **Persistent Settings**: Remembers user's language preference
- **Comprehensive Coverage**: All UI elements translated
- **Cultural Adaptation**: Proper formatting for different regions

### 🤖 **AI FAQ Chatbot**
- **20 Pre-programmed Q&A pairs** for comprehensive demo coverage
- **Automated Demo Mode**: 60-second automated conversation flow
- **Real-time Responses**: Instant property information, pricing, viewings
- **Lead Capture Integration**: Captures contact info after 2 messages
- **Floating Widget**: Bottom-right corner with smooth animations

### 🏘️ **Enhanced Property Listings**
- **Interactive Cards**: Hover effects with scale animations
- **Property Badges**: "Just Listed", "Sea View", "Reduced Price", etc.
- **Detailed Modals**: Full-size images with comprehensive property details
- **Feature Lists**: Key amenities and property highlights
- **Call-to-Action**: Direct links to chatbot and lead form

### 📊 **Dashboard/CRM View**
- **Lead Management**: Complete lead tracking with filtering
- **Statistics Dashboard**: Total leads, monthly activity, conversion rates
- **Export Functionality**: CSV export for lead data
- **Real-time Updates**: Live statistics and lead counts
- **Contact Integration**: Direct contact buttons for each lead

### 🎨 **Design & Trust Features**
- **Hero Section**: Professional overlay with agent quote
- **Testimonials**: Client success stories and agent feedback
- **Agent Profile**: Complete agent information with contact details
- **Trust Indicators**: License numbers, experience, success metrics
- **Mobile Responsive**: Fully optimized for all devices

### 📱 **Mobile Optimization**
- **Responsive Design**: All components work perfectly on mobile
- **Touch-Friendly**: Large buttons and form fields
- **Optimized Layout**: Stacked cards and simplified navigation
- **Performance**: Fast loading and smooth interactions

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd realtor-smart-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp env.txt .env
   # Edit .env with your settings
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Admin Dashboard**: http://localhost:3000/admin

## 📁 Project Structure

```
realtor-smart-ai/
├── public/                 # Static assets
│   ├── chatbot.js         # Chatbot functionality
│   ├── style.css          # Custom styles
│   ├── property1.jpg      # Property images
│   ├── property2.jpg
│   ├── property3.jpg
│   └── real-estate-bg.jpeg
├── server/                # Backend code
│   ├── controllers/       # Business logic
│   │   ├── chatbotController.js
│   │   └── leadController.js
│   ├── routes/           # API routes
│   │   ├── chatbot.js
│   │   └── leads.js
│   ├── data/            # Data storage
│   │   ├── leads.json
│   │   └── chats.json
│   └── index.js         # Main server file
├── views/               # HTML templates
│   ├── index.html      # Main landing page
│   └── admin.html      # Admin dashboard
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables (.env)
```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
```

### Agent Configuration
Update the following files to customize for your real estate business:

1. **Agent Information** (`views/index.html`)
   - Name, license number, experience
   - Contact details and WhatsApp number
   - Profile photo and bio

2. **Property Listings** (`views/index.html`)
   - Property details and images
   - Pricing and features
   - Badges and descriptions

3. **Chatbot Responses** (`server/controllers/chatbotController.js`)
   - Customize 20 Q&A pairs
   - Property-specific information
   - Contact details and policies

4. **Form Fields** (`views/index.html`)
   - Budget ranges
   - Property types
   - Timeline options

## 🎬 Demo Mode

The chatbot includes an automated demo mode for presentations:

1. **Click the purple "🎬 Demo Mode" button** in the top-right corner
2. **Watch the 20-question conversation** unfold automatically
3. **Perfect for video demos** and client presentations
4. **Click "⏸️ Stop Demo"** to end early

### Demo Questions Covered:
- Property availability and pricing
- Viewing scheduling and financing
- Location details and schools
- Market information and investment potential
- Contact information and next steps

## 📊 Admin Dashboard

Access the comprehensive CRM at `/admin`:

### Features:
- **Lead Management**: View all inquiries with detailed information
- **Statistics**: Total leads, monthly activity, conversion rates
- **Filtering**: By timeline, budget, pre-approval status
- **Export**: Download leads as CSV file
- **Contact Actions**: Direct contact buttons for each lead

### Lead Information Tracked:
- Name, email, phone
- Budget range and timeline
- Pre-approval status
- Property type preference
- Location preferences
- Source and referral tracking

## 🔌 API Endpoints

### Leads API
- `POST /api/leads` - Create new lead
- `GET /api/leads` - Get all leads
- `DELETE /api/leads/:id` - Delete specific lead

### Chatbot API
- `POST /api/chat` - Send chat message
- `GET /api/chat` - Get chat history

## 🎨 Customization Guide

### Adding New Properties
1. Add property images to `public/` directory
2. Update `propertyData` object in `views/index.html`
3. Add property cards to the listings section
4. Update chatbot responses for new properties

### Customizing Chatbot
1. Edit `server/controllers/chatbotController.js`
2. Add new keyword patterns and responses
3. Update demo questions in `public/chatbot.js`
4. Test with various user inputs

### Styling Changes
1. Modify `public/style.css` for visual updates
2. Update Tailwind classes in HTML files
3. Customize colors and branding
4. Test on mobile devices

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Setup
1. Set up environment variables
2. Configure email notifications (optional)
3. Set up domain and SSL
4. Configure backup for data files

## 📈 Future Enhancements

### Planned Features:
- **Email Integration**: SendGrid or EmailJS for lead notifications
- **Database Integration**: MongoDB or PostgreSQL for scalability
- **Advanced Analytics**: Conversion tracking and ROI metrics
- **Multi-agent Support**: Multiple agent profiles and territories
- **Property Search**: Advanced filtering and search functionality
- **Saved Properties**: User favorites and comparison tools
- **Virtual Tours**: 360° property tours integration
- **SMS Notifications**: Text message alerts for urgent leads

### Integration Options:
- **CRM Systems**: Salesforce, HubSpot, Pipedrive
- **Email Marketing**: Mailchimp, ConvertKit
- **Analytics**: Google Analytics, Facebook Pixel
- **Payment Processing**: Stripe for application fees
- **Document Management**: DocuSign for contracts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions:
- **Email**: support@realtorsmartai.com
- **Documentation**: Check this README
- **Issues**: Use GitHub issues for bug reports

---

**Built with ❤️ for the real estate industry** 