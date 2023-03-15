import { getStudentCourses } from "../../../../http/studentAPI";
import ModalCoursesLeave from "../../Modal/ModalCorsesLeave";

const leftStringIncludesRight = (left, right) => {
    return String(left)
        .toLocaleLowerCase()
        .includes(String(right).toLocaleLowerCase());
};

export const studentsOwnCoursesConfig = {
    asyncGetItems: getStudentCourses,
    editableListHead: ["Название курса", "Учитель", "Действие"],

    getListRow: (course) => {
        return {
            heading: {
                mainText: `${course.name || "неизвестно"}`,
                secondaryText: course.id,
            },
            tableItems: [`${course.teacherName} ${course.teacherSurname}`],
            actionName: "Покинуть",
        };
    },
    searchConfig: {
        searchBy: (course, searchInput) => {
            return (
                leftStringIncludesRight(course.name, searchInput) ||
                leftStringIncludesRight(course.teacheName, searchInput) ||
                leftStringIncludesRight(course.teacherSurname, searchInput)
            );
        },
        searchPlaceholder: "Поиск курса",
    },
    modal: {
        modalName: "Покинуть курс",
        modalContent: (item, handleClose, update) => (
            <ModalCoursesLeave course={item} handleClose={handleClose} update={update} />
        ),
    },
    actionDropDown: {
        name: "ownCourses",
        enabled: false,
        visible: false,
        actions: [],
    }
};
