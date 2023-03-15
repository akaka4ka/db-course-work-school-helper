import { getAllStudents } from "../../../../http/principalAPI";
import ModalAddStudent from "../../Modal/Principal/ModalAddStudent";
import ModalDelStudent from "../../Modal/Principal/ModalDelStudent";

const leftStringIncludesRight = (left, right) => {
    return String(left)
        .toLocaleLowerCase()
        .includes(String(right).toLocaleLowerCase());
};

const dateConvertOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

const dateToNormalDateString = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru", dateConvertOptions);
};

export const studentsListConfig = {
    asyncGetItems: getAllStudents,
    editableListHead: ["Имя", "Класс", "Дата рождения", "Средний балл", "Действие"],

    getListRow: (student) => {
        return {
            heading: {
                mainText: `${student.name || "неизвестно"}`,
                secondaryText: student.surname,
            },
            tableItems: [
                `${student.grade.number}${student.grade.letter}`,
                dateToNormalDateString(student.birthdayDate),
                +(+student.averageMark).toFixed(2) || "Нет оценок",
            ],
            actionName: "Редактировать",
        };
    },
    searchConfig: {
        searchBy: (student, searchInput) => {
            return (
                leftStringIncludesRight(student.name, searchInput) ||
                leftStringIncludesRight(student.surname, searchInput) ||
                leftStringIncludesRight(
                    `${student.grade.number}${student.grade.letter}`,
                    searchInput
                )
            );
        },
        searchPlaceholder: "Поиск ученика",
    },
    modal: {
        modalName: "Зачислить ученика",
        modalContent: (modalItem, handleClose, update) => (
            <ModalAddStudent handleClose={handleClose} />
        ),
    },
    elementModal: {
        modalName: "Редактировать ученика",
        modalContent: (modalItem, handleClose, update) => (
            <ModalDelStudent handleClose={handleClose} />
        ),
    },
    actionDropDown: {
        name: "avCourses",
        enabled: false,
        visible: false,
        actions: [],
    },
};

export default studentsListConfig;
