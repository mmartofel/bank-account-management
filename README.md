# Bank Account Management System

A modern, microservices-based bank account management system built with React (Frontend) and Quarkus (Backend).

## Quick Start - OpenShift Deployment

The entire application stack can be deployed to OpenShift with just a few commands:

```bash
# Clone the repository
git clone https://github.com/mmartofel/bank-account-management.git
cd bank-account-management

# Create a new OpenShift project
oc new-project bank-account-management

# Deploy the entire stack using Kustomize
oc apply -k deployment/
```

This will deploy:
- PostgreSQL database with persistent storage
- Quarkus backend service
- React frontend with nginx
- All necessary ConfigMaps, Services, and Routes

Monitor the deployment:
```bash
oc get pods -w
```

## Architecture

The system consists of three main components:
- **Frontend**: React 18 with TypeScript and Vite
- **Backend**: Quarkus 3.16.4 with Hibernate ORM
- **Database**: PostgreSQL 12

### Technology Stack

#### Frontend
- React 18
- TypeScript
- Vite
- Material-UI
- Axios for API calls
- React Router for navigation

#### Backend
- Quarkus 3.16.4
- Hibernate ORM with Panache
- RESTEasy for REST endpoints
- PostgreSQL for data persistence
- OpenAPI/Swagger for API documentation

## Local Development Setup

### Prerequisites
- Node.js 16+ and npm
- Java 17+
- Maven
- Docker/Podman
- PostgreSQL 12+

### Running Locally

1. **Database Setup**
   ```bash
   # Start PostgreSQL
   docker run -d --name postgres \
     -e POSTGRESQL_USER=demo \
     -e POSTGRESQL_PASSWORD=demo \
     -e POSTGRESQL_DATABASE=demo \
     -p 5432:5432 \
     registry.redhat.io/rhel8/postgresql-12:latest
   ```

2. **Backend Setup**
   ```bash
   cd backend
   ./mvnw clean package
   ./mvnw quarkus:dev
   ```
   The backend will be available at http://localhost:8080

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will be available at http://localhost:5173

## OpenShift Deployment

### Prerequisites
- OpenShift 4.x cluster
- `oc` CLI tool
- Access to Quay.io registry

### Deployment Steps

1. **Create a new project**
   ```bash
   oc new-project bank-account-management
   ```

2. **Deploy the application**
   ```bash
   # Apply Kustomize configuration
   oc apply -k deployment/
   ```

   This will deploy:
   - PostgreSQL database with persistent storage
   - Backend service
   - Frontend service with route

### Configuration

The application uses ConfigMaps for configuration:

1. **Database (configmap-postgres.yaml)**
   - Database name, user, and password
   - Connection parameters

2. **Backend (configmap-backend.yaml)**
   - Database connection settings
   - API configurations

3. **Frontend (configmap-frontend.yaml)**
   - API base URL
   - Environment-specific settings

## Project Structure

```
bank-account-management/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   └── pages/          # Page components
│   ├── vite.config.ts       # Vite configuration
│   └── nginx.conf          # Nginx configuration for production
├── backend/                 # Quarkus backend application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/       # Java source code
│   │   │   └── resources/  # Application resources
│   │   └── test/           # Test files
│   └── pom.xml             # Maven configuration
└── deployment/             # Kubernetes/OpenShift configurations
    ├── postgres/           # PostgreSQL deployment files
    ├── backend/           # Backend deployment files
    └── frontend/          # Frontend deployment files
```

## API Documentation

The API documentation is available at:
- Local: http://localhost:8080/swagger-ui
- OpenShift: http://backend-route/swagger-ui

## Features

- User account management
- Transaction history
- Account balance tracking
- User search functionality
- Secure API endpoints
- Responsive UI design

## Development Guidelines

### Frontend
- Use TypeScript for type safety
- Follow React best practices
- Implement proper error handling
- Use environment variables for configuration

### Backend
- Follow RESTful API design principles
- Implement proper validation and error handling
- Use Hibernate for database operations
- Document APIs using OpenAPI annotations

## Monitoring and Health Checks

All components include health checks:
- Frontend: Nginx health checks
- Backend: Quarkus health checks (/q/health)
- Database: PostgreSQL container health checks

## Security Considerations

- CORS configuration
- Secure headers
- Database connection security
- Container security contexts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Add your license here]
