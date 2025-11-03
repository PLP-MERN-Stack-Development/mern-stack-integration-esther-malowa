# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Assignment Overview

You will build a blog application with the following features:
1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week4-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week4-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)


---

# 📝 Student Implementation - BlogPost Application

## 📖 Project Overview
The **BlogPost App** is a full-stack MERN application that allows users to create, edit, view, and delete blog posts. It supports image uploads, comments, and category tagging.  
This project demonstrates seamless integration between the **React frontend** and **Express + MongoDB backend**.

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-link>
cd mern-blog
### 2. Install Dependencies

For backend:

cd server
npm install


For frontend:

cd client
npm install

### 3. Environment Variables

Create a .env file in the server folder with the following:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog_api_db
JWT_SECRET=your_secret_key

### 4. Run the Application
# Start backend
cd server
npm start

# Start frontend (in another terminal)
cd client
npm run dev

## API Documentation
Base URL
http://localhost:5000/api

## Endpoints
### Method	Endpoint	Description
GET	/posts	Get all posts
GET	/posts/:id	Get a single post
POST	/posts	Create a new post (requires auth)
PUT	/posts/:id	Update a post (requires auth)
DELETE	/posts/:id	Delete a post (requires auth)
POST	/posts/:id/comments	Add a comment
GET	/posts/:id/comments	Get comments for a post

##  Features Implemented

User authentication (JWT)

Create, read, update, delete (CRUD) posts

Image upload using Multer

Comment system

Responsive front-end with React + Tailwind CSS

Dynamic routing for post view

Category filtering (supports default “Uncategorized”)

🖼️ Screenshots
🏠 Homepage

📰 Post View

✍️ Create Post

🧩 Technologies Used

Frontend: React.js, Tailwind CSS, Axios, React Router

Backend: Node.js, Express.js, Multer, Joi Validation

Database: MongoDB with Mongoose

Authentication: JWT (JSON Web Token)

🧠 Author

Esther Ooko
Frontend & Backend Developer
📧 malowaesther11@gmail.com

📅 2025
