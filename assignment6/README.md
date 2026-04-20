# Used Items Portal

## Project Overview
The Used Items Portal is an online marketplace allowing users to buy and sell second-hand goods. The platform connects buyers and sellers through a user-friendly interface, enabling efficient transactions.

## Features
- **User Authentication**: Secure sign-up and login functionality for users.
- **Item Listings**: Users can post items for sale with detailed descriptions, images, and prices.
- **Search and Filter Options**: Buyers can easily search and filter listings based on categories, price range, and location.
- **User Profiles**: Sellers have public profiles showcasing their listings and ratings.
- **In-App Messaging**: Communication between buyers and sellers is facilitated through an in-app messaging system.
- **Rating System**: Users can rate their experiences after completing transactions.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Cloud Storage**: AWS S3 for image hosting
- **Development Tools**: Git, Postman, Visual Studio Code

## File Structure
```
FSD-Assignments/
└── assignment6/
    ├── server/             # Backend files
    ├── client/             # Frontend files
    ├── database/           # Database models
    ├── middleware/         # Middleware functions
    ├── routes/             # API routes
    ├── .env                # Environment variables
    ├── package.json        # Project metadata and dependencies
    └── README.md           # Project documentation
```

## Installation and Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ShivamKasodekar/FSD-Assignments.git
   cd FSD-Assignments/assignment6/
   ```
2. **Install Dependencies**:
   - For the server:
     ```bash
     cd server/
     npm install
     ```
   - For the client:
     ```bash
     cd ../client/
     npm install
     ```
3. **Set Up Environment Variables**:
   Create a `.env` file in the server directory and add the required variables based on the `.env.example` file.
4. **Run the Application**:
   - Start the backend server:
   ```bash
   cd server/
   npm start
   ```
   - Start the frontend application:
   ```bash
   cd ../client/
   npm start
   ```

## Database Models
- **User**: Stores user information such as username, email, password, and profile details.
- **Item**: Represents the items for sale with fields for title, description, price, seller (User), and images.
- **Message**: Facilitates communication between users with sender, recipient, and message text.
- **Rating**: Contains information about user ratings including user, rating value, and feedback.

## API Routes
- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: User login.
- **GET /api/items**: Retrieve all items.
- **POST /api/items**: Create a new item listing.
- **GET /api/items/:id**: Get details of a specific item.
- **POST /api/messages**: Send a message to another user.

## Middleware Setup
- **Auth Middleware**: Validates JWT tokens to protect routes requiring authentication.
- **Error Handling Middleware**: Global error handler for consistent error responses.

## Server Configuration
- Use of Express.js for handling routes.
- CORS enabled for cross-origin requests.
- Built-in security measures such as helmet.js.

## Learning Outcomes
- Understanding of full-stack development.
- Proficiency in using MongoDB and Express.js.
- Familiarity with creating RESTful APIs.

## Key Concepts
- RESTful API principles.
- JWT authentication flow.
- Asynchronous programming with Node.js.

## Best Practices
- Code modularization for maintainability.
- Comprehensive logging for debugging.
- Consistent error handling and user-friendly error messages.

## Troubleshooting
- Ensure all environment variables are set correctly.
- Check console logs for error messages during development.
- Verify that MongoDB is running and accessible.

## Future Enhancements
- Implement payment processing for transactions.
- Add advanced search and filtering options.
- Enable social media authentication for user login.