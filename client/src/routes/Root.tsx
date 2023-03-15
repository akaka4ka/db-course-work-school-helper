import { useEffect, useState } from "react";
import { LoaderComponent } from "react-fullscreen-loader";
import { Navigate } from "react-router-dom";
import "react-fullscreen-loader/src/loader.css";

import AuthController from "../classes/authorization/AuthController";
import Home from "../pages/home/Home";

export const Root = () => {
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        document.title = "Home | SchoolHelper";
        AuthController.authWithStoredJWT()
            .then((r) => setTimeout(() => setIsAuthChecked(true), 500))
            .catch((r) => setTimeout(() => setIsAuthChecked(true), 500));
    }, []);

    return (
        <>
            {isAuthChecked ? (
                !AuthController.isAuthorized ? (
                    <Navigate to={"/auth"} replace />
                ) : (
                    <Home />
                )
            ) : (
                <LoaderComponent loading loadingColor="#1976D2" />
            )}
        </>
    );
};
