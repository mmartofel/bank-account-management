# Bank Account Management System

A full-stack application for managing bank accounts, featuring a modern React frontend and Quarkus backend.

## Features

- 🔍 Interactive user search with autocomplete
- 👤 Detailed user profile views
- 💳 Bank account management
- 📱 Responsive design for all devices
- ⚡ Real-time search updates
- 🔒 Type-safe implementation

## Technology Stack

### Frontend
- React 18+ with TypeScript
- Vite for build tooling
- Material-UI for components
- React Router for navigation
- Axios for API communication

### Backend
- Quarkus framework
- Java 17+
- PostgreSQL database
- RESTful API architecture

## Project Structure

```
bank-account-management/
├── backend/                # Quarkus REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/      # Java source code
│   │   │   └── resources/ # Configuration files
│   │   └── test/          # Test files
│   └── pom.xml            # Maven dependencies
│
└── frontend/              # React frontend
    ├── src/
    │   ├── assets/        # Images and static files
    │   ├── components/    # Reusable React components
    │   ├── pages/         # Page components
    │   ├── services/      # API service layer
    │   ├── types/         # TypeScript definitions
    │   └── theme.ts       # Material-UI theme
    ├── public/            # Static files
    └── package.json       # NPM dependencies
```

## Prerequisites

- Node.js 18+
- Java 17+
- PostgreSQL 13+
- Maven 3.8+

## Development Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd bank-account-management
   ```

2. **Backend Setup**
   ```bash
   cd backend
   
   # Configure database
   # Update src/main/resources/application.properties with your PostgreSQL credentials
   
   # Start the backend
   ./mvnw quarkus:dev
   ```
   Backend will be available at http://localhost:8080

3. **Frontend Setup**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   ```
   Frontend will be available at http://localhost:5173

## Database Configuration

PostgreSQL database settings:
```properties
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=demo
quarkus.datasource.password=demo
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/demo
```

## API Documentation

- Swagger UI: http://localhost:8080/q/swagger-ui/
- OpenAPI spec: http://localhost:8080/q/openapi

## Available Endpoints

### User Management
- `GET /users/search?query={email}` - Search users by email
- `GET /users/{id}` - Get user details
- `GET /users/{id}/accounts` - Get user's bank accounts

### Account Management
- `GET /accounts` - List all accounts
- `GET /accounts/{id}` - Get account details
- More endpoints coming soon...

## Environment Variables

### Frontend
```env
VITE_API_URL=http://localhost:8080
```

### Backend
```env
QUARKUS_HTTP_PORT=8080
QUARKUS_DATASOURCE_USERNAME=demo
QUARKUS_DATASOURCE_PASSWORD=demo
QUARKUS_DATASOURCE_JDBC_URL=jdbc:postgresql://localhost:5432/demo
```

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `./mvnw quarkus:dev` - Start development server
- `./mvnw package` - Build application
- `./mvnw test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
