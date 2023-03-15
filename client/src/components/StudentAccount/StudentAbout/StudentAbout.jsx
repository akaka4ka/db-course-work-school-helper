import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { useState } from "react";
import { UserStore } from "../../../classes/UserStore";
import EditableListPage from "../../EditableList/EditableListPage";
import matesListConfig from "../../EditableList/ListConfig/Student/MatesListConfig";

const Panels = {
    grade: "grade",
};

const AboutGrade = ({ expanded, handleChange, about }) => {
    return (
        <Accordion
            expanded={expanded === Panels.grade}
            onChange={handleChange(Panels.grade)}
        >
            <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id={Panels.grade + "bh-header"}
            >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Мой класс
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                    {`${about.grade.number}${about.grade.letter}`}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>Мои одноклассники</Typography>
                <EditableListPage config={matesListConfig}/>
            </AccordionDetails>
        </Accordion>
    );
};

const StudentAbout = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <AboutGrade
            expanded={expanded}
            handleChange={handleChange}
            about={{ grade: UserStore.grade }}
        />
    );
};

export default StudentAbout;
