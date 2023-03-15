import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "../../../../hooks/useForm";
import DuraDatePicker from "../../../DatePicker/DatePicker";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { addHTeacher, addTeacher, getAllDisciplines } from "../../../../http/principalAPI";

import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { EditableListStaffContext } from "../../EditableListStaff";

const InputsWrapper = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
`;

const InputsCol = styled.div`
    display: flex;
    flex-direction: column;
`;

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ModalAddTeacher = ({ handleClose }) => {
    const theme = useTheme();

    const { modalItem, gradesList, updateComponent } = React.useContext(
        EditableListStaffContext
    );

    const form = useForm(["name", "surname"]);
    const [birthday, setBirthday] = useState("");
    const [disciplines, setDisciplines] = useState([]);
    const [chosenDisc, setChosenDisc] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [gotResponse, setGotResponse] = useState(false);

    const token = useRef("");

    const handleChange = (e) => {
        const {
            target: { value },
        } = e;

        setChosenDisc(typeof value === "string" ? value.split(",") : value);
    };

    const handleClick = async () => {
        const formEl = document.getElementById("dura");
        if (!formEl.checkValidity()) {
            const tmpSubmit = document.createElement("button");
            formEl.appendChild(tmpSubmit);
            tmpSubmit.click();
            formEl.removeChild(tmpSubmit);
        } else {
            addTeacher(
                form.name.value,
                form.surname.value,
                `${birthday.$y}-${birthday.$M + 1}-${birthday.$D}`,
                chosenDisc
            ).then((r) => {
                setGotResponse(true);
                setIsLoading(false);
                token.current = r;
            });
        }
    };

    useEffect(() => {
        getAllDisciplines().then((r) => {
            setDisciplines(r);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {isLoading ? (
                <div
                    style={{
                        minHeight: "200px",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </div>
            ) : gotResponse ? (
                <div
                    style={{
                        width: "100%",
                        height: "fit-content",
                        padding: "20px0",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1.1em",
                    }}
                >
                    <Alert severity="success" sx={{ width: "100%" }}>
                        Завуч успешно добавлен! Токен для регистрации:
                        {token.current}
                    </Alert>
                </div>
            ) : (
                <div>
                    <InputsWrapper>
                        <InputsCol>
                            <TextField
                                label={"Имя"}
                                variant={"filled"}
                                required
                                value={form.name.value || ""}
                                onChange={(e) => form.name.set(e.target.value)}
                                sx={{ marginBottom: "20px" }}
                            />
                            <TextField
                                label={"Фамилия"}
                                variant={"filled"}
                                required
                                value={form.surname.value || ""}
                                onChange={(e) =>
                                    form.surname.set(e.target.value)
                                }
                            />
                        </InputsCol>
                        <InputsCol>
                            <DuraDatePicker
                                placeholder={"Дата рождения"}
                                value={birthday}
                                setValue={setBirthday}
                                style={{ marginBottom: "20px" }}
                            />
                            <FormControl>
                                <InputLabel id="demo-multiple-chip-label">
                                    Предметы
                                </InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={chosenDisc}
                                    onChange={handleChange}
                                    input={
                                        <OutlinedInput
                                            id="select-multiple-chip"
                                            label="Chip"
                                        />
                                    }
                                    renderValue={(selected) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                            }}
                                        >
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={
                                                        disciplines.find(
                                                            (item) =>
                                                                item.id ===
                                                                value
                                                        ).name
                                                    }
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {disciplines.map((item) => (
                                        <MenuItem
                                            key={item.id}
                                            value={item.id}
                                            style={getStyles(
                                                item.id,
                                                chosenDisc,
                                                theme
                                            )}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </InputsCol>
                    </InputsWrapper>

                    {/* <!-- Modal footer --> */}
                    <div
                        className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200"
                        style={{ justifyContent: "space-between" }}
                    >
                        {/* <!-- Buttons from config --> */}

                        <button
                            type="submit"
                            onClick={handleClick}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Нанять
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalAddTeacher;
