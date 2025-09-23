<div align="center">
  <img
    src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=200&section=header&text=Velocia%20API&fontSize=50&fontAlignY=35&animation=fadeIn&desc=Production-Ready%20Transportation%20Platform&descAlignY=55&descSize=18"
    alt="Header"
  />
</div>

<div align="center">
  <h2>
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png"
      width="28px"
      alt="Fast"
    />
    Enterprise-Grade Transportation Backend Solution
  </h2>
  <p><strong>Built with passion, designed for scale</strong></p>
  <p><strong>Velocia</strong> is a production-ready, scalable backend API for modern ride-sharing
platforms. Built with cutting-edge technologies and best practices, it provides
a robust foundation for transportation applications with real-time capabilities,
secure authentication, and comprehensive administrative controls.</p>
</div>


<div align="center">
    
  [![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge)](https://github.com/zahid-official/milestone-17)
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-3C873A.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Express](https://img.shields.io/badge/Express.js-4.18-aa8800.svg?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
</div>

<div align="center">
    
  [![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg?style=for-the-badge&logo=vercel)](https://vercel.com)
  [![Redis](https://img.shields.io/badge/Redis-7.0-DC382D.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
  [![License](https://img.shields.io/badge/license-MIT-22333b.svg?style=for-the-badge)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-0081a7.svg?style=for-the-badge)](https://github.com/zahid-official/milestone-17/pulls)
</div>

## ✨ Features
<table  align="center">
  <tr>
    <td width="50%">
      
### 🔐 Authentication & Security
- **JWT-based Authentication** with refresh token rotation
- **Role-based Access Control** with granular permissions
- **Advanced Password Security** using bcrypt encryption
- **Two-Factor Authentication** via OTP verification
- **Session Management** with Redis caching
      
### 🚗 Ride Management
- **Complete Lifecycle Management** from request to completion
- **Real-time Status Tracking** with live updates
- **Geolocation Services** for accurate pickup/dropoff
- **Smart Driver Matching** algorithm
- **Dynamic Pricing** calculation system
      
    </td>
    <td width="50%">
      
### 👨‍💼 Administrative Control
- **User & Driver Management** dashboard
- **Verification Workflows** for driver applications
- **Analytics & Reporting** with detailed insights
- **Account Management** including suspension controls
- **Regulatory Compliance Monitoring**
- **Dispute Resolution** system
      
### 💰 Financial Operations
- **Earnings Tracking** for drivers
- **Payment Integration** ready architecture
- **Transaction History** with detailed records
- **Financial Reporting** and analytics
- **Commission Management** system
      
    </td>
  </tr>
</table>
</br>


## 🏗️ System Architecture
```mermaid
graph TB
    subgraph "Client Layer"
        A[Mobile App]
        B[Web App]
        C[Admin Dashboard]
    end

    subgraph "API Gateway"
        D[Load Balancer]
        E[Rate Limiter]
        F[API Router]
    end

    subgraph "Service Layer"
        G[Auth Service]
        H[User Service]
        I[Ride Service]
        J[Driver Service]
        K[Payment Service]
    end

    subgraph "Data Layer"
        L[(MongoDB)]
        M[(Redis Cache)]
        N[Message Queue]
    end

    A & B & C --> D
    D --> E --> F
    F --> G & H & I & J & K
    G & H & I & J & K --> L
    G & H & I & J & K --> M
    I & J --> N
```
<div align="center">
    
| Design Principle              | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| **🎯 Microservice-Ready**     | Modular architecture that can be easily decomposed into microservices |
| **📈 Horizontal Scalability** | Built to scale out with increased load                                |
| **🔒 Security-First**         | Security considerations at every architectural layer                  |
| **🔄 Event-Driven**           | Asynchronous communication patterns for better performance            |
| **📊 Observable**             | Comprehensive logging, monitoring, and tracing capabilities           |
</div>


## 🛠️ **Tech Stack**
<div align="center">
    
### **Core Technologies**
<table>
  <tr>
    <td align="center" width="120">
      <img
        src="https://skillicons.dev/icons?i=typescript"
        width="48"
        height="48"
        alt="TypeScript"
      />
      <br />TypeScript
    </td>
    <td align="center" width="100">
      <img
        src="https://skillicons.dev/icons?i=nodejs"
        width="50"
        height="50"
        alt="Node.js"
      />
      <br />Node.js
    </td>
    <td align="center" width="100">
      <img
        src="https://skillicons.dev/icons?i=express"
        width="50"
        height="50"
        alt="Express"
      />
      <br />Express
    </td>
    <td align="center" width="100">
      <img
        src="https://skillicons.dev/icons?i=mongodb"
        width="50"
        height="50"
        alt="MongoDB"
      />
      <br />MongoDB
    </td>
    <td align="center" width="100">
      <img
        src="https://skillicons.dev/icons?i=redis"
        width="50"
        height="50"
        alt="Redis"
      />
      <br />Redis
    </td>
    <td align="center" width="120">
      <img
        src="https://skillicons.dev/icons?i=vercel"
        width="48"
        height="48"
        alt="Vercel"
      />
      <br />Vercel
    </td>
  </tr>
</table>

### **Additional Stack**

| Category             | Technologies                 | Purpose                      |
| :------------------- | :--------------------------- | :--------------------------- |
| 🔒 **Security**      | `JWT` `Passport.js` `Bcrypt` | Authentication & protection  |
| ✅ **Validation**    | `Zod` `Mongoose`             | Validation & object modeling |
| 📧 **Communication** | `Nodemailer` `Socket.io`     | Email & real-time            |
| 🧪 **Testing**       | `Postman`                    | Endpoint tests               |
| 🚀 **Deployment**    | `Vercel`                     | Cloud deployment             |
</div>
</br>

## 🚀 **Getting Started**
### **⚡ Quick Installation**

```bash
# 1. Clone the repository
git clone https://github.com/zahid-official/milestone-17.git
cd milestone-17

# 2. Install dependencies
npm install

# 3. Set up environment variables (Windows)
copy .env.example .env
# Edit .env with your configuration

# 4. Start development server
npm run dev

# 5. Access the API
# http://localhost:5000/api/v1
```

### **📦 Using MongoDB Atlas (Recommended)**

For easier setup without local MongoDB installation:
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get connection string
3. Update `.env` with your connection string:
   
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/velociaDB
   ```

### **🔧 Environment Configuration**
<details>
<summary><b>Click to view essential .env variables</b></summary>

```env
# Server Configuration
NODE_ENV=development | production
PORT=5000

# Database Configuration
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/zvelociaDB?retryWrites=true&w=majority&appName=Cluster1
# OR Local MongoDB
# DB_URL=mongodb://localhost:27017/velociaDB

# JWT Configuration
JWT_ACCESS_SECRET=your-jwt-access-secret-change-this
JWT_ACCESS_EXPIRESIN=24h
JWT_REFRESH_SECRET=your-jwt-refresh-secret-change-this
JWT_REFRESH_EXPIRESIN=90d

# Express Session Configuration
EXPRESS_SESSION_SECRET=your-express-session-secret-change-this

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=10

# Frontend Configuration
FRONTEND_URL=http://localhost:5173

# Default Admin Credentials
DEFAULT_ADMIN_EMAIL=primary@email.com
DEFAULT_ADMIN_PASSWORD=primary@Admin01

# Redis Configuration
RADIS_HOST=your-redis-host
RADIS_PORT=your-redis-port
RADIS_USERNAME=default
RADIS_PASSWORD=your-redis-password

# SMTP Configuration
SMTP_PORT=465
SMTP_HOST=smtp.gmail.com
SMTP_FROM=your-email@gmail.com
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

</details>

---

## 📚 **API Documentation**

### **🔗 Base URLs**

```yaml
Development: http://localhost:5000/api/v1
Production: https://velocia-api.vercel.app/api/v1
```

### **📋 API Endpoints**

<details>
<summary><b>🔐 Authentication Routes</b></summary>

| HTTP Method | Endpoint                 | Description                                   | Authentication Required |
| ----------- | ------------------------ | --------------------------------------------- | ----------------------- |
| `POST`      | `/auth/login`            | Authenticate user with credentials            | No                      |
| `POST`      | `/auth/logout`           | Invalidate current user session               | No                      |
| `GET`       | `/auth/regenerate-token` | Generate new access token using refresh token | No                      |
| `POST`      | `/auth/sendOTP`          | Send OTP for verification purposes            | No                      |
| `POST`      | `/auth/verifyOTP`        | Verify OTP code for authentication            | No                      |
| `PATCH`     | `/auth/change-password`  | Update user password                          | Yes (Any Role)          |
| `PATCH`     | `/auth/forgot-password`  | Initiate password reset process               | No                      |
| `PATCH`     | `/auth/reset-password`   | Complete password reset with verification     | Yes (Any Role)          |

</details>

<details>
<summary><b>👤 User Management Routes</b></summary>

| HTTP Method | Endpoint               | Description                               | Authentication Required |
| ----------- | ---------------------- | ----------------------------------------- | ----------------------- |
| `POST`      | `/user/register`       | Create new user account                   | No                      |
| `GET`       | `/user/profile`        | Retrieve current user profile information | Yes (Any Role)          |
| `PATCH`     | `/user/update/:id`     | Update user account information           | Yes (Owner/Admin)       |
| `GET`       | `/user/`               | Retrieve all registered users             | Yes (Admin Only)        |
| `GET`       | `/user/singleUser/:id` | Retrieve specific user by ID              | Yes (Admin Only)        |
| `PATCH`     | `/user/block/:id`      | Block user account                        | Yes (Admin Only)        |
| `PATCH`     | `/user/unblock/:id`    | Unblock user account                      | Yes (Admin Only)        |

</details>

<details>
<summary><b>🚕 Driver Management Routes</b></summary>

| HTTP Method | Endpoint                          | Description                          | Authentication Required |
| ----------- | --------------------------------- | ------------------------------------ | ----------------------- |
| `POST`      | `/driver/apply`                   | Submit driver application            | Yes (Any Role)          |
| `GET`       | `/driver/earnings`                | View driver earnings history         | Yes (Driver Only)       |
| `PATCH`     | `/driver/availability/:driverId`  | Update driver availability status    | Yes (Driver Only)       |
| `PATCH`     | `/driver/updateDetails/:driverId` | Update driver account details        | Yes (Owner/Admin)       |
| `GET`       | `/driver/`                        | Retrieve all driver applications     | Yes (Admin Only)        |
| `GET`       | `/driver/:driverId`               | Retrieve specific driver information | Yes (Admin Only)        |
| `PATCH`     | `/driver/approve/:driverId`       | Approve driver application           | Yes (Admin Only)        |
| `PATCH`     | `/driver/reject/:driverId`        | Reject driver application            | Yes (Admin Only)        |
| `PATCH`     | `/driver/suspend/:driverId`       | Suspend driver account               | Yes (Admin Only)        |
| `PATCH`     | `/driver/unsuspend/:driverId`     | Reactivate suspended driver account  | Yes (Admin Only)        |

</details>

<details>
<summary><b>🏍️ Ride Management Routes</b></summary>

| HTTP Method | Endpoint                   | Description                            | Authentication Required |
| ----------- | -------------------------- | -------------------------------------- | ----------------------- |
| `POST`      | `/ride/request`            | Request a new ride                     | Yes (Rider Only)        |
| `GET`       | `/ride/history`            | Retrieve rider's complete ride history | Yes (Rider Only)        |
| `PATCH`     | `/ride/cancel/:rideId`     | Cancel pending ride request            | Yes (Rider Only)        |
| `GET`       | `/ride/requestedRides`     | View available ride requests           | Yes (Driver/Admin)      |
| `PATCH`     | `/ride/accept/:rideId`     | Accept ride request                    | Yes (Driver Only)       |
| `PATCH`     | `/ride/reject/:rideId`     | Reject ride request                    | Yes (Driver Only)       |
| `PATCH`     | `/ride/pickUp/:rideId`     | Confirm rider pickup                   | Yes (Driver Only)       |
| `PATCH`     | `/ride/inTransit/:rideId`  | Update ride status to in transit       | Yes (Driver Only)       |
| `PATCH`     | `/ride/complete/:rideId`   | Mark ride as completed                 | Yes (Driver Only)       |
| `GET`       | `/ride/`                   | Retrieve all platform rides            | Yes (Admin Only)        |
| `GET`       | `/ride/singleRide/:rideId` | Retrieve specific ride details         | Yes (Admin Only)        |

</details>

### API Response Format

All API responses follow this consistent structure:

#### Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation completed successfully",
  "data": {
    // Response payload
  },
  "meta": {
    "page": 2,
    "limit": 10,
    "totalPage": 25,
    "totalDoc": 245
  }
}
```

#### Error Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation error",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

## 👥 User Roles & Permissions

### Role Hierarchy

```mermaid
graph TD
    A[Administrator] --> B[Full System Access]
    C[Driver] --> D[Ride Operations]
    E[Rider] --> F[Ride Booking]

    B --> G[User Management]
    B --> H[Driver Management]
    B --> I[Platform Analytics]

    D --> J[Accept/Reject Rides]
    D --> K[Manage Availability]
    D --> L[View Earnings]

    F --> M[Request Rides]
    F --> N[View History]
    F --> O[Rate Drivers]
```

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

## 💻Development & Deployment

<details>
<summary><h3>📂 Project Structure</h3></summary>

```
project/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 config/                    # Application configuration
│   │   │   ├── 📄 env.ts                 # Environment variable management
│   │   │   ├── 📄 env.interface.ts       # Environment type definitions
│   │   │   ├── 📄 passport.ts            # Authentication strategy configuration
│   │   │   └── 📄 redis.ts               # Redis connection setup
│   │   │
│   │   ├── 📁 errors/                    # Error handling
│   │   │   └── 📄 AppError.ts            # Custom application error class
│   │   │
│   │   ├── 📁 interfaces/                # Global type definitions
│   │   │   └── 📄 index.d.ts             # Shared interface declarations
│   │   │
│   │   ├── 📁 middlewares/               # Express middleware functions
│   │   │   ├── 📄 globalErrorHandler.ts  # Centralized error handling
│   │   │   ├── 📄 notFoundHandler.ts     # 404 error handling
│   │   │   ├── 📄 validateSchema.ts      # Request validation middleware
│   │   │   └── 📄 validateToken.ts       # Authentication middleware
│   │   │
│   │   ├── 📁 modules/                   # Feature-based modules
│   │   │   ├── 📁 auth/                  # Authentication services
│   │   │   │   ├── 📄 auth.controller.ts
│   │   │   │   ├── 📄 auth.routes.ts
│   │   │   │   ├── 📄 auth.service.ts
│   │   │   │   └── 📄 auth.validation.ts
│   │   │   │
│   │   │   ├── 📁 user/                  # User management
│   │   │   │   ├── 📄 user.controller.ts
│   │   │   │   ├── 📄 user.interface.ts
│   │   │   │   ├── 📄 user.model.ts
│   │   │   │   ├── 📄 user.routes.ts
│   │   │   │   ├── 📄 user.service.ts
│   │   │   │   └── 📄 user.validation.ts
│   │   │   │
│   │   │   ├── 📁 driver/                # Driver operations
│   │   │   │   ├── 📄 driver.controller.ts
│   │   │   │   ├── 📄 driver.interface.ts
│   │   │   │   ├── 📄 driver.model.ts
│   │   │   │   ├── 📄 driver.routes.ts
│   │   │   │   ├── 📄 driver.service.ts
│   │   │   │   └── 📄 driver.validation.ts
│   │   │   │
│   │   │   └── 📁 ride/                  # Ride management
│   │   │       ├── 📄 ride.controller.ts
│   │   │       ├── 📄 ride.interface.ts
│   │   │       ├── 📄 ride.model.ts
│   │   │       ├── 📄 ride.routes.ts
│   │   │       ├── 📄 ride.service.ts
│   │   │       └── 📄 ride.validation.ts
│   │   │
│   │   ├── 📁 routes/                    # Route aggregation
│   │   │   └── 📄 index.ts               # Main route configuration
│   │   │
│   │   └── 📁 utils/                     # Utility functions
│   │       ├── 📄 catchAsync.ts          # Async error handling
│   │       ├── 📄 constants.ts           # Application constants
│   │       ├── 📄 JWT.ts                 # JWT utility functions
│   │       ├── 📄 sendResponse.ts        # Standardized response formatting
│   │       └── 📁 templates/             # Email templates
│   │           ├── 📄 forgotPassword.ejs
│   │           └── 📄 sendOtp.ejs
│   │
│   ├── 📄 app.ts                         # Express application setup
│   └── 📄 server.ts                      # Server bootstrap and initialization
│
├── 📄 .env.example                       # Environment example
├── 📄 .gitignore                         # Git ignore rules
├── 📄 package.json                       # Dependencies
├── 📄 tsconfig.json                      # TypeScript config
├── 📄 eslint.config.mjs                  # Eslint config
└── 📄 README.md                          # This file
```

</details>

### **Deploy to Vercel**

<div>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zahid-official/milestone-17)

</div>

#### **Manual Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add MONGODB_URI
vercel env add JWT_ACCESS_SECRET

# Deploy to production
vercel --prod
```

#### **Vercel Configuration**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

## 🌟 **Author**

<div align="center">
  <a href="https://github.com/zahid-official">
    <img src="https://github.com/zahid-official.png" width="150" height="150" style="border-radius: 50%;" alt="Zahid Official" />
  </a>
  
  <h3>Zahid Official</h3>
  <p><b>Full Stack Developer | Open Source Enthusiast</b></p>
  
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/zahid-official)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/zahid-web)
  [![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:zahid.official8@gmail.com)
  
  <p>Built with passion and dedication to create scalable solutions</p>
</div>

---

## 🤝 **Contributing**

Contributions make the open source community amazing! Any contributions you make are **greatly appreciated**.

```bash
1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
```

</br>

<div align="center">
  
Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

</div>
