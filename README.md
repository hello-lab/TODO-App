# 📝 TODO App - AI-Powered Task Management

A beautiful, feature-rich todo application with AI-powered task creation, built with Next.js and featuring a unique notebook-style design.

![Login Page](https://github.com/user-attachments/assets/c185179d-c5ab-47df-afe1-a42abb9ae9a0)

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login**: Secure account creation and authentication
- **Guest Mode**: Try the app without creating an account
- **Beautiful Flip Animation**: Smooth transitions between login and signup forms
- **Notebook Design**: Handwriting-style fonts with lined paper background

### 📋 Todo Management
- **Manual Todo Creation**: Create todos with detailed information
- **AI-Powered Todo Creation**: Use Google's Gemini AI to parse natural language descriptions
- **Rich Task Details**: Add titles, deadlines, notes, and timestamps
- **Interactive Task List**: Check off completed tasks, view details, and delete items

### 🎨 User Interface
- **Notebook Aesthetic**: Beautiful lined paper design with red margin
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Icon-Based Navigation**: Intuitive navigation with colorful icon panels
- **Toast Notifications**: Real-time feedback for all user actions

### 🛠️ Technical Features
- **Database Integration**: SQLite database for user accounts and todo storage
- **Cookie-Based Storage**: Local storage for guest mode functionality
- **Real-time Sync**: Automatic synchronization for logged-in users
- **Theme Support**: Light/dark mode toggle (account page)

## 🖼️ App Screenshots & Features

### 1. Login & Authentication
![Login Page](https://github.com/user-attachments/assets/c185179d-c5ab-47df-afe1-a42abb9ae9a0)

The login page features a beautiful notebook-style design with:
- **Handwriting fonts** for an authentic feel
- **Animated flip between login/signup forms**
- **Guest Mode option** for trying the app without registration
- **Secure authentication** with password hashing

### 2. Main Todo List View
![Todo List](https://github.com/user-attachments/assets/79559eb8-b993-4946-8c31-6033cad84016)

The main dashboard displays:
- **Clean notebook layout** with lined paper background
- **Red margin line** for authentic notebook appearance
- **Navigation icons** on the right side for easy access
- **Empty state messaging** when no todos exist

When todos are added, the list shows:
- **Task titles** with click-to-complete functionality
- **Timestamps** showing when tasks were created
- **Deadline indicators** with clear date/time formatting
- **Rich notes** with emoji indicators
- **Delete buttons** for task removal

### 3. Manual Todo Creation
![Manual Todo Creation](https://github.com/user-attachments/assets/b4c0a877-6f63-4cc5-bc56-01050cd05f88)

The manual todo creation page includes:
- **Title input** for task names
- **Date picker** with calendar interface
- **Time selector** with hour/minute/AM-PM controls
- **Notes section** for detailed task descriptions
- **Instant feedback** with success notifications

### 4. AI-Powered Todo Creation
![AI Todo Creation](https://github.com/user-attachments/assets/3abe9102-b0f9-4f81-8088-baee2e3268b1)

The AI todo creation feature offers:
- **Natural language processing** using Google's Gemini AI
- **Bulk task creation** from descriptive text
- **Automatic deadline parsing** from natural language
- **Smart task breakdown** for complex projects
- **Seamless integration** with the main todo list

**Example AI Input:**
```
"Plan a birthday party for next Friday at 3 PM. Need to buy decorations by Wednesday, 
send invitations by tomorrow, and order cake by Thursday morning."
```

The AI will automatically create multiple todos with appropriate deadlines!

### 5. User Account Management
![Account Page](https://github.com/user-attachments/assets/e7e22af9-ecbf-40e7-8497-da4396a12664)

The account page provides:
- **User profile display** with avatar and email
- **Theme toggle switch** for light/dark mode
- **Clean, minimal interface** maintaining the notebook aesthetic
- **Guest mode indicator** when not logged in

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hello-lab/TODO-App.git
   cd TODO-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GOOGLE_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Technology Stack

- **Frontend Framework**: [Next.js 15.5.2](https://nextjs.org/) with React 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom animations
- **UI Components**: Custom components with Radix UI primitives
- **AI Integration**: [Google Gemini AI](https://ai.google.dev/) for natural language processing
- **Database**: [Better SQLite3](https://github.com/WiseLibs/better-sqlite3) for local data storage
- **Authentication**: Custom JWT-based authentication with bcrypt
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/) for user feedback
- **Date Handling**: [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/) for robust date/time management
- **Linting**: [Biome](https://biomejs.dev/) for code formatting and linting

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes for backend functionality
│   │   ├── auth/           # Authentication endpoints
│   │   └── todo/           # Todo CRUD operations
│   ├── app/                # Main application pages
│   │   ├── account/        # User account management
│   │   ├── home/           # Main todo list view
│   │   ├── todo/           # Manual todo creation
│   │   └── todoai/         # AI-powered todo creation
│   ├── globals.css         # Global styles and Tailwind imports
│   ├── layout.js           # Root layout component
│   └── page.js             # Landing/login page
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── login-form.js       # Login form component
│   └── signup-form.js      # Registration form component
└── db/                     # Database initialization and schema
```

## 🔧 Scripts

- **`npm run dev`** - Start development server with Turbopack
- **`npm run build`** - Build the application for production
- **`npm run start`** - Start the production server
- **`npm run lint`** - Run Biome linter
- **`npm run format`** - Format code with Biome

## 🌟 Key Features Explained

### AI Todo Parsing
The AI feature uses Google's Gemini AI to understand natural language and create structured todos:

```javascript
// Example of AI parsing capability
Input: "Meeting with client tomorrow at 2 PM, prepare presentation by tonight"
Output: [
  {
    text: "Meeting with client",
    deadline: "2025-01-04T14:00:00.000Z",
    note: "Client meeting"
  },
  {
    text: "Prepare presentation",
    deadline: "2025-01-03T23:59:59.000Z", 
    note: "For client meeting"
  }
]
```

### Cookie-Based Storage
For guest users, todos are stored in browser cookies, allowing:
- Persistence across browser sessions
- No account required for basic functionality
- Seamless transition to account-based storage

### Database Integration
For authenticated users:
- Secure todo storage in SQLite database
- Automatic synchronization across devices
- User-specific todo lists with privacy protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔮 Future Enhancements

- [ ] **Collaboration Features**: Share todos with other users
- [ ] **Categories & Tags**: Organize todos with custom categories
- [ ] **Recurring Tasks**: Set up repeating todos
- [ ] **Mobile App**: React Native mobile application
- [ ] **Calendar Integration**: Sync with Google Calendar, Outlook
- [ ] **Advanced AI**: More sophisticated natural language understanding
- [ ] **Export Features**: Export todos to PDF, CSV, etc.
- [ ] **Offline Support**: Progressive Web App capabilities

## 🙏 Acknowledgments

- **Design Inspiration**: Classic notebook and journal aesthetics
- **AI Technology**: Google's Gemini AI for natural language processing
- **UI Framework**: Next.js and Tailwind CSS communities
- **Icons**: Lucide React icon library

---

Made with ❤️ by the Hello Lab team. Start organizing your life with beautiful, AI-powered todos today!