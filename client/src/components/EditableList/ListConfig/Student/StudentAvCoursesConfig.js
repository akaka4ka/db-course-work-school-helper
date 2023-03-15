import { UserStore } from "../../../../classes/UserStore";
import { getAvailableCourses } from "../../../../http/studentAPI";
import ModalCoursesJoin from "../../Modal/ModalCoursesJoin";

const leftStringIncludesRight = (left, right) => {
    return String(left)
        .toLocaleLowerCase()
        .includes(String(right).toLocaleLowerCase());
};

export const studentAvCoursesConfig = {
    asyncGetItems: () => getAvailableCourses(UserStore.personId),
    editableListHead: ["Название курса", "Учитель", "Действие"],

    getListRow: (course) => {
        return {
            heading: {
                mainText: `${course.name || "неизвестно"}`,
                secondaryText: course.id,
            },
            tableItems: [`${course.teacherName} ${course.teacherSurname}`],
            actionName: "Записаться",
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
        modalName: "Запись на курс",
        modalContent: (item, handleClose, update) => (
            <ModalCoursesJoin
                course={item}
                handleClose={handleClose}
                update={update}
            />
        ),
    },
    actionDropDown: {
        name: "avCourses",
        enabled: false,
        visible: false,
        actions: [],
    }
};
