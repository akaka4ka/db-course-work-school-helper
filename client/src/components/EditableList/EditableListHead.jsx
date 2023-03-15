const EditableListHead = ({ editableListHead }) => {
    return (
        <tr>
            {editableListHead.map((heading, index) => {
                return (
                    <th key={index} scope='col' className='py-3 px-6'>
                        {heading}
                    </th>
                );
            })}
        </tr>
    );
};

export default EditableListHead;
