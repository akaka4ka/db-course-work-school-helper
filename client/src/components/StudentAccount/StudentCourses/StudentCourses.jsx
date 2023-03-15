import { useState } from "react";
import styled from "styled-components";
import EditableListPage from "../../EditableList/EditableListPage";
import { studentAvCoursesConfig } from "../../EditableList/ListConfig/Student/StudentAvCoursesConfig";
import { studentsOwnCoursesConfig } from "../../EditableList/ListConfig/Student/StudentsOwnCoursesConfig";

const CoursesWrapper = styled.div``;

const CoursesName = styled.h1`
    color: black;
    font-weight: bold;
    font-size: 1.5em;
    margin-left: 20px;
`;

export let updater;

const StudentCourses = () => {
    const [shouldUpdate, setShouldUpdate] = useState(false);

    updater = () => setShouldUpdate(!shouldUpdate);

    return (
        <CoursesWrapper>
            <CoursesName>Мои курсы</CoursesName>
            <EditableListPage
                config={studentsOwnCoursesConfig}
                shouldUpdate={shouldUpdate}
            />
            <CoursesName>Доступные курсы</CoursesName>
            <EditableListPage
                config={studentAvCoursesConfig}
                shouldUpdate={shouldUpdate}
            />
        </CoursesWrapper>
    );
};

export default StudentCourses;
