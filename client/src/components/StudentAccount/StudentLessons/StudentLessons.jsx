import styled from "styled-components";
import EditableListDate from "../../EditableList/EditableListDate";
import { StudentLessonsConfig } from "../../EditableList/ListConfig/Student/StudentLessonsConfig";

const CoursesWrapper = styled.div``;

const CoursesName = styled.h1`
    color: black;
    font-weight: bold;
    font-size: 1.5em;
    margin-left: 20px;
`;

const StudentLesson = () => {
    return (
        <CoursesWrapper>
            <CoursesName>Расписание</CoursesName>
            <EditableListDate config={StudentLessonsConfig}/>
        </CoursesWrapper>
    );
};

export default StudentLesson;
