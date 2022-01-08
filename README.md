# EncephaScape

[Live Site](https://encephascape.herokuapp.com/)

<p>Encephascape is a single page web application "BrainScape" clone where users can create, bookmark, and study stacks.</p>

<br/>

# Table of Contents

- [Usage](#usage)
- [Technologies Used](#technologiesused)
- [MVP Feature List](#mvpfeaturelist)
- [API Routes](#apiroutes)
- [Frontend Routes](#frontendroutes)
- [Database Schema](#databaseschema)
- [Tests](#tests)
- [Contact](#contact)

<br/>

---

<a name="usage"></a>

# Usage

## To launch EncephaScape in a development environment:

1.  `cd backend` and create a .env based off .env.example. Fill in the newly created .env file with your PSQL user and database credentials.

<br />

2.  Install dependencies in both backend and front-end directories

    - `cd backend && npm install`
    - `cd frontend && npm install`

<br/>

3.  In the /backend folder run the following command to create, migrate, and seed the database.

    - `npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all`

<br/>

4.  Run the following two commands from the root folder each on seperate terminal windows:

    - `cd backend && npm start`
    - `cd frontend && npm start`

<br/>

5.  Navigate to `http://localhost:3000/` to interact with the EncephaScape app!

<br/>

---

<a name="technologiesused"></a>

# Technologies and Libraries Used

### Server (Node.js)

- Sequelize ORM
- PostgreSQL
- Express
- bcrypt

<br/>

### Client (Javascript)

- React
- Redux
- Material UI
- Lodash

<br/>

---

<a name="mvpfeaturelist" ></a>

# MVP Feature List

## 1. Sign up, log in, log out, and demo-user login.

- Users can sign up, log in, and log out.
- Users can login as demo-user to interact with the application.
- Authenticated users can navigate to their Brainfolio which displays their bookmarked stacks and created stacks.
- Authenticated users can navigate to Profile which allows them to update their username, email, and password.

<br/>

## 2. User stacks.

- Users can play stacks to study their associated questions.
- Authenticated users can create stacks with an associated category and questions.
- Authenticated users can bookmark, edit, and delete their own stacks.

<br/>

## 3. User bookmarks.

- Authenticated users can bookmark other users stacks as well as their own.
- Authenticated users can remove their bookmark from other users stacks as well as their own.

<br/>

## 3. Search stacks.

- Users can search stacks by name and/or category on the Stacks page.

<br/>

---

<a name="apiroutes"></a>

# Server (backend) API Routes

## Session

`POST /api/session`

`GET /api/session`

`DELETE /api/session`

<br />

## Users

`POST /api/users`

`DELETE /api/users`

<br />

## Categories

`GET /api/categories`

<br/>

## Stacks

`GET /api/stacks`

`POST /api/stacks`

`GET /api/stacks/:stackId`

`DELETE /api/stacks/:stackId`

`GET /api/stacks/features/random`

`GET /api/stacks/features/search`

<br/>

## Bookmarks

`GET /api/bookmarks`

`POST /api/bookmarks`

`DELETE /api/bookmarks/:bookmarkId`

<br/>

## Cards

`POST /api/cards`

`DELETE /api/cards/:cardId`

`PUT /api/cards/:cardId`

<br />

---

<a name="frontendroutes"></a>

# Client (frontend) Routes

## `/`

This page displays a navigation bar with login/sign up modals or a user button with the option to logout. Users are able to see a list of available categories and authenticated users will be able to see and additional list containing their bookmarked stacks.

<br/>

## `/stacks`

This page displays a search bar to search for stacks along with the option to filter by category.

<br/>

## `/stacks/:stackId`

This page displays a stacks name, user, and associated questions. Answers are blurred out until a user hovers over the blurred answer.

<br/>

## `/stacks/create`

This page displays a form with a name field, category field, and question fields. Users can add additional questions before creating a stack.

<br/>

## `/brainfolio`

This page displays a users stacks and bookmarked stacks. At the top of the page is the "BrainfolioActions" component that takes a user to either a random stack or to create a stack.

<br/>

## `/profile`

This page displays a users account information and allows for the update of a users account information and/or password.

<br />

---

<a name="databaseschema"></a>

# Database Schema

## Users

| column name    | data type     |               details |
| :------------- | :------------ | --------------------: |
| id             | integer       | not null, primary key |
| username       | string        |      not null, unique |
| email          | string        |      not null, unique |
| hashedPassword | binary string |              not null |
| createdAt      | datetime      |              not null |
| updatedAt      | datetime      |              not null |

<br />

## Categories

| column name | data type |               details |
| :---------- | :-------- | --------------------: |
| id          | integer   | not null, primary key |
| name        | string    |              not null |

<br />

## Stacks

| column name | data type |               details |
| :---------- | :-------- | --------------------: |
| id          | integer   | not null, primary key |
| name        | string    |              not null |
| categoryId  | integer   | not null, foreign key |
| userId      | integer   | not null, foreign key |
| createdAt   | datetime  |              not null |
| updatedAt   | datetime  |              not null |

<br />

## Cards

| column name | data type |               details |
| :---------- | :-------- | --------------------: |
| id          | integer   | not null, primary key |
| stackId     | integer   | not null, foreign key |
| term        | string    |              not null |
| response    | string    |              not null |
| createdAt   | datetime  |              not null |
| updatedAt   | datetime  |              not null |

<br />

## Bookmarks

| column name | data type |               details |
| :---------- | :-------- | --------------------: |
| id          | integer   | not null, primary key |
| userId      | integer   | not null, foreign key |
| stackId     | integer   | not null, foreign key |
| createdAt   | datetime  |              not null |
| updatedAt   | datetime  |              not null |

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
