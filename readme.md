# Bootcamp Directory API

This project is a backend API for managing bootcamp courses and reviews. It provides endpoints for bootcamps, courses, authentication, users, and reviews. Built alongside a tutorial to understand API architecture.

## Description

The Bootcamp Directory API allows clients to access and manage resources related to coding bootcamps. It includes functionality for CRUD operations on bootcamps and courses, user authentication and authorization, and submitting reviews for bootcamps.

## Features

- RESTful API architecture 
- Bootcamp and course management
- User registration and authentication using JWT
- Password reset via email
- User roles and permissions
- Bootcamp reviews and ratings
- Geospatial searching for bootcamps by radius
- Advanced query filtering, sorting, selecting, and pagination
- MongoDB database integration
- Security features like encryption, sanitization, rate limiting
- Cascading deletions for related resources
- Custom error handling middleware
- Asynchronous code with Async/Await
- Environment variable configuration
- Seeder script to load initial data

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/yourusername/bootcamp-directory-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Rename `config/config.env.env` to `config/config.env` and update the settings with your own values.

4. Make sure you have MongoDB installed and running.

5. Seed initial data (optional)
   ```sh
   node seeder -i
   ```
   
6. Run the app
   ```sh
   npm run dev     # Run in dev mode
   npm start       # Run in prod mode 
   ```

## Usage

The API can be accessed at `http://localhost:5000/api/v1/` by default. 

Use a tool like Postman to test the endpoints and their functionality.

Some sample endpoints:

- `GET /api/v1/bootcamps` - Get all bootcamps
- `POST /api/v1/bootcamps` - Create a new bootcamp (requires authentication)
- `GET /api/v1/courses` - Get all courses
- `POST /api/v1/bootcamps/:bootcampId/reviews` - Submit a review for a specific bootcamp (requires authentication) 
- `POST /api/v1/auth/register` - Register a new user
- `GET /api/v1/auth/me` - Get current logged in user

Refer to the source code for the full list of available endpoints, HTTP methods, and required request payloads. 

## Configuration

Key settings for the API can be configured in the `config/config.env` file. This includes:

- `NODE_ENV` - Environment mode (development or production)  
- `PORT` - Port to run the server on
- `MONGO_URI` - Connection URL for MongoDB 
- `JWT_SECRET` - Secret key for signing JWTs
- `JWT_EXPIRE` - Expiration time for JWTs  
- `JWT_COOKIE_EXPIRE` - Expiration time for the JWT cookie
- `SMTP_HOST, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD` - SMTP settings for sending emails
- `FROM_EMAIL, FROM_NAME` - The "from" email and name for sent emails
- `FILE_UPLOAD_PATH` - Path to store uploaded files
- `MAX_FILE_UPLOAD` - Max file upload size

## Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Testing

The project currently does not include a testing suite. This would be a great area for future development!

## License

[MIT](https://opensource.org/licenses/MIT)

## Acknowledgements

This project was built as part of a Node.js API course by Brad Traversy. Special thanks to him for the comprehensive training material.
