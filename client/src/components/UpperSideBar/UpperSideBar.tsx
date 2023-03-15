import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    left: 0;
    margin: 0;
    margin-top: 20px;
    padding: 0;
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: center;
`;

const FullItemWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
`;

const ItemsWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    padding-top: 10px;
    display: flex;
    justify-content: space-around;
`;

const BarItemWrapper = styled.div`
    line-height: 30px;
    text-align: center;
    width: fit-content;
    margin: 0;
    padding: 4px;
    padding-left: 10px;
    padding-right: 10px;
    height: 100%;
    background-color: white;
    border-radius: 10px;
    user-select: none;
    :hover {
        cursor: pointer;
    }
`;

const Outline = styled.hr`
    margin-top: 20px;
    width: 100%;
    color: black;
    height: 2px;
    border-top: 1px solid #8c8c8c;
`;

const SideBarItem = ({
    name,
    callback,
    isSelected,
}: {
    name: string;
    callback: Function;
    isSelected: boolean;
}) => {
    return (
        <BarItemWrapper
            onClick={() => callback(name)}
            style={
                isSelected
                    ? {
                          backgroundColor: "#318CE7",
                      }
                    : {}
            }
        >
            {name}
        </BarItemWrapper>
    );
};

const UpperSideBar = ({
    items,
    selectedName,
    selectionCallback,
}: {
    items: string[];
    selectedName: string;
    selectionCallback: Function;
}) => {
    return (
        <Container>
            <FullItemWrapper style={{ flexDirection: "column" }}>
                <ItemsWrapper>
                    {items.map((item) => (
                        <SideBarItem
                            key={item}
                            name={item}
                            callback={selectionCallback}
                            isSelected={item === selectedName}
                        />
                    ))}
                </ItemsWrapper>
                <Outline />
            </FullItemWrapper>
        </Container>
    );
};

export default UpperSideBar;
