import { UserStore } from '../../../classes/UserStore';
import { courseJoinStudent } from '../../../http/studentAPI';
import { updater } from '../../StudentAccount/StudentCourses/StudentCourses';

const ModalCoursesJoin = ({ course, handleClose, update }) => {
    const handleOnClick = async (e) => {
        e.preventDefault();
        await courseJoinStudent(UserStore.personId, course.courseTeacherId);
        handleClose();
        updater();
    };

    return (
        <>
            <div className='p-6 space-y-6'>
                <div className='grid grid-cols-6 gap-6'>
                    Вы уверены, что хотите записаться на курс {course.name} у учителя{" "}
                    {course.teacherName + " " + course.teacherSurname}?
                </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div
                className='flex items-center p-6 space-x-2 rounded-b border-t border-gray-200'
                style={{ justifyContent: 'space-between' }}
            >
                {/* <!-- Buttons from config --> */}

                <button
                    onClick={handleOnClick}
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                    Записаться
                </button>
            </div>
        </>
    );
};

export default ModalCoursesJoin;
