import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { UserStore } from "../../classes/UserStore";
import Navbar from "../../components/Navbar/Navbar";
import PublicationItem from "../../components/Publications/PublicationItem";
import PublicationList from "../../components/Publications/PublicationList";
import { getPubications } from "../../http/userAPI";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #e6e6e6;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Home = () => {
    const [publication, setPublication] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPubications().then((r) => {
            setPublication(r);
            setIsLoading(false);
        });
    }, []);
    return (
        <Container>
            <Navbar />
            {isLoading ? (
                <Wrapper>
                    <CircularProgress />
                </Wrapper>
            ) : (
                <PublicationList publications={publication} />
            )}
        </Container>
    );
};

export default Home;
