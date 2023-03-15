import {
    Box,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import { useContext, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import DuraDatePicker from "../../../DatePicker/DatePicker";
import { EditableListStudentsContext } from "../../EditableListStudents";
import {
    deleteStudent,
    getAllDisciplines,
    getTeacherDisciplines,
    updateStudent,
    updateTeacherDisc,
    updateTeacherInfo,
} from "../../../../http/principalAPI";
import { Theme, useTheme } from "@mui/material/styles";
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

const ModalEditTeacher = ({ handleClose }) => {
    const theme = useTheme();
    const { modalItem, gradesList, updateComponent } = useContext(
        EditableListStaffContext
    );

    const [name, setName] = useState(modalItem.name);
    const [surname, setSurname] = useState(modalItem.surname);
    const [birthday, setBirthday] = useState(modalItem.birthdayDate);
    const [disciplines, setDisciplines] = useState([]);
    const [chosenDisc, setChosenDisc] = useState([]);
    const [initDisc, setInitDisc] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [gotResponse, setGotResponse] = useState(false);

    const handleChange = (e) => {
        const {
            target: { value },
        } = e;

        setChosenDisc(typeof value === "string" ? value.split(",") : value);
    };

    const handleApply = async () => {
        const formEl = document.getElementById("dura");
        if (!formEl.checkValidity()) {
            const tmpSubmit = document.createElement("button");
            formEl.appendChild(tmpSubmit);
            tmpSubmit.click();
            formEl.removeChild(tmpSubmit);
        } else {
            const discChanged = initDisc
                .filter((x) => !chosenDisc.includes(x))
                .concat(chosenDisc.filter((x) => !initDisc.includes(x)));
            const isDiscChanged = discChanged.length > 0;

            const isSomethingChanged =
                name !== modalItem.name ||
                surname !== modalItem.surname ||
                birthday !== modalItem.birthdayDate;

            if (isSomethingChanged || isDiscChanged) {
                if (isDiscChanged) {
                    updateTeacherDisc(modalItem.id, discChanged).then((r) => {
                        updateComponent();
                        handleClose();
                    });
                }

                if (isSomethingChanged) {
                    updateTeacherInfo(
                        modalItem.id,
                        name,
                        surname,
                        birthday.substring(0, 10)
                    ).then(() => {
                        updateComponent();
                        handleClose();
                    });
                }
            }
        }
    };

    useEffect(() => {
        getAllDisciplines().then((r) => {
            setDisciplines(r);
            setIsLoading(false);
        });
        getTeacherDisciplines(modalItem.id).then((r) => {
            setChosenDisc(r);
            setInitDisc(r);
        });
    }, []);

    const handleDel = () => {
        

        handleClose();
    };

    return (
        <>
            {isLoading ? (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <InputsWrapper>
                        <InputsCol>
                            <TextField
                                label={"Имя"}
                                variant={"filled"}
                                required
                                value={name || ""}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ marginBottom: "20px" }}
                            />
                            <TextField
                                label={"Фамилия"}
                                variant={"filled"}
                                required
                                value={surname || ""}
                                onChange={(e) => setSurname(e.target.value)}
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
                            onClick={handleApply}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Применить
                        </button>

                        <Button
                            onClick={handleDel}
                            variant="outlined"
                            color={"error"}
                        >
                            Уволить
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalEditTeacher;
