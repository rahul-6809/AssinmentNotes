# AssinmentNotes


This is a web application that allows users to create, view, update, and delete personal notes. Users can register an account, log in, and securely store their notes. The application also provides authentication and authorization features to ensure user data privacy.

Features
- User Registration: Users can create an account with a unique username and password.

- User Login: Registered users can log in securely using their credentials.

- Authentication: Authentication is implemented using JWT (JSON Web Tokens) for secure access to user-specific data.

- Create Notes: Authenticated users can create new notes by providing a title and description.

- View Notes: Users can view their existing notes in a list format, with titles and brief descriptions.

- Update Notes: Users can edit and update their notes by changing the title or description.

- Delete Notes: Users can delete unwanted notes, and deleted notes are moved to a trash folder.

- Trash Folder: Deleted notes are temporarily stored in the trash folder and can be permanently deleted from there.

- Logout: Users can securely log out from their accounts.

## Deployment
- The backend of this project is deployed on Render, and the frontend is deployed on Netlify.

### Backend Live Link: https://assba.onrender.com
### Frontend Live Link: https://ephemeral-sorbet-7166ba.netlify.app/
## Technologies Used
- Frontend: React.js, Axios, Bootstrap
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JSON Web Tokens (JWT)

## Getting Started

Follow these steps to get your project up and running.

### Prerequisites

- Node.js and npm installed.
- Git installed.

### Clone the Repository


git clone https://github.com/your-username/your-repo.git

## Install Backend Dependencies
Navigate to the backend directory and install the required dependencies

<pre>
  
cd backend

  </pre>
  
### Create an .env file in the backend directory with the following environment variables:

- PORT - Port for the backend server.
- SECRET_KEY - Secret key for JWT authentication.
- DB_CONNECTION - Database connection URL.
- Example .env file:

<pre>
  
PORT=3000
SECRET_KEY=your-secret-key
DB_CONNECTION=your-database-connection-url

</pre>

<pre>
npm install
</pre>
## Deploy Backend on Render

- Create an account on Render if you don't have one.
- Set up your Render project and create a web service for your backend.
- Configure environment variables and other settings as needed.
- Deploy your backend to Render.
- Install Frontend Dependencies
- Navigate to the frontend directory and install the required dependencies.

  <pre>
    
 cd frontend
npm install
</pre>

## Build the Frontend

    <pre>
      
 npm run build
</pre>
- Deploy Frontend on Netlify
- Create an account on Netlify if you don't have one.
- Connect your GitHub repository to Netlify.
- Configure your build settings (e.g., build command and publish directory).
- Deploy your frontend to Netlify.

