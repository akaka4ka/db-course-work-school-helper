import { useRef } from "react";
import styled from "styled-components";
import { ReactComponent as LogoPic } from "../../assets/images/Logo.svg";

const LogoContainer = styled.div`
    position: relative;
    margin-top: 20px;
    width: 50px;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoPath = styled.svg`
    position: absolute;
    transform: rotate(90deg);
`;

const Logo = styled.div`
    position: absolute;
    margin: 0;
    padding: 0;
`;

const LogoSvg = () => {
    return (
        <LogoContainer>
            <LogoPath id="logoPath" viewBox="0 0 120 100">
                <path
                    d="M38,2 
             L82,2 
             A12,12 0 0,1 94,10 
             L112,44 
             A12,12 0 0,1 112,56
             L94,90       
             A12,12 0 0,1 82,98
             L38,98
             A12,12 0 0,1 26,90
             L8,56
             A12,12 0 0,1 8,44
             L26,10
             A12,12 0 0,1 38,2"
                    fill="orange"
                />
            </LogoPath>
            <Logo>
                <LogoPic />
            </Logo>
        </LogoContainer>
    );
};

export default LogoSvg;
