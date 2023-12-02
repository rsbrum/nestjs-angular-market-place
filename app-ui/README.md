# Setup Instructions

**Installing Dependencies:** Use `npm install` to install necessary packages.
**Starting the Application:** Execute `ng serve` to launch the application.

# Project Overview

**Purpose**
The application serves as an online marketplace for car biddings. It allows users to:

- Bid on cars currently listed.
- Add new cars to the bidding list.
- View bids in real time.

# Authentication

- **System:** A basic authentication system, primarily for demonstration.
- **Session Management:** Utilizes localStorage.
- **User Authentication:** A hardcoded user is used for the authenticate action.

# Shared Resources

- **DTOs:** Located in the shared project directory, these Data Transfer Objects (DTOs) are essential for request/response handling in both the app-ui and app-server.

# Main Components

# Left Panel:

**Functionality:** Displays user actions.
**Unauthenticated Users:** Presents an option to authenticate.
**Actions:** Users can place or add bids on cars.

# Canvas:

**Purpose:** Shows a live feed of ongoing bids.
**Technology:** Uses a websocket to update bid events in real time.

# Console:

**Functionality:** Logs application actions.
**Implementation:** Utilizes BehaviourSubject for state management.

# Right Sidebar:

**Display:** Shows cars available for bidding along with details like price, name, image, and bid count.
**Updates:** Refreshes the list with new bid counts as they occur.

# Services

**Console Service:** Manages state and data flow for the Console Component.
**Bids Service:** Handles new bids, bid state management, and listens to the websocket for the Canvas Component.
**Cars Service:** Responsible for car creation, managing the state of listed cars in the Right Sidebar, and updating it with new bids.
**Auth Service:** Handles basic authentication functions, such as user retrieval, login, and logout.

# Constants

**Messages:** An enum containing texts for messages emitted by the console service.
**Routes:** An enum detailing API routes used by various services.

# Interfaces

**Purpose:** Defines interfaces for entities used throughout the project.
