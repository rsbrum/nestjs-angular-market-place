# Installation Instructions

- **Installation:** Execute `npm install` to install the necessary packages.
- **Running the Application:** Use `npm run start:dev` to start the application in development mode.

# Technical Requirements

REST API and WebSocket Server: The app-server must incorporate both a RESTful API and a WebSocket server.
Shared Resources: Utilize a shared directory for common resources, schemas, or data.

# Database Configuration

- **Database Choice:** SQLite is used for data storage, selected for its simplicity and efficiency.
- **Initial Data Setup:** The application is pre-loaded with seed data located in the db folder.

# Authentication

- **Basic Authentication:** The application includes a fundamental authentication system. However, it currently lacks protected routes or security guards.

# Modular Structure

# Modules Overview

- **App Module:** Initializes the application and configures SQLite. Includes AppService for database seeding.
- **Cars Module:** Manages CRUD operations for cars. Relies on BidsModule for tracking bids on each car.
- **Users Module:** Handles CRUD operations for user management and authentication.
- **Bids Module:** Oversees CRUD operations for bids. Features AutoBidService for automatic bid generation based on user and car availability. Regularly updates the database and notifies clients through WebSocket events.
- **Gateway Module:** Establishes the WebSocket for monitoring and broadcasting bidding events.

# Shared Resources

- **DTOs:** Located in the shared project directory, these Data Transfer Objects (DTOs) are essential for request/response handling in both the app-ui and app-server.
