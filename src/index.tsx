import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Octokit } from "octokit";
import Contributor from "./components/Contributor";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const octokit = new Octokit({
  auth: process.env.REACT_APP_GH_KEY,
});

export const ApiContext = React.createContext(octokit);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApiContext.Provider value={octokit}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="contributor/:contributorLogin"
              element={<Contributor />}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ApiContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
