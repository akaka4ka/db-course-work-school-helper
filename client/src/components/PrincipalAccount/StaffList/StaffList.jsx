import styled from "styled-components";
import EditableListStaff from "../../EditableList/EditableListStaff";
import staffListConfig from "../../EditableList/ListConfig/Principal/StaffListConfig";

const StudentsWrapper = styled.div``;

const StudentsName = styled.h1`
    color: black;
    font-weight: bold;
    font-size: 1.5em;
    margin-left: 20px;
`;

export const StaffList = () => {
    return (
        <StudentsWrapper>
            <StudentsName>Персонал</StudentsName>
            <EditableListStaff config={staffListConfig}/>
        </StudentsWrapper>
    );
};
