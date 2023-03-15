import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Root } from "./routes/Root";
import Auth from "./routes/AuthFree/Auth/Auth";
import PrincipalAccount from "./pages/account/PrincipalAccount";
import StudentAccount from "./pages/account/StudentAccount";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/auth",
        element: <Auth />,
    },
    {
        path: "/account/principal",
        element: <PrincipalAccount />,
    },
    {
        path: "/account/student",
        element: <StudentAccount />,
    },
]);

root.render(
    <>
        <RouterProvider router={router} />
    </>
);
