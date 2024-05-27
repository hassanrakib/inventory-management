# Inventory Management Server

This project represents a simple node.js server. It manages two collections of `products` & `orders` in a mongodb database to create, read, update & delete data with validations and logics. Following is the package.json dependency list.

```json
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongoose": "^8.4.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.3.0",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "globals": "^15.3.0",
    "prettier": "3.2.5",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.4.5",
    "typescript-eslint": "^7.10.0"
  }
```

## Steps to Run the Project Locally

Before you begin, ensure you have the following installed on your machine.

- Git
- Latest version of Node.js

#### 1. Clone the Repository

Open your terminal and run the following command to clone the repository.

```sh
git clone https://github.com/hassanrakib/inventory-management.git
```

#### 2. Navigate to the Project Directory

```sh
cd inventory-management
```

#### 3. Install Dependencies

Install necessary dependencies using npm.

```sh
npm install
```

#### 4. Setup Environment Variables

Create a `.env` file in the root of the project and add the following environment variables. Change `DB_URI` to your `mongodb` uri for database.

```dotenv
NODE_ENV='development'
PORT='5000'
DB_URI='mongodb-uri-for-mongodb-database'
```

#### 5. Run the Server

```sh
npm run dev
```

#### 6. Access the Server

Open your web browser and navigate to http://localhost:5000
