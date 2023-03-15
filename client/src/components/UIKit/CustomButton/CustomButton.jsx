import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    border: "none",
    "&:hover": {
        border: "none",
        backgroundColor: red[700],
    },
}));

export const CustomButton = ({ onClick, children }) => {
    return (
        <ColorButton onClick={onClick} variant="outlined">
            {children}
        </ColorButton>
    );
};
