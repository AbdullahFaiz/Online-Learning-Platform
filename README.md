# lms

#Project Overview:

Online Learning Platform: A web application for students to enroll in courses and for administrators to manage courses, students, and enrollments.

Technology Stack: 
  Backend: Spring Boot, MySQL 
  Frontend: Angular 
  API Documentation: Swagger

Key Features: 
  User Authentication and Authorization 

  Course Management (CRUD operations) 
  Student Management (CRUD operations) 
  Enrollment Management (CRUD operations) 
  Student Portal (Course listing, enrollment) 
  Admin Panel (Course, student managment)

## Designing the System Backend (Spring Boot)

  Security: Implement JWT-based authentication and authorization.


  Models: User (with roles: student, admin) Course (id, title, description, etc.) Student (id, name, email, etc.) Enrollment (id, student, course, enrollmentDate)

  Repositories: UserRepository CourseRepository StudentRepository EnrollmentRepository

  Services: UserService CourseService StudentService EnrollmentService

  Controllers: AuthController (for login, registration) StudentController (for student-related endpoints) CourseController (for course-related endpoints) EnrollmentController (for enrollment-related endpoints) AdminController (for admin-specific endpoints)

##Backend Project Setup

 **Prerequisites** 
   Java 8 
   Maven
   MySQL Database

## Setup
  Clone the repository 
  Update the database connection details in the application.properties or application.yml file. 
  Maven Build the project 
  Start the Application
  Make a GET request to the endpoint `http://localhost:8080/createAdmin` to create an admin user with Username "Admin" and "Ab@12345" as password. 
  The backend services will be accessible at `http://localhost:8080` once started.

##Frontend Project Setup 


**Prerequisites** 
  Node.js 
  npm 
  Angular

## Setup
  Clone the repository 
  Navigate to the project directory 
  Install Dependencies using `npm install` command 
  Start the development server using `ng serve` command 
  The Angular frontend services wil be accessible at `http://localhost:4200` once started.
