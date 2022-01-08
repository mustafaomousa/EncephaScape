# EncephaScape

[Live Site](https://encephascape.herokuapp.com/)

<p>Encephascape is a single page web application "BrainScape" clone where users can create and study stacks.</p>

<br/>

# Table of Contents

<br/>

- [Usage](#usage)
- [Technologies Used](#technologiesused)
- [MVP Feature List](#mvpfeaturelist)
- [Frontend Routes](#frontendroutes)
- [Database Schema](#databaseschema)
- [API Routes](#apiroutes)
- [Tests](#tests)
- [Contact](#contact)

<br/>

---

<a name="usage"></a>

# Usage

<br/>

## To launch EncephaScape in a development environment:

1.  cd backend and create a .env based off .env.example. Fill in the newly created .env file with your PSQL user and database credentials.

2.  Install dependencies in both backend and front-end directories

    > 1. cd backend && npm install
    > 2. cd frontend && npm install

3.  In the backend/ folder run the following command to create,migrate, and seed the database.

    > 1. npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all

4.  Run the following two commands from the root folder each on seperate terminal windows:

    > 1. cd backend && npm start
    > 2. cd frontend && npm start

5.  Navigate to http://localhost:3000/ to interact with the EncephaScape app!

<br/>

---

<a name="technologiesused"></a>

# Technologies Used

<br/>

### Server (backend)

> - Sequelize ORM
> - PostgreSQL
> - Express

<br/>

### Client (frontend)

> - React
> - Redux
> - Material UI

<br/>

---

<a name="mvpfeaturelist" ></a>

# MVP Feature List

<br/>

## 1. Sign up, log in, log out, and demo-user login.

> - Users can sign up, log in, and log out.
> - Users can login as demo-user to interact with the application.
> - Authenticated users can navigate to their Brainfolio which displays their bookmarked stacks and created stacks.
> - Authenticated users can navigate to Profile which allows them to update their username, email, and password.

<br/>

## 2. User stacks.

> - Users can play stacks to study their associated questions.
> - Authenticated users can create stacks with an associated category and questions.
> - Authenticated users can bookmark, edit, and delete their own stacks.

<br/>

## 3. User bookmarks.

> - Authenticated users can bookmark other users stacks as well as their own.
> - Authenticated users can remove their bookmark from other users stacks as well as their own.

<br/>

## 3. Search stacks.

> - Users can search stacks by name and/or category on the Stacks page.

<br/>

---

<a name="frontendroutes"></a>

# Client (backend) Routes

<br/>

---

<a name="apiroutes"></a>

# Server (frontend) Routes

<br/>

---

<a name="databaseschema"></a>

# Database Schema

<br/>

---

<a name="tests"></a>

# Tests

<br/>

<!-- ## Cypress.io

> 1. cd backend && npx dotenv sequelize db:seed:all
> 2. cd frontend && npx cypress open
> 3. Run individual or all integration specs. -->

<br/>

---

<a name="contact"></a>

# Contact

<br/>

<p>name: Mustafa Mousa</p>
<p>email: contact@mustafamousa.com</p>
<ul>
 <a href="http://mustafaomousa.github.io/">Portfolio</a>
 <a href="https://www.linkedin.com/in/mustafa-mousa-8b8053157/">LinkedIn</a>
</ul>

[login-screenshot]: images/login-screenshot.png
[home-page-screenshot]: images/home-page-screenshot.png
