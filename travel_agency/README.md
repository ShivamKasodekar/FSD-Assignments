# Travel Agency Full-Stack Application

## Overview
This document serves as comprehensive documentation for the Travel Agency Full-Stack Application. The application allows users to authenticate, search for travel packages, manage bookings, and provides admin features.

## User Authentication
- **Register**: Users can create an account with the necessary details.
- **Login**: Existing users can log in using their credentials.
- **Token-based Authentication**: All API calls require a valid authentication token.

## Travel Package Search
- Users can search for travel packages based on various filters such as destination, budget, and duration.
- The search results display package details and pricing.

## Booking Management
- Users can view their bookings, modify them, or cancel if necessary.
- Each booking is associated with a travel package and user account.

## Admin Features
- Admins can manage travel packages, including adding, updating, or deleting packages.
- Admins have access to view all bookings and user information.

## Database Models
1. **User**: Stores user information, authentication credentials, and preferences.
2. **Travel Package**: Contains details of available travel packages.
3. **Booking**: Links users with booked travel packages and their statuses.

## API Routes
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Authenticate a user and return a token.
- **GET /api/packages**: Retrieve all travel packages.
- **POST /api/bookings**: Create a new booking.

## Middleware
- Authorization middleware checks for valid user tokens.
- Error handling middleware deals with application-wide errors and responses.

## File Structure
```
travel_agency
|-- src
|   |-- controllers
|   |-- models
|   |-- routes
|   |-- middleware
|   |-- config
|   |-- utilities
|-- tests
|-- .env
|-- server.js
|-- package.json
```  

## Setup Instructions
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file for environment variables (refer to `.env.example`).
4. Run the server with `npm start`.

## Technologies Used
- Node.js
- Express
- MongoDB
- JWT for authentication
- React (for the front end)

## Future Enhancements
- Integrate payment gateways for direct bookings.
- Add user reviews and ratings for travel packages.
- Implement more advanced search filters based on user preferences.
