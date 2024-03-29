import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import "./scss/styles.scss";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import * as atatus from "atatus-spa";
atatus.config("d3d5e374e86f4e70ab746db3f13f2578").install();

ReactDOM.render(
  <React.StrictMode>
    <Container fluid className="min-vh-100 text-bg-dark">
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
