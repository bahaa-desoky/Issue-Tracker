
# [Issue tracker](https://issue-tracker-app-54p7.onrender.com/)

Issue Tracker is a light web application that lets users create projects and add issue tickets for each project so that they can keep up-to-date and organized when working.

It is a full stack application built using the MERN stack (MongoDB, Express, Node.js and React). The following is a breakdown of the specific tools used and why they were chosen:
- __React__
	- React is fast and easy to use. It is also industry standard and has an active community, so there are many great tutorials and libraries.  
	- Redux Toolkit (RTK) Query is used for state management as well as for CRUD operations on the API. 
	- I decided to use RTK Query over something like axios and base redux so that I could familiarize myself with a more modern library and redux features (slices, stores, etc.), minimize boilerplate code, and use some of the advanced features of RTK Query (caching, multiple "dispatches")
 - __Node.js and Express.js__
	 - I  went with Node.js and Express.js instead of Python for the backend so that I could learn the framework and keep everything in JavaScript.
	 - Node.js is also very fast
 - __MongoDB__
	 - I used MongoDB as an introduction to non-relational databases.
	 - MongoDB was also easy to setup and use, and I liked the JSON-style document form for the models.
	 - Also, it is the 'M' in MERN


Issue Tracker is currently a work in progress, and new features are continuously being worked on.

The site is deployed [here](https://issue-tracker-app-54p7.onrender.com/).

### Current features:
- Create/update/delete new projects
- Create/update/delete new tickets for each project
- View tickets related to a certain project
- View all tickets (regardless of project)
- Sign up/log in via email (JWT) to view your own tickets anywhere
- Only access your own projects and tickets, no one else's
- Responsive, material UI


### Works-in-progress:
- ~~Implement sign-in so users can have unique tickets~~
- ~~Add projects functionality so tickets can be better organized~~
- Admin/regular users
- Add ability for users working on the same project to add comments under tickets
