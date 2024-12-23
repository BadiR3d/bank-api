# Bank API Project

## Overview
This project is a simple banking API built with TypeScript, Express, and TypeORM. It provides basic banking operations such as withdrawing funds, depositing funds, and checking account balances. The application uses MySQL as the database and includes automated database initialization.

---

## Features
- **Withdraw Funds**: Deduct a specified amount from an account.
- **Deposit Funds**: Add a specified amount to an account.
- **Get Account Balance**: Retrieve the current balance of an account.
- **Logging**: Application logs are managed using `pino`.
- **Database Initialization**: Automatically checks and creates the database if it does not exist.

---

## Prerequisites
Before running the application, ensure you have the following installed:
- Node.js (>= 14.x)
- npm or yarn
- MySQL database

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/BadiR3d/bank-api
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=bank
   PORT=3000
   ```

4. Ensure the MySQL database is running.

---

## File Structure
```
project-folder
|-- src
|   |-- config
|   |   |-- ormconfig.ts          # TypeORM configuration
|   |-- controllers
|   |   |-- AccountController.ts # Handles account-related API logic
|   |-- entities
|   |   |-- Account.ts           # Database entity for accounts
|   |-- scripts
|   |   |-- ensureDatabaseExists.ts # Script to create database if missing
|   |-- utils
|   |   |-- logger.ts            # Logging utility using pino
|   |-- routes.ts                # Routes definitions for the API
|   |-- app.ts                   # Main application entry point
|-- package.json
|-- tsconfig.json
|-- README.md
```

---

## Running the Application
1. Ensure the database exists or let the application create it:
   ```bash
   npm run start
   ```

2. Access the API at `http://localhost:3000`.

---

## API Endpoints

### **1. Withdraw Funds**
- **POST** `/bank/withdraw`
- **Request Body**:
  ```json
  {
    "accountId": 1,
    "amount": 100
  }
  ```
- **Response**:
  ```json
  {
    "message": "Withdrawal successful"
  }
  ```

### **2. Deposit Funds**
- **POST** `/bank/deposit`
- **Request Body**:
  ```json
  {
    "accountId": 1,
    "amount": 100
  }
  ```
- **Response**:
  ```json
  {
    "message": "Deposit successful"
  }
  ```

### **3. Get Account Balance**
- **GET** `/bank/get-balance`
- **Query Parameters**:
  `accountId` (number)
- **Response**:
  ```json
  {
    "balance": 1000
  }
  ```

---

## Logging
- All logs are managed using `pino` and output to the console.

---

## Development
### Run in Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Lint the Code
```bash
npm run lint
```

---

## Testing
No tests are currently implemented.

---

## Future Improvements
- Add comprehensive unit and integration tests.
- Enhance error handling and validation.
- Add more endpoints, such as account creation and transaction history.

---

## Troubleshooting
- **Database Connection Issues**: Ensure the `.env` file is correctly configured and the MySQL server is running.
- **Port Conflicts**: Check if the port specified in `.env` is available.

---

## License
This project is licensed under the MIT License.

