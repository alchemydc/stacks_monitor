# System Patterns

## System Architecture
The Stacks Monitor application follows a modern web application architecture with the following components:

### Frontend
- **Viter**: Provides the foundation for the React-based UI
- **React Components**: Modular UI components for displaying signer data, alerts, and configuration options
- **Tailwind CSS**: Utility-first CSS framework for styling the application

### Backend
- **Data Fetching Layer**: Services for interacting with the Stacks blockchain API
- **Alert System**: Logic for monitoring thresholds and triggering alerts
- **Database**: SQLite for development/testing, with potential migration to Supabase for production

### Infrastructure
- **Docker**: Containerization for consistent development and deployment
- **GitHub**: Version control and CI/CD pipeline
- **Potential Vercel Deployment**: For production hosting

## Key Technical Decisions
1. **Vite**: Chosen for its modern React framework capabilities, and fast development time
2. **TypeScript**: Used throughout the application for type safety and improved developer experience
3. **SQLite for Development**: Lightweight database for local development and testing
4. **Docker for Packaging**: Ensures consistent environment across development and deployment
5. **Tailwind for Styling**: Provides rapid UI development with consistent design patterns

## Design Patterns
1. **Service Layer Pattern**: Separate services for API interactions, data processing, and alert management
2. **Repository Pattern**: For database interactions, abstracting the underlying storage mechanism
3. **Component Composition**: Building UI from small, reusable components
4. **Client Components**: For interactive UI elements requiring client-side JavaScript

## Component Relationships
```
App
├── Dashboard
│   ├── SignerSelector
│   ├── SignerList
│   │   └── SignerCard
│   └── AlertsPanel
│       └── AlertItem
├── Configuration
│   ├── ThresholdSettings
│   └── NotificationSettings
└── Services
    ├── StacksAPIService
    ├── AlertService
    └── DatabaseService
```

## Critical Implementation Paths
1. **Stacks API Integration**: Connecting to and parsing data from the Stacks blockchain API
2. **Real-time Monitoring**: Implementing efficient polling or webhook mechanisms for timely updates
3. **Alert System**: Creating reliable threshold monitoring and notification delivery
4. **User Configuration**: Building intuitive interfaces for signer selection and alert configuration
5. **Data Persistence**: Implementing database schema and operations for storing user preferences and historical data
