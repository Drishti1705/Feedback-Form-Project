# Customer Feedback Form (Dockerized)

This is a full-stack Dockerized project for collecting customer feedback on condition monitoring implementation. It includes:

- A responsive frontend form
- A Node.js backend that saves responses in MongoDB
- Automatic email confirmation to users
- All components containerized with Docker for easy deployment


## Features

- Clean and responsive customer feedback form
- Saves data in MongoDB
- Sends feedback summary via email to the user
- Dockerized backend and database
- Easily extendable and maintainable


## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB (Dockerized)
- **Email:** Nodemailer + Gmail SMTP
- **Containerization:** Docker, Docker Compose


## Project Structure
![image](https://github.com/user-attachments/assets/11c964d8-b9a4-4db9-9772-581b66f2b28f)


## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` folder with the following contents:

**env :**

EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password
MONGO_URI=mongodb://mongo:27017/feedback_form

> Use an [App Password](https://support.google.com/accounts/answer/185833) if you're using Gmail.


## How to Run Using Docker

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Feedback-Form-Project.git
cd Feedback-Form-Project
```

### 2. Set up your environment

Create a `.env` file inside the `backend` folder as shown above.

### 3. Start the app

```cmd
docker-compose up --build
```

### API Endpoints

### `POST /submit`

* Saves feedback and sends email to the user

### `GET /get-feedback`

* Returns all feedback entries in JSON format


## View Data in MongoDB

You can view the saved responses:

### Terminal

```bash
docker ps           # Get the Mongo container ID
docker exec -it <container_id> mongosh
use feedback_form
db.feedbacks.find().pretty()
```

## Example Email Sent

The confirmation email contains a complete summary of the submitted feedback form.


## To-Do / Improvements

* Add admin dashboard to view and export feedback
* Add form validation and file upload
* Secure admin access to submissions


## License

This project is private and intended for internal evaluation and improvement tracking at Beumer India.


## Contact

If you encounter issues or need enhancements, feel free to reach out at `drishtijoshi2004@gmail.com`.
