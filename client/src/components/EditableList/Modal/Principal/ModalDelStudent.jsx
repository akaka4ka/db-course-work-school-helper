import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DuraDatePicker from "../../../DatePicker/DatePicker";
import { EditableListStudentsContext } from "../../EditableListStudents";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { CustomButton } from "../../../UIKit/CustomButton/CustomButton";
import { deleteStudent, updateStudent } from "../../../../http/principalAPI";

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

const ModalDelStudent = ({ handleClose }) => {
    const { modalItem, gradesList, updateComponent } = useContext(
        EditableListStudentsContext
    );
    // const form = useForm(["name", "surname"]);
    const [name, setName] = useState(modalItem.name);
    const [surname, setSurname] = useState(modalItem.surname);
    const [grade, setGrade] = useState(modalItem.grade.id);
    const [birthday, setBirthday] = useState(modalItem.birthdayDate);

    const token = useRef("");

    const handleApply = async () => {
        const formEl = document.getElementById("dura");
        if (!formEl.checkValidity()) {
            const tmpSubmit = document.createElement("button");
            formEl.appendChild(tmpSubmit);
            tmpSubmit.click();
            formEl.removeChild(tmpSubmit);
        } else {
            const somethingChanged =
                name !== modalItem.name ||
                surname !== modalItem.surname ||
                grade !== modalItem.grade.id ||
                birthday !== modalItem.birthdayDate;

            if (somethingChanged) {
                updateStudent(
                    modalItem.id,
                    name,
                    surname,
                    birthday.substring(0, 10),
                    grade
                ).then((r) => {
                    updateComponent();
                    handleClose();
                });
            }
        }
    };

    const handleDel = () => {
        deleteStudent(modalItem.id).then((r) => {
            updateComponent();
            handleClose();
        });
    };

    return (
        <>
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
                        <FormControl required>
                            <InputLabel id={"demo-simple-select-label"}>
                                Класс
                            </InputLabel>
                            <Select
                                labelId={"demo-simple-select-label"}
                                id={"demo-simple-select"}
                                sx={{ marginRight: "50px" }}
                                value={grade}
                                onChange={(e) => {
                                    setGrade(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                label={"Класс"}
                            >
                                {gradesList?.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.value}
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
                        Отчислить
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ModalDelStudent;
