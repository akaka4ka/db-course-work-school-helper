import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "../../../../hooks/useForm";
import DuraDatePicker from "../../../DatePicker/DatePicker";
import { EditableListStudentsContext } from "../../EditableListStudents";
import { addStudent } from "../../../../http/principalAPI";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

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

const ModalAddStudent = ({ handleClose }) => {
    const form = useForm(["name", "surname"]);
    const [grade, setGrade] = useState("");
    const [birthday, setBirthday] = useState("");
    const { gradesList } = useContext(EditableListStudentsContext);

    const [isLoading, setIsLoading] = useState(false);
    const [gotResponse, setGotResponse] = useState(false);

    const token = useRef("");

    const handleOnClick = async () => {
        const formEl = document.getElementById("dura");
        if (!formEl.checkValidity()) {
            const tmpSubmit = document.createElement("button");
            formEl.appendChild(tmpSubmit);
            tmpSubmit.click();
            formEl.removeChild(tmpSubmit);
        } else {
            setIsLoading(true);
            addStudent(
                form.name.value,
                form.surname.value,
                `${birthday.$y}-${birthday.$M + 1}-${birthday.$D}`,
                grade
            ).then((r) => {
                setGotResponse(true);
                setIsLoading(false);
                console.log(r);
                token.current = r;
            });
        }
    };

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
                    <Alert severity="success" sx={{width: "100%"}}>
                        Студент успешно добавлен! Токен для регистрации: 
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
                            <FormControl required>
                                <InputLabel id={"dura-studentota-label"}>
                                    Класс
                                </InputLabel>
                                <Select
                                    labelId={"dura-studentota-label"}
                                    id={"dura-studentota"}
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
                            onClick={handleOnClick}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Зачислить
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalAddStudent;
