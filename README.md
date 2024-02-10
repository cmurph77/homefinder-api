
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000/login](http://localhost:3000/login) to view it in your browser.
The REACT should navigate to the login page automatically.

### Turn on the server to test the Login page

1. `cd server `
2. `node index.js`

## Functions Already Done

- Navigation between two pages
- No access to the [homepage]([http://localhost:3000/) (i.e. re-direct to the Login page) unless there's a valid token
  - To get a valid token now, just simply click Login button

- Store token in the localStorage, so it won't disapprear when refreshing the page

### Login Page

- Post username and password first time login
- Get a token(authorization) from the server and send the token in Request.Header.Authorization

### Sign Up Page

- Verify entered is a valid E-mail address
- Confirm password