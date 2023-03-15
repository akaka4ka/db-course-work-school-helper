import { UserStore } from "../../../../classes/UserStore";
import { getMates } from "../../../../http/studentAPI";

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
    return (
        date.toLocaleDateString("ru", dateConvertOptions)
    );
};

export const matesListConfig = {
    asyncGetItems: () => getMates(UserStore.personId, UserStore.grade.id),
    editableListHead: ["Имя", "Дата рождения"],

    getListRow: (student) => {
        return {
            heading: {
                mainText: `${student.name || "неизвестно"}`,
                secondaryText: student.surname,
            },
            tableItems: [dateToNormalDateString(student.birthdayDate)],
        };
    },
    searchConfig: {
        searchBy: (student, searchInput) => {
            return (
                leftStringIncludesRight(student.name, searchInput) ||
                leftStringIncludesRight(student.surname, searchInput)
            );
        },
        searchPlaceholder: "Поиск одноклассника",
    },
    actionDropDown: {
        name: "marksWithDates",
        enabled: false,
        visible: false,
        actions: [],
    },
};

export default matesListConfig;
