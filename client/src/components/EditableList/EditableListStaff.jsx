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

export const EditableListStaffContext = React.createContext();

const pageRatio = 5;

const EditableListStaff = ({ config, shouldUpdate }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isElModalOpen, setIsElModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [listTeachers, setListTeachers] = useState(null);
    const [listHTeachers, setListHTeachers] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [modalItem, setModalItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCat, setCurrentCat] = useState("teacher");

    const updateComponent = () => {
        setIsLoading(true);
        config
            .asyncGetItems()
            .then((response) => {
                setListTeachers(response.teachers);
                setListHTeachers(response.hTeachers);
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
                setListTeachers(response.teachers);
                setListHTeachers(response.hTeachers);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [shouldUpdate]);

    useEffect(() => {
        config
            .asyncGetItems()
            .then((response) => {
                setListTeachers(response.teachers);
                setListHTeachers(response.hTeachers);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <LoaderComponent />;
    }

    if (!listTeachers) {
        return <div>Ошибка загрузки данных</div>;
    }

    return (
        <EditableListStaffContext.Provider
            value={{
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
                        {currentCat === "teacher"
                            ? "Нанять учителя"
                            : "Нанять завуча"}
                    </Fab>

                    {listTeachers.filter((item) =>
                        config.searchConfig.searchBy(item, searchInput)
                    ).length > pageRatio && (
                        <Pagination
                            count={Math.ceil(
                                (currentCat === "teacher"
                                    ? listTeachers
                                    : listHTeachers
                                ).filter((item) =>
                                    config.searchConfig.searchBy(
                                        item,
                                        searchInput
                                    )
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
                                <InputLabel>Должность</InputLabel>
                                <Select
                                    sx={{
                                        marginRight: "50px",
                                        minWidth: "100px",
                                    }}
                                    value={currentCat}
                                    onChange={(e) => {
                                        setCurrentCat(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    autoWidth
                                >
                                    <MenuItem value={"teacher"}>
                                        Учителя
                                    </MenuItem>
                                    <MenuItem value={"headteacher"}>
                                        Завучи
                                    </MenuItem>
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
                            editableListHead={
                                currentCat === "teacher"
                                    ? config.editableListTHead
                                    : config.editableListHTHead
                            }
                        />
                    </thead>
                    <tbody>
                        {currentCat === "teacher"
                            ? (config.sort !== undefined
                                  ? listTeachers.sort(config.sort)
                                  : listTeachers
                              )
                                  .filter((item) =>
                                      config.searchConfig.searchBy(
                                          item,
                                          searchInput
                                      )
                                  )
                                  .map((item, index) => (
                                      <EditableListItem
                                          key={index}
                                          setModalOpen={setIsElModalOpen}
                                          setModalItem={() =>
                                              setModalItem(item)
                                          }
                                          listRow={config.getListTRow(item)}
                                      />
                                  ))
                                  .slice(
                                      (currentPage - 1) * pageRatio,
                                      (currentPage - 1) * pageRatio + pageRatio
                                  )
                            : (config.sort !== undefined
                                  ? listHTeachers.sort(config.sort)
                                  : listHTeachers
                              )
                                  .filter((item) =>
                                      config.searchConfig.searchBy(
                                          item,
                                          searchInput
                                      )
                                  )
                                  .map((item, index) => (
                                      <EditableListItem
                                          key={index}
                                          setModalOpen={setIsElModalOpen}
                                          setModalItem={() =>
                                              setModalItem(item)
                                          }
                                          listRow={config.getListHTRow(item)}
                                      />
                                  ))
                                  .slice(
                                      (currentPage - 1) * pageRatio,
                                      (currentPage - 1) * pageRatio + pageRatio
                                  )}
                    </tbody>
                </table>
            </div>
            {isModalOpen &&
                (currentCat === "teacher" ? (
                    <ModalWindow
                        isModalOpen={isModalOpen}
                        setModalOpen={setModalOpen}
                        modalConfig={config.modalT}
                        modalItem={modalItem}
                        update={updateComponent}
                    />
                ) : (
                    <ModalWindow
                        isModalOpen={isModalOpen}
                        setModalOpen={setModalOpen}
                        modalConfig={config.modalHT}
                        modalItem={modalItem}
                        update={updateComponent}
                    />
                ))}
            {isElModalOpen &&
                (currentCat === "teacher" ? (
                    <ModalWindow
                        isModalOpen={isElModalOpen}
                        setModalOpen={setIsElModalOpen}
                        modalConfig={config.elementTModal}
                        modalItem={modalItem}
                        update={updateComponent}
                    />
                ) : (
                    <ModalWindow
                        isModalOpen={isElModalOpen}
                        setModalOpen={setIsElModalOpen}
                        modalConfig={config.elementHTModal}
                        modalItem={modalItem}
                        update={updateComponent}
                    />
                ))}
        </EditableListStaffContext.Provider>
    );
};

export default EditableListStaff;
