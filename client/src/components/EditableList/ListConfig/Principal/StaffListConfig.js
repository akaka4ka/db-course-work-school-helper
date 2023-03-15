import React from "react";
import styled from "styled-components";
import { getHTeachers, getTeachers } from "../../../../http/principalAPI";
import ModalAddHTeacher from "../../Modal/Principal/ModalAddHTeacher";
import ModalAddTeacher from "../../Modal/Principal/ModalAddTeacher";
import ModalEditTeacher from "../../Modal/Principal/ModalEditTeacher";

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

const ActiveElement = styled.div`
    :hover {
        cursor: pointer;
    }
`;

export const staffListConfig = {
    asyncGetItems: async () => ({
        teachers: await getTeachers(),
        hTeachers: (await getHTeachers()) || [],
    }),
    editableListTHead: [
        "Имя",
        "Дата рождения",
        "Предметы",
        "Факультативы",
        "Действие",
    ],
    editableListHTHead: ["Имя", "Дата рождения", "Действие"],

    getListTRow: (person) => {
        return {
            heading: {
                mainText: `${person.name || "неизвестно"}`,
                secondaryText: person.surname,
            },
            tableItems: [
                dateToNormalDateString(person.birthdayDate),
                <ActiveElement>
                    {person.disciplines || "Не ведёт"}
                </ActiveElement>,
                <ActiveElement>{person.courses || "Не ведёт"}</ActiveElement>,
            ],
            actionName: "Редактировать",
        };
    },
    getListHTRow: (person) => {
        return {
            heading: {
                mainText: `${person.name || "неизвестно"}`,
                secondaryText: person.surname,
            },
            tableItems: [dateToNormalDateString(person.birthdayDate)],
            actionName: "Редактировать",
        };
    },
    searchConfig: {
        searchBy: (person, searchInput) => {
            return (
                leftStringIncludesRight(person.name, searchInput) ||
                leftStringIncludesRight(person.surname, searchInput)
            );
        },
        searchTPlaceholder: "Поиск сотрудника",
        searchHTPlaceholder: "Поиск сотрудника",
    },
    modalT: {
        modalName: "Нанять учителя",
        modalContent: (modalItem, handleClose, update) => (
            <ModalAddTeacher handleClose={handleClose} />
        ),
    },
    modalHT: {
        modalName: "Нанять завуча",
        modalContent: (modalItem, handleClose, update) => (
            <ModalAddHTeacher handleClose={handleClose} />
        ),
    },
    elementTModal: {
        modalName: "Редактировать учителя",
        modalContent: (modalItem, handleClose, update) => (
            <ModalEditTeacher modalItem={modalItem} handleClose={handleClose} />
        ),
    },
    elementHTModal: {
        modalName: "Редактировать завуча",
        modalContent: (modalItem, handleClose, update) => "",
    },
    actionDropDown: {
        name: "avCourses",
        enabled: false,
        visible: false,
        actions: [],
    },
};

export default staffListConfig;
