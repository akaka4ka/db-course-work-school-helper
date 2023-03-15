import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    left: 0;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 200px;
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 20px;
`;

const ItemWrapper = styled.div`
    width: 80vw;
    height: 100%;
    background-color: white;
    border-radius: 20px;
    padding-top: 10px;
    box-shadow: 0px 0px 8px 1px black;
`;

const FullItemWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const PercentItemWrapper = styled.div`
    width: ${(props) => "" + props.width + "%"};
    display: flex;
`;

const Name = styled.h1`
    font-size: 1.5em;
`;

const Author = styled.span`
    color: #8c8c8c;
    font-size: 0.95em;
`;

const Outline = styled.hr`
    width: ${(props) => "" + props.width + "%"};
    color: black;
    height: 2px;
    border-top: 1px solid #333;
`;

const Text = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
`;

const VerticalWhiteSpace = styled.div`
    height: ${(props) => "" + props.height + "px"};
`;

const PublicationItem = ({ name, author, text }) => {
    return (
        <Container>
            <ItemWrapper>
                <FullItemWrapper>
                    <PercentItemWrapper
                        width={95}
                        style={{
                            flexDirection: "column",
                            justifySelf: "center",
                        }}
                    >
                        <Name>{name}</Name>
                        <Outline width={100} />
                        <Text>{text}</Text>
                        <VerticalWhiteSpace height={10} />
                        <Outline width={20} style={{ alignSelf: "center" }} />
                        <PercentItemWrapper
                            width={100}
                            style={{ justifyContent: "space-between" }}
                        >
                            <Author>Author: {author}</Author>
                            <Link to={"/publications/:id"}>Читать далее</Link>
                        </PercentItemWrapper>
                    </PercentItemWrapper>
                </FullItemWrapper>
            </ItemWrapper>
        </Container>
    );
};

// const styles = new StyleSheet({
//     publicationBox: {

//     }
// });

export default PublicationItem;
