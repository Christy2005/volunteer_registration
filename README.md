# Volunteer Registration System

A full-stack Volunteer Registration System built for NGO event management. The platform allows volunteers to register for events while administrators can manage events, review applications, and track participation statistics.

## Live Demo

project link: https://volunteer-registration-zeta.vercel.app/

---

## Features

### Volunteer Features

* User Registration & Login
* Secure Authentication using JWT
* View all available volunteer events
* Register for events
* Prevent duplicate registrations
* View registration history
* Track application status (Pending, Approved, Rejected)

### Admin Features

* Admin Login
* Create new volunteer events
* View all created events
* View event-specific registrations
* Approve volunteer applications
* Reject volunteer applications
* Delete events
* Dashboard statistics and analytics

### Dashboard Analytics

* Total Volunteers
* Total Events
* Pending Applications
* Approved Applications
* Event-wise Registration Tracking

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt

### Database

* PostgreSQL
* Neon Database

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Project Structure

Frontend

```text
src/
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── UserDashboard.jsx
│   ├── AdminDashboard.jsx
│   ├── EventDetails.jsx
│   └── MyRegistrations.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx
```

Backend

```text
backend/
├── routes/
├── controllers/
├── middleware/
├── db.js
├── server.js
└── package.json
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/volunteer-registration.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Environment Variables

Create a `.env` file in the backend folder.

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

---

## Screenshots

### Login Page
<img width="1905" height="869" alt="Screenshot (517)" src="https://github.com/user-attachments/assets/2490b44a-14dd-41da-ba90-fa26a3470f1d" />

### User Dashboard

<img width="1920" height="858" alt="Screenshot (523)" src="https://github.com/user-attachments/assets/2175e359-bf31-48f1-851d-13efc58e20c5" />

<img width="1908" height="872" alt="Screenshot (524)" src="https://github.com/user-attachments/assets/b560cbe3-d213-463e-b096-f3614ff4179a" />


### Admin Dashboard

<img width="1920" height="859" alt="Screenshot (518)" src="https://github.com/user-attachments/assets/841b8651-d17a-47cb-9eed-6f9fa3ee7f7d" />

<img width="1914" height="858" alt="Screenshot (519)" src="https://github.com/user-attachments/assets/e674cd5d-15e2-4615-b01d-12db90b8ec84" />


### Event Details Page

<img width="1920" height="858" alt="Screenshot (520)" src="https://github.com/user-attachments/assets/7b364567-2a43-4f5f-ac7c-51f724adb8dd" />

<img width="1911" height="866" alt="Screenshot (521)" src="https://github.com/user-attachments/assets/87de3df1-6c8f-4408-b969-e8fb8e237315" />


---

## Future Enhancements

* Email Notifications
* Event Slot Tracking
* Search and Filter Events
* Volunteer Certificates
* Report Generation (PDF/Excel)
* Attendance Management

---

## Author

Christy Denees
