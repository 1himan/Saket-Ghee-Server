# Saket Ghee Server

This directory contains the server-side code for the Saket Ghee project. The server is built using Node.js and Express, and it connects to a MongoDB database to manage product data and user authentication.

## Project Structure

- **index.js**: The entry point of the server application. It sets up the Express app, connects to MongoDB, and defines the routes for the application.

- **models**:
    - **Product.js**: Defines the schema for the product data stored in MongoDB.
    - **Warehouse.js**: Defines the schema for managing inventory across multiple storage locations.

- **data**:
    - **products.js**: Contains the dummy product data that is inserted into the database during initialization.

- **controllers**:
    - **authControllers.js**: Contains the logic for user registration, login, and logout.

- **routes**:
    - **authRoutes.js**: Defines the routes for user authentication, including registration, login, and logout.

- **middlewares**:
    - **checkAuth.js**: Middleware to check if a user is authenticated.
    - **rateLimit.js**: Middleware to limit the rate of requests to the server.

- **initializeData.js**: Script to initialize the database with dummy product data.

## Dependencies

- **bcryptjs**: For hashing passwords.
- **connect-mongo**: For storing session data in MongoDB.
- **cookie-parser**: For parsing cookies.
- **cors**: For enabling Cross-Origin Resource Sharing.
- **dotenv**: For loading environment variables from a .env file.
- **express**: Web framework for Node.js.
- **express-rate-limit**: For limiting the rate of requests.
- **express-session**: For managing user sessions.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens.
- **mongoose**: For interacting with MongoDB.

## Scripts

- **start**: Starts the server in production mode.
- **dev**: Starts the server in development mode.

## Environment Variables

- **NODE_ENV**: Specifies the environment (development or production).
- **PORT**: The port on which the server runs.
- **MONGO_URI**: The URI for connecting to the MongoDB database.

## Usage

1. Install dependencies:
     ```bash
     npm install
     ```

2. Start the server in development mode:
     ```bash
     npm run dev
     ```

3. Start the server in production mode:
     ```bash
     npm start
     ```

4. Initialize the database with dummy data:
     ```bash
     node initializeData.js
     ```

## API Endpoints

- **/api/auth/register**: Register a new user.
- **/api/auth/login**: Login a user.
- **/api/auth/logout**: Logout a user.
- **/api/auth/user-details**: Get details of the authenticated user.
- **/products**: Get a list of products with pagination and search functionality.
- **/products/:id**: Get details of a single product by ID.

## Middleware

- **checkAuth**: Ensures that the user is authenticated before accessing certain routes.
- **rateLimit**: Limits the rate of requests to prevent abuse.

## Models

- **Product**: Represents a product in the database.
- **Warehouse**: Represents a warehouse for managing inventory.

## Controllers

- **authControllers**: Handles user authentication logic.

## Data

- **products**: Contains dummy product data for initializing the database.

## Initialization

- **initializeData**: Script to initialize the database with dummy product data.

## License

This project is licensed under the MIT License.