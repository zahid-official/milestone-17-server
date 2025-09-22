# Velocia

**Enterprise-Grade Ride Sharing Backend API**

A production-ready, scalable backend API designed for modern ride-sharing platforms. Velocia delivers comprehensive ride management, secure user authentication, and robust administrative controls built to enterprise standards.

---

## Table of Contents

- ✨[Overview](#overview)
- 🏗️[Architecture](#architecture)
- 🛠️[Technology Stack](#technology-stack)
- 🚀[Installation](#installation)
- ⚙️[Configuration](#configuration)
- 📚[API Reference](#api-reference)
- 👥[User Roles](#user-roles)
- 🔒[Security](#security)
- 💻[Development](#development)
- 🚢[Deployment](#deployment)
- 🤝[Contributing](#contributing)
- 📄[License](#license)

---

## ✨Overview

Velocia provides a complete backend solution for ride-sharing applications, implementing industry best practices for security, scalability, and maintainability. The system supports three distinct user roles with carefully designed permissions and workflows, ensuring optimal user experience across all platform interactions.

### Key Capabilities

**Authentication & Security**
- Stateless JWT-based authentication with refresh token rotation
- Role-based access control with granular permissions
- Advanced password security with bcrypt encryption
- OTP-based verification system for critical operations

**Ride Management**
- Complete ride lifecycle management from request to completion
- Real-time status tracking and updates
- Geolocation-based pickup and destination handling
- Driver matching and availability management

**Administrative Control**
- Comprehensive user and driver management
- Driver verification and approval workflows
- Platform analytics and reporting capabilities
- Account management with blocking and suspension features

**Financial Operations**
- Driver earnings calculation and tracking
- Payment integration readiness
- Transaction history and financial reporting

---

## 🏗️Architecture

Velocia follows a modular, microservice-ready architecture that promotes maintainability and scalability. The system is built with separation of concerns, ensuring each module handles specific business logic while maintaining loose coupling between components.

### Design Principles

- **Modular Structure**: Feature-based organization with clear boundaries
- **Scalable Foundation**: Designed for horizontal scaling and performance
- **Security First**: Security considerations integrated at every architectural layer
- **API-Centric**: RESTful design with consistent patterns and responses
- **Data Integrity**: Robust validation and error handling throughout

### System Components

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Layer  │    │  API Gateway    │    │  Authentication │
│                 │────│                 │────│     Service     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │  Business Logic │
                       │    Modules      │
                       └─────────────────┘
                                │
                       ┌─────────────────┐    ┌─────────────────┐
                       │  Data Access    │────│     Cache       │
                       │     Layer       │    │   (Redis)       │
                       └─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │    Database     │
                       │   (MongoDB)     │
                       └─────────────────┘
```

---

## 🛠️Technology Stack

### Core Technologies
- **Node.js** v18.0+ - JavaScript runtime environment
- **Express.js** v4.18+ - Web application framework
- **TypeScript** v5.0+ - Static type checking and enhanced development experience
- **MongoDB** v6.0+ - Primary database for data persistence
- **Mongoose** v7.0+ - Object Document Mapper for MongoDB
- **Redis** v7.0+ - In-memory cache and session storage

### Security & Authentication
- **Passport.js** - Authentication middleware
- **JSON Web Tokens** - Stateless authentication
- **bcrypt** - Password hashing
- **helmet** - Security headers middleware

### Validation & Communication
- **Zod** v3.0+ - Schema validation and type inference
- **Nodemailer** - Email communication
- **EJS** - Template engine for email templates

---

## 🚀Installation

### Prerequisites

Ensure your development environment meets the following requirements:

- **Node.js** version 18.0 or higher
- **MongoDB** version 6.0 or higher (local installation or cloud instance)
- **Redis** version 7.0 or higher
- **npm**, **yarn**, or **pnpm** package manager

### Setup Process

**Step 1: Repository Setup**
```bash
git clone https://github.com/your-organization/velocia.git
cd velocia
```

**Step 2: Dependency Installation**
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm (recommended)
pnpm install
```

**Step 3: Service Dependencies**

Ensure MongoDB and Redis services are running on your system:

```bash
# Start MongoDB (local installation)
mongod --dbpath /path/to/your/data/directory

# Start Redis server
redis-server
```

**Step 4: Application Launch**
```bash
# Development environment
npm run dev

# Production build and start
npm run build
npm start
```

The application will be accessible at `http://localhost:5000` with the API base path `/api/v1`.

---

## ⚙️Configuration

### Environment Variables

Create a `.env` file in the project root directory with the following configuration:

```env
# Application Configuration
NODE_ENV=development
PORT=5000

# Database Connections
MONGODB_URI=mongodb://localhost:27017/velociaDB
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_ACCESS_SECRET=your-secure-access-token-secret
JWT_REFRESH_SECRET=your-secure-refresh-token-secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

# Email Service Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-application-password

# Security Settings
BCRYPT_SALT_ROUNDS=12

# Default Administrator Account
DEFAULT_ADMIN_EMAIL=admin@velocia.com
DEFAULT_ADMIN_PASSWORD=SecureAdminPassword@123
```

### Configuration Guidelines

- **JWT Secrets**: Use strong, unique secrets for production environments
- **Database URIs**: Configure appropriate connection strings for your database setup
- **Email Service**: Set up SMTP credentials for email notifications and OTP delivery
- **Security**: Adjust salt rounds based on your security requirements and server performance

---

## 📚API Reference

**Base URL**: `http://localhost:5000/api/v1`

All API responses follow a consistent structure with appropriate HTTP status codes and standardized error handling.

### Authentication Endpoints

| HTTP Method | Endpoint | Description | Authentication Required |
|-------------|----------|-------------|------------------------|
| `POST` | `/auth/login` | Authenticate user with credentials | No |
| `POST` | `/auth/logout` | Invalidate current user session | No |
| `GET` | `/auth/regenerate-token` | Generate new access token using refresh token | No |
| `POST` | `/auth/sendOTP` | Send OTP for verification purposes | No |
| `POST` | `/auth/verifyOTP` | Verify OTP code for authentication | No |
| `PATCH` | `/auth/change-password` | Update user password | Yes (Any Role) |
| `PATCH` | `/auth/forgot-password` | Initiate password reset process | No |
| `PATCH` | `/auth/reset-password` | Complete password reset with verification | Yes (Any Role) |

### User Management

| HTTP Method | Endpoint | Description | Authentication Required |
|-------------|----------|-------------|------------------------|
| `POST` | `/user/register` | Create new user account | No |
| `GET` | `/user/profile` | Retrieve current user profile information | Yes (Any Role) |
| `PATCH` | `/user/update/:id` | Update user account information | Yes (Owner/Admin) |
| `GET` | `/user/` | Retrieve all registered users | Yes (Admin Only) |
| `GET` | `/user/singleUser/:id` | Retrieve specific user by ID | Yes (Admin Only) |
| `PATCH` | `/user/block/:id` | Block user account | Yes (Admin Only) |
| `PATCH` | `/user/unblock/:id` | Unblock user account | Yes (Admin Only) |

### Driver Management

| HTTP Method | Endpoint | Description | Authentication Required |
|-------------|----------|-------------|------------------------|
| `POST` | `/driver/apply` | Submit driver application | Yes (Any Role) |
| `GET` | `/driver/earnings` | View driver earnings history | Yes (Driver Only) |
| `PATCH` | `/driver/availability/:driverId` | Update driver availability status | Yes (Driver Only) |
| `PATCH` | `/driver/updateDetails/:driverId` | Update driver account details | Yes (Owner/Admin) |
| `GET` | `/driver/` | Retrieve all driver applications | Yes (Admin Only) |
| `GET` | `/driver/:driverId` | Retrieve specific driver information | Yes (Admin Only) |
| `PATCH` | `/driver/approve/:driverId` | Approve driver application | Yes (Admin Only) |
| `PATCH` | `/driver/reject/:driverId` | Reject driver application | Yes (Admin Only) |
| `PATCH` | `/driver/suspend/:driverId` | Suspend driver account | Yes (Admin Only) |
| `PATCH` | `/driver/unsuspend/:driverId` | Reactivate suspended driver account | Yes (Admin Only) |

### Ride Operations

| HTTP Method | Endpoint | Description | Authentication Required |
|-------------|----------|-------------|------------------------|
| `POST` | `/ride/request` | Request a new ride | Yes (Rider Only) |
| `GET` | `/ride/history` | Retrieve rider's complete ride history | Yes (Rider Only) |
| `PATCH` | `/ride/cancel/:rideId` | Cancel pending ride request | Yes (Rider Only) |
| `GET` | `/ride/requestedRides` | View available ride requests | Yes (Driver/Admin) |
| `PATCH` | `/ride/accept/:rideId` | Accept ride request | Yes (Driver Only) |
| `PATCH` | `/ride/reject/:rideId` | Reject ride request | Yes (Driver Only) |
| `PATCH` | `/ride/pickUp/:rideId` | Confirm rider pickup | Yes (Driver Only) |
| `PATCH` | `/ride/inTransit/:rideId` | Update ride status to in transit | Yes (Driver Only) |
| `PATCH` | `/ride/complete/:rideId` | Mark ride as completed | Yes (Driver Only) |
| `GET` | `/ride/` | Retrieve all platform rides | Yes (Admin Only) |
| `GET` | `/ride/singleRide/:rideId` | Retrieve specific ride details | Yes (Admin Only) |

---

## 👥User Roles

### Administrator Role
Administrators have comprehensive platform oversight with full system access. Key responsibilities include:

- **User Management**: Complete control over user accounts, including creation, modification, and deactivation
- **Driver Operations**: Review and process driver applications, manage driver status and permissions
- **Platform Oversight**: Access to all rides, transactions, and system analytics
- **System Administration**: Configuration management and platform maintenance capabilities
- **Dispute Resolution**: Handle customer service issues and ride disputes

### Rider Role
Riders represent the customer base with access to core ride-booking functionality:

- **Account Management**: Personal profile creation, modification, and maintenance
- **Ride Services**: Request rides with specified pickup locations and destinations
- **Ride Management**: Cancel rides within allowed timeframes and track ride progress
- **History Access**: View complete ride history with detailed trip information
- **Service Interaction**: Rate drivers and provide feedback on completed rides

### Driver Role
Drivers are service providers with specialized tools for ride fulfillment:

- **Application Process**: Submit applications for platform approval with required documentation
- **Ride Operations**: Accept or reject ride requests based on availability and preferences
- **Service Delivery**: Manage complete ride lifecycle from pickup to completion
- **Financial Tracking**: Access earnings history and payment information
- **Availability Control**: Set online/offline status and manage working hours

---

## 🔒Security

### Authentication Framework

**JWT Implementation**
- Stateless authentication using JSON Web Tokens
- Dual-token system with access and refresh tokens
- Automatic token refresh for seamless user experience
- Secure token storage and transmission practices

**Password Security**
- bcrypt hashing with configurable salt rounds
- Password complexity requirements and validation
- Secure password reset process with OTP verification
- Protection against common password attacks

### Authorization System

**Role-Based Access Control**
- Granular permission system based on user roles
- Resource-level access control for sensitive operations
- Dynamic permission validation for all protected endpoints
- Inheritance-based permission structure for scalability

**Request Security**
- Comprehensive input validation using Zod schemas
- SQL injection prevention through parameterized queries
- Cross-Site Scripting (XSS) protection with input sanitization
- Rate limiting to prevent abuse and DDoS attacks

### Data Protection

**Encryption Standards**
- Data encryption at rest and in transit
- Secure communication protocols (HTTPS)
- Database connection encryption
- API endpoint security headers

**Privacy Controls**
- Personal data protection compliance
- User consent management
- Data retention policies
- Secure data deletion procedures

---

## 💻Development

### Project Structure

```
src/
├── app/
│   ├── config/                    # Application configuration
│   │   ├── env.ts                 # Environment variable management
│   │   ├── env.interface.ts       # Environment type definitions
│   │   ├── passport.ts            # Authentication strategy configuration
│   │   └── redis.ts               # Redis connection setup
│   │
│   ├── errors/                    # Error handling
│   │   └── AppError.ts            # Custom application error class
│   │
│   ├── interfaces/                # Global type definitions
│   │   └── index.d.ts             # Shared interface declarations
│   │
│   ├── middlewares/               # Express middleware functions
│   │   ├── globalErrorHandler.ts  # Centralized error handling
│   │   ├── notFoundHandler.ts     # 404 error handling
│   │   ├── validateSchema.ts      # Request validation middleware
│   │   └── validateToken.ts       # Authentication middleware
│   │
│   ├── modules/                   # Feature-based modules
│   │   ├── auth/                  # Authentication services
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.validation.ts
│   │   │
│   │   ├── user/                  # User management
│   │   │   ├── user.controller.ts
│   │   │   ├── user.interface.ts
│   │   │   ├── user.model.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.validation.ts
│   │   │
│   │   ├── driver/                # Driver operations
│   │   │   └── [similar structure]
│   │   │
│   │   └── ride/                  # Ride management
│   │       └── [similar structure]
│   │
│   ├── routes/                    # Route aggregation
│   │   └── index.ts               # Main route configuration
│   │
│   └── utils/                     # Utility functions
│       ├── catchAsync.ts          # Async error handling
│       ├── constants.ts           # Application constants
│       ├── JWT.ts                 # JWT utility functions
│       ├── sendResponse.ts        # Standardized response formatting
│       └── templates/             # Email templates
│           ├── forgotPassword.ejs
│           └── sendOtp.ejs
│
├── app.ts                         # Express application setup
└── server.ts                      # Server bootstrap and initialization
```

### Development Standards

**Code Quality**
- TypeScript strict mode enforcement for type safety
- ESLint configuration for consistent code formatting
- Comprehensive error handling with custom error classes
- Modular architecture promoting code reusability

**API Standards**
- RESTful design principles with standard HTTP methods
- Consistent response formatting across all endpoints
- Comprehensive request validation and sanitization
- Detailed error messages for debugging and user feedback

### Testing Guidelines

**Unit Testing**
- Test coverage for all business logic functions
- Mocking of external dependencies and services
- Validation of error handling scenarios
- Performance testing for critical operations

**Integration Testing**
- End-to-end API endpoint testing
- Database integration validation
- Authentication and authorization flow testing
- Cross-module interaction verification

---

## 🚢Deployment

### Production Environment Setup

**Environment Preparation**
```env
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/velocia
REDIS_URL=redis://production-redis-server:6379
```

**Security Hardening**
- SSL/TLS certificate configuration for HTTPS
- CORS policy configuration for production domains
- Rate limiting and request throttling
- Security headers and middleware configuration

**Performance Optimization**
- Database indexing for optimal query performance
- Connection pooling for database and Redis connections
- Caching strategy implementation
- Load balancing configuration for horizontal scaling

### Deployment Strategies

**Container Deployment**
- Docker containerization for consistent environments
- Docker Compose for local development and testing
- Kubernetes deployment for production scaling
- Container orchestration and service discovery

**Cloud Deployment**
- Platform-as-a-Service (PaaS) deployment options
- Infrastructure-as-a-Service (IaaS) configuration
- Content Delivery Network (CDN) integration
- Database-as-a-Service (DBaaS) setup

---

## 🤝Contributing

We welcome contributions to the Velocia project. Please follow our established guidelines to ensure code quality and project consistency.

### Contribution Process

**Getting Started**
1. Fork the repository to your GitHub account
2. Create a feature branch from the main branch
3. Implement your changes following project standards
4. Write comprehensive tests for new functionality
5. Update documentation for any API changes
6. Submit a pull request with detailed description

### Development Setup for Contributors

```bash
# Fork and clone the repository
git clone https://github.com/your-username/velocia.git
cd velocia

# Install dependencies
npm install

# Set up development environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Code Standards

**TypeScript Guidelines**
- Use strict TypeScript configuration
- Implement proper type definitions for all functions
- Follow consistent naming conventions
- Document complex business logic with comments

**Architecture Principles**
- Maintain modular structure with clear separation of concerns
- Implement proper error handling throughout the application
- Follow RESTful API design principles
- Ensure scalability and maintainability in all implementations

---

## 📄License

This project is licensed under the MIT License. This license permits use, modification, and distribution of the software for both commercial and non-commercial purposes, subject to the terms and conditions outlined in the license agreement.

For complete license details, please refer to the [LICENSE](LICENSE) file included in this repository.

---

## Support and Documentation

For comprehensive support and detailed documentation:

**Technical Support**
- **Issues**: Report bugs and feature requests through [GitHub Issues](https://github.com/your-organization/velocia/issues)
- **Discussions**: Join community discussions at [GitHub Discussions](https://github.com/your-organization/velocia/discussions)
- **Documentation**: Access detailed guides in the [Project Wiki](https://github.com/your-organization/velocia/wiki)

**Community Resources**
- **API Documentation**: Complete endpoint reference with examples
- **Developer Guides**: Step-by-step implementation tutorials
- **Best Practices**: Recommended patterns for extension and customization

---

**Velocia** - Powering the next generation of transportation technology through robust, scalable, and secure backend infrastructure.