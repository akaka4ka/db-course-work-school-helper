import { Publication } from "../../types/Publication";
import PublicationItem from "./PublicationItem";

const PublicationList = ({ publications }) => {
    return (
        <>
            {publications.map((item) => (
                <PublicationItem
                    key={item.id}
                    name={item.name}
                    author={item.author}
                    text={item.text}
                />
            ))}
        </>
    );
};

export default PublicationList;
