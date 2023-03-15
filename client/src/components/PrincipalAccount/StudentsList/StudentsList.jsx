import styled from "styled-components";
import EditableListStudents from "../../EditableList/EditableListStudents";
import studentsListConfig from "../../EditableList/ListConfig/Principal/StudentsListConfig";

const StudentsWrapper = styled.div``;

const StudentsName = styled.h1`
    color: black;
    font-weight: bold;
    font-size: 1.5em;
    margin-left: 20px;
`;

export const StudentsList = () => {
    return (
        <StudentsWrapper>
            <StudentsName>Ученики</StudentsName>
            <EditableListStudents config={studentsListConfig}/>
        </StudentsWrapper>
    );
};
