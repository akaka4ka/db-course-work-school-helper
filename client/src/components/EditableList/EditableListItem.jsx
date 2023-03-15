import { UserStore } from "../../classes/UserStore";
import { getMarksWithDate } from "../../http/studentAPI";
import marksWithDatesConfig from "./ListConfig/Student/MarksWithDatesConfig";

const EditableListItem = ({ setModalOpen, listRow, setModalItem }) => {
    const handleOpenModal = () => {
        setModalItem();

        marksWithDatesConfig.asyncGetItems = () =>
            getMarksWithDate(UserStore.personId, listRow.heading.secondaryText);

        setModalOpen(true);
    };

    return (
        <tr className="bg-white border-b">
            {/* <!-- Modal header --> */}
            <th
                scope="row"
                className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap"
            >
                <div className="pl-3">
                    <div className="text-base font-semibold">
                        {listRow.heading.mainText}
                    </div>
                    {listRow.heading.secondaryText && (
                        <div className="font-normal text-gray-500">
                            {listRow.heading.secondaryText}
                        </div>
                    )}
                </div>
            </th>

            {listRow.tableItems.map((item, index) => {
                return (
                    <td key={index} className="py-4 px-6">
                        {item || "неизвестно"}
                    </td>
                );
            })}

            {listRow.actionName && (
                <td className="py-4 px-6">
                    {/* <!-- Modal toggle --> */}
                    <button
                        onClick={handleOpenModal}
                        data-modal-toggle="editUserModal"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        {listRow.actionName}
                    </button>
                </td>
            )}
        </tr>
    );
};

export default EditableListItem;
