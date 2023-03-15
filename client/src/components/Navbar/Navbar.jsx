import { AccountCircle } from "@mui/icons-material";
import {
    AppBar,
    List,
    ListItemButton,
    Toolbar,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AuthController from "../../classes/authorization/AuthController";
import { UserStore } from "../../classes/UserStore";
import LogoSvg from "../Logo/LogoSvg";

const Logo = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContextWrapper = styled.div`
    background-color: white;
    color: black;
    border-radius: 8px 0px 8px 8px;
    position: absolute;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    width: fit-content;
    height: fit-content;
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const Navbar = () => {
    const navigate = useNavigate();
    const [contextMenu, setContextMenu] = useState({
        isOpened: false,
        position: {
            top: 0,
            left: 0,
        },
        items: [
            {
                name: "Выйти",
                callback: () => {
                    AuthController.logOut();
                    window.location.reload();
                },
            },
        ],
    });
    const contextRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', closeContextGlobal);

        return () => {
            document.removeEventListener('click', closeContextGlobal);
        }
    }, []);

    const closeContextGlobal = (e) => {
        if (e.button === 0) {
            closeContext(e);
        }
    }

    const handleAccButtonClick = () => {
        if (AuthController.userRole === "Ученик") {
            navigate("/account/student");
        }

        if (AuthController.userRole === "Директор") {
            navigate("/account/principal");
        }
    };

    const toggleContext = (e) => {
        if (contextMenu.isOpened) {
            closeContext(e);
        } else {
            openContext(e);
        }
    };

    const openContext = (e) => {
        e.preventDefault();
        setContextMenu({
            ...contextMenu,
            isOpened: true,
            position: {
                top: e.pageY,
                left:
                    e.pageX - contextRef.current.getBoundingClientRect().width,
            },
        });
    };

    const closeContext = (e) => {
        e.preventDefault();
        setContextMenu({
            ...contextMenu,
            isOpened: false,
        });
    };

    return (
        <Box sx={{ flexGrow: 1, position: "sticky" }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={"/"}>
                        <Logo>
                            <div
                                style={{
                                    width: "fit-content",
                                    height: "fit-content",
                                    marginBottom: "20px",
                                }}
                            >
                                <LogoSvg />
                            </div>

                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: "none", sm: "block" } }}
                                style={{ userSelect: "none" }}
                            >
                                <span>School Helper</span>
                            </Typography>
                        </Logo>
                    </Link>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: { xs: "none", sm: "block" },
                                userSelect: "none",
                                alignSelf: "center",
                            }}
                        >
                            <span>
                                {UserStore.firstName +
                                    " " +
                                    UserStore.secondName}
                            </span>
                        </Typography>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleAccButtonClick}
                            onContextMenu={toggleContext}
                        >
                            <AccountCircle />
                        </IconButton>
                        <ContextWrapper
                            ref={contextRef}
                            visible={contextMenu.isOpened}
                            top={contextMenu.position.top}
                            left={contextMenu.position.left}
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            <List disablePadding>
                                {contextMenu.items.map((item) => (
                                    <ListItemButton
                                        key={item.name}
                                        onClick={item.callback}
                                    >
                                        {item.name}
                                    </ListItemButton>
                                ))}
                            </List>
                        </ContextWrapper>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
// navRef.current.offsetHeight
