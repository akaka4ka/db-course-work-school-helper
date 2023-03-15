import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormGroup,
    FormHelperText,
    Input,
    InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AuthType } from "../../../types/AuthType";
import AuthController from "../../../classes/authorization/AuthController";
import { useForm } from "../../../hooks/useForm";

const AuthFormWrapper = ({ children }: { children: any }) => {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0",
                padding: "0",
                backgroundColor: "#E6E6E6",
            }}
        >
            <Box
                sx={{
                    width: "40%",
                    height: "fit-content",
                    margin: "0",
                    padding: "50px",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                    backgroundColor: "white",
                    boxShadow: "0px 0px 8px 1px black",
                    borderRadius: "20px",
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

const RegisterForm = ({ toggleAuthType }: { toggleAuthType: Function }) => {
    const navigate = useNavigate();

    const form = useForm(["username", "password", "token"]);

    const register = () => {
        AuthController.registration(
            form.username.value,
            form.password.value,
            form.token.value
        ).then((r) => navigate("/"));
    };

    return (
        <AuthFormWrapper>
            <FormGroup
                sx={{
                    width: "100%",
                    height: "fit-content",
                    margin: "0",
                    padding: "0",
                }}
            >
                <FormControl sx={{ marginBottom: "25px" }}>
                    <InputLabel sx={{ userSelect: "none" }}>
                        Username
                        <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Input
                        aria-describedby="username-ht"
                        onChange={(e) => form.username.set(e.target.value)}
                        value={form.username.value || ""}
                    />
                    <FormHelperText
                        id="username-ht"
                        sx={{ userSelect: "none" }}
                    >
                        Username must be unique, and can't be empty.
                    </FormHelperText>
                </FormControl>
                <FormControl sx={{ marginBottom: "25px" }}>
                    <InputLabel sx={{ userSelect: "none" }}>
                        Password
                        <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Input
                        type={"password"}
                        aria-describedby="password-ht"
                        onChange={(e) => form.password.set(e.target.value)}
                        value={form.password.value || ""}
                    />
                    <FormHelperText
                        id="password-ht"
                        sx={{ userSelect: "none" }}
                    >
                        Password must be at least 8 characters and not more 16
                        characters long.
                    </FormHelperText>
                </FormControl>
                <FormControl sx={{ marginBottom: "35px" }}>
                    <InputLabel sx={{ userSelect: "none" }}>
                        Registration Token
                        <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Input
                        aria-describedby="reg-token-ht"
                        onChange={(e) => form.token.set(e.target.value)}
                        value={form.token.value || ""}
                    />
                    <FormHelperText
                        id="reg-token-ht"
                        sx={{ userSelect: "none" }}
                    >
                        Enter registration token that you received in your
                        school.
                    </FormHelperText>
                </FormControl>
            </FormGroup>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0",
                    marginBottom: "35px",
                    padding: "0",
                }}
            >
                <Button variant="contained" onClick={register}>
                    Register
                </Button>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <Button
                    variant="text"
                    disabled
                    style={{ color: "black", marginRight: "15px" }}
                >
                    Already registered?
                </Button>
                <Button variant="contained" onClick={(e) => toggleAuthType()}>
                    Log in
                </Button>
            </Box>
        </AuthFormWrapper>
    );
};

const LoginForm = ({ toggleAuthType }: { toggleAuthType: Function }) => {
    const navigate = useNavigate();

    const form = useForm(["username", "password"]);

    const login = () => {
        AuthController.login(form.username.value, form.password.value).then(
            (r) => navigate("/")
        );
    };

    return (
        <AuthFormWrapper>
            <FormGroup>
                <FormControl sx={{ marginBottom: "25px" }}>
                    <InputLabel sx={{ userSelect: "none" }}>
                        Username
                        <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Input
                        aria-describedby="username-ht"
                        onChange={(e) => form.username.set(e.target.value)}
                        value={form.username.value || ""}
                    />
                    <FormHelperText
                        id="username-ht"
                        sx={{ userSelect: "none" }}
                    >
                        Username must be unique, and can't be empty.
                    </FormHelperText>
                </FormControl>
                <FormControl sx={{ marginBottom: "25px" }}>
                    <InputLabel sx={{ userSelect: "none" }}>
                        Password
                        <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Input
                        type={"password"}
                        aria-describedby="password-ht"
                        onChange={(e) => form.password.set(e.target.value)}
                        value={form.password.value || ""}
                    />
                    <FormHelperText
                        id="password-ht"
                        sx={{ userSelect: "none" }}
                    >
                        Password must be at least 8 characters and not more 16
                        characters long.
                    </FormHelperText>
                </FormControl>
            </FormGroup>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0",
                    marginBottom: "35px",
                    padding: "0",
                }}
            >
                <Button variant="contained" onClick={login}>
                    Log in
                </Button>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <Button
                    variant="text"
                    disabled
                    style={{ color: "black", marginRight: "15px" }}
                >
                    Don't have an account?
                </Button>
                <Button variant="contained" onClick={(e) => toggleAuthType()}>
                    Register
                </Button>
            </Box>
        </AuthFormWrapper>
    );
};

const initialAuthType: number = AuthType.Register;

const Auth = () => {
    const [authType, setAuthType] = useState(initialAuthType);

    const toggleAuthType = () => {
        if (authType === AuthType.Register) {
            setAuthType(AuthType.Login);
        } else {
            setAuthType(AuthType.Register);
        }
    };

    return authType === AuthType.Register ? (
        <RegisterForm toggleAuthType={toggleAuthType} />
    ) : (
        <LoginForm toggleAuthType={toggleAuthType} />
    );
};

export default Auth;
