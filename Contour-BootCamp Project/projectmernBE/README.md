# Backend Activity Tracker App

This is the backend application for an activity tracker app. It provides API endpoints to manage activities.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/activity-tracker-backend.git
   ```
2. Navigate to the project directory:
   ```shell
    cd activity-tracker-backend
    ```
3. Install the dependencies:
    ```shell
    cd activity-tracker-backend
    ```
4. Set up the environment variables:
Create a .env file in the project root directory.
Specify the required environment variables in the .env file, such as the database connection URL, port, MongoDBUrl.

5. Start the server:
    ```shell
    npm start
    ```
The server will start running on the specified port.
## Usage
   ### API Endpoints
   login
   Logout 
   Activity
   ### MVC
   Follow the best practice of MVC frame work with proper folder structure
## Database
The app uses a MongoDB database to store activity data. Make sure you have a running MongoDB instance and update the database connection URL in the environment variables.

## Dependencies
Express: Web framework for Node.js.
Mongoose: MongoDB object modeling for Node.js.
Validator: Library for string validation and sanitization.
jsonwebtoken: Library for creating token
bcrypt: library for Hashing Password

## Contributing
Contributions are welcome! Please follow the contribution guidelines.

## License
This project is licensed under the MIT License.