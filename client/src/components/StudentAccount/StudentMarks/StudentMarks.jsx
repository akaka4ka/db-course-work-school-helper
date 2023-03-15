import styled from "styled-components";
import EditableListPage from "../../EditableList/EditableListPage";
import { studentMarksConfig } from "../../EditableList/ListConfig/Student/StudentMarksConfig";

const CoursesWrapper = styled.div``;

const CoursesName = styled.h1`
    color: black;
    font-weight: bold;
    font-size: 1.5em;
    margin-left: 20px;
`;

const StudentMarks = () => {
    return (
        <CoursesWrapper>
            <CoursesName>Оценки</CoursesName>
            <EditableListPage config={studentMarksConfig}/>
        </CoursesWrapper>
    );
};

export default StudentMarks;
