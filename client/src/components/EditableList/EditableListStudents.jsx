import React, { useEffect, useState, useRef } from "react";
import ActionDropDown from "./ActionDropDown";
import ModalWindow from "./Modal/ModalWindow";
import SearchInput from "./SearchInput";
import EditableListHead from "./EditableListHead";
import EditableListItem from "./EditableListItem";
import { LoaderComponent } from "react-fullscreen-loader";
import Pagination from "@mui/material/Pagination";
import {
    CircularProgress,
    Fab,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const EditableListStudentsContext = React.createContext();

const pageRatio = 5;

const EditableListStudents = ({ config, shouldUpdate }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isElModalOpen, setIsElModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [listItems, setListItems] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [modalItem, setModalItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentGrade, setCurrentGrade] = useState("dura");

    /**
     * @type {{
     *  current: object[]
     * }}
     */
    const grades = useRef(null);

    const updateComponent = () => {
        setIsLoading(true);
        config
            .asyncGetItems()
            .then((response) => {
                setListItems(response.data.courses);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        config
            .asyncGetItems()
            .then((response) => {
                setListItems(response.data.courses);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [shouldUpdate]);

    useEffect(() => {
        if (listItems && listItems.length > 0) {
            let gradesMap = new Map();
            listItems.forEach((item) => {
                if (!gradesMap.has(item.grade.id)) {
                    gradesMap.set(
                        item.grade.id,
                        `${item.grade.number}${item.grade.letter}`
                    );
                }
            });

            grades.current = Array.from(gradesMap, ([id, value]) => ({
                id,
                value,
            }));
        }
    }, [listItems]);

    useEffect(() => {
        config
            .asyncGetItems()
            .then((response) => {
                setListItems(response.data.courses);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <LoaderComponent />;
    }

    if (!listItems) {
        return <div>Ошибка загрузки данных</div>;
    }

    return (
        <EditableListStudentsContext.Provider
            value={{
                gradesList: grades.current,
                modalItem: modalItem,
                updateComponent: updateComponent,
            }}
        >
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <div className="flex justify-between items-center py-4 bg-white">
                    {/* <ActionDropDown config={config.actionDropDown} /> */}
                    <Fab
                        onClick={(e) => setModalOpen(true)}
                        sx={{ marginLeft: "20px" }}
                        variant="extended"
                        color="primary"
                        aria-label="add"
                    >
                        <AddIcon />
                        Добавить ученика
                    </Fab>

                    {listItems.filter((item) =>
                        config.searchConfig.searchBy(item, searchInput)
                    ).length > pageRatio && (
                        <Pagination
                            count={Math.ceil(
                                listItems
                                    .filter((item) =>
                                        config.searchConfig.searchBy(
                                            item,
                                            searchInput
                                        )
                                    )
                                    .filter(
                                        (item) =>
                                            currentGrade === "dura" ||
                                            item.grade.id === currentGrade
                                    ).length / pageRatio
                            )}
                            page={currentPage}
                            onChange={(e, val) => setCurrentPage(val)}
                            color="primary"
                        />
                    )}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <FormControl>
                                {/* <span style={{ fontWeight: "bold" }}>
                                    Класс:{" "}
                                </span> */}
                                <InputLabel id={"dura-staff-label"}>
                                    Класс
                                </InputLabel>
                                <Select
                                    labelId={"dura-staff-label"}
                                    id={"dura-staff"}
                                    sx={{ marginRight: "50px" }}
                                    value={currentGrade}
                                    onChange={(e) => {
                                        setCurrentGrade(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    autoWidth
                                >
                                    <MenuItem value={"dura"}>Все</MenuItem>
                                    {grades?.current?.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        <SearchInput
                            searchConfig={config.searchConfig}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <EditableListHead
                            editableListHead={config.editableListHead}
                        />
                    </thead>
                    <tbody>
                        {(config.sort !== undefined
                            ? listItems.sort(config.sort)
                            : listItems
                        )
                            .filter((item) =>
                                config.searchConfig.searchBy(item, searchInput)
                            )
                            .filter(
                                (item) =>
                                    currentGrade === "dura" ||
                                    item.grade.id === currentGrade
                            )
                            .map((item, index) => (
                                <EditableListItem
                                    key={index}
                                    setModalOpen={setIsElModalOpen}
                                    setModalItem={() => setModalItem(item)}
                                    listRow={config.getListRow(item)}
                                />
                            ))
                            .slice(
                                (currentPage - 1) * pageRatio,
                                (currentPage - 1) * pageRatio + pageRatio
                            )}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <ModalWindow
                    isModalOpen={isModalOpen}
                    setModalOpen={setModalOpen}
                    modalConfig={config.modal}
                    modalItem={modalItem}
                    update={updateComponent}
                />
            )}
            {isElModalOpen && (
                <ModalWindow
                    isModalOpen={isElModalOpen}
                    setModalOpen={setIsElModalOpen}
                    modalConfig={config.elementModal}
                    modalItem={modalItem}
                    update={updateComponent}
                />
            )}
        </EditableListStudentsContext.Provider>
    );
};

export default EditableListStudents;
