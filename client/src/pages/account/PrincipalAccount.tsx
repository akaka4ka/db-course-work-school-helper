import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthController from "../../classes/authorization/AuthController";
import Navbar from "../../components/Navbar/Navbar";
import { StaffList } from "../../components/PrincipalAccount/StaffList/StaffList";
import { StudentsList } from "../../components/PrincipalAccount/StudentsList/StudentsList";
import UpperSideBar from "../../components/UpperSideBar/UpperSideBar";

const upperSideBarItems = ["Персонал", "Ученики", "Расписание", "Учебные дисциплины"];

const Container = styled.div`
    left: 0;
    margin: 0;
    margin-top: 20px;
    padding: 0;
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: center;
`;

const FullItemWrapper = styled.div`
    width: 80%;
`;

const PrincipalAccount = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState<string>("Обо мне");

    const selectTab = (name: string) => {
        if (selectedTab !== name) {
            setSelectedTab(name);
        }
    };

    useEffect(() => {
        if (AuthController.userRole !== "Директор") {
            navigate("/");
        }
    }, []);

    return (
        <>
            <Navbar />
            <UpperSideBar
                items={upperSideBarItems}
                selectedName={selectedTab}
                selectionCallback={selectTab}
            />
            <Container>
                <FullItemWrapper>
                    {selectedTab === "Персонал" && <StaffList />}
                    {selectedTab === "Ученики" && <StudentsList />}
                    {selectedTab === "Расписание" && <span>Расписание</span>}
                    {selectedTab === "Учебные дисциплины" && <span>Учебные дисциплины</span>}
                </FullItemWrapper>
            </Container>
        </>
    );
};

export default PrincipalAccount;
