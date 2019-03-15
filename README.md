# Chatty App

A responsive, React chat application that communicates with clients via Web sockets. Built with React, Node.js, Express,Websockets and HTML/CSS/SASS.

## Screen shots

![alt text](/public/images/chatty.png 'Chatty - Interactive Chat')

## Installing

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

#### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

#### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

#### Dependencies

- React
- Webpack
- [babel-loader](https://github.com/babel/babel-loader)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- Babel
- Saas

## Built with

- [React - JSX](https://reactjs.org/docs/jsx-in-depth.html) - React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
  Fundamentally, JSX just provides syntactic sugar for the React.createElement(component, props, ...children) function
- [Node.js](https://nodejs.org/en/about/) - As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.
