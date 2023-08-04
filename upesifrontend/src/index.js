import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PublicClientApplication, EventType } from "@azure/msal-browser";

const pca = new PublicClientApplication({
  auth: {
    clientId: "c3128731-1b69-4483-8eaa-253346b9740e",
    authority:
      "https://login.microsoftonline.com/9f60f382-c274-4665-9e26-82e9a29b53b2",
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    clientCapabilities: ["CP1"],
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false, // sso btwn tabs
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPII) => {
        console.log(message);
      },
      logLevel: "Verbose",
    },
  },
});

pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    console.log(event);
    pca.setActiveAccount(event.payload.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App msalInstance={pca} />
  </React.StrictMode>
);

reportWebVitals();
