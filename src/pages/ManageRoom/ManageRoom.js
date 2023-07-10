import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';

import styles from './ManageRoom.module.scss';
import * as actions from '~/store/actions';
import ModalEditRoom from './ModalEditRoom';
import ModalDeleteRoom from './ModalDeleteRoom';
import { DeleteIcon, EditIcon } from '~/components/Icons';
const cx = className.bind(styles);
function ManageRoom() {
    const [isOpenModalEditRoom, setIsOpenModalEditRoom] = useState(false);
    const [isOpenModalDeleteRoom, setIsOpenModalDeleteRoom] = useState();
    const [dataRoom, setDataRoom] = useState();

    const companyId = useSelector((state) => state.user.userInfo.companyId);
    let listRoom = useSelector((state) => state.admin.arrRoom);
    const dispatch = useDispatch();
    useEffect(() => {
        if (companyId) {
            dispatch(actions.fetchAllRoom(companyId));
        }
    }, [dispatch, companyId]);

    const handleDeleteRoom = (item) => {
        setIsOpenModalDeleteRoom(true);
        setDataRoom(item);
    };
    const handleEditRoom = (item) => {
        setIsOpenModalEditRoom(true);
        setDataRoom(item);
    };

    const toggleEditRoomModal = () => {
        setIsOpenModalEditRoom(!isOpenModalEditRoom);
    };
    const toggleDeleteRoomModal = () => {
        setIsOpenModalDeleteRoom(!isOpenModalDeleteRoom);
    };

    const updateInfoSuccees = () => {
        if (companyId) {
            dispatch(actions.fetchAllRoom(companyId));
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Room Manager</h2>
            {isOpenModalEditRoom && (
                <ModalEditRoom
                    isOpen={isOpenModalEditRoom}
                    toggleEditRoomModal={toggleEditRoomModal}
                    dataRoom={dataRoom}
                    updateInfoSuccees={updateInfoSuccees}
                />
            )}
            {isOpenModalDeleteRoom && (
                <ModalDeleteRoom
                    isOpen={isOpenModalDeleteRoom}
                    toggleDeleteRoomModal={toggleDeleteRoomModal}
                    dataRoom={dataRoom}
                    updateInfoSuccees={updateInfoSuccees}
                />
            )}
            <div className={cx('list-room')}>
                <h3 className={cx('title')}>List Room</h3>
                <div className={cx('room-table')}>
                    <table className={cx('table')} id="customers">
                        <thead>
                            <tr className={cx('tr')}>
                                <th>Room Name</th>
                                <th>Date created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listRoom &&
                                listRoom.length > 0 &&
                                listRoom.map((item, index) => {
                                    return (
                                        <tr className={cx('tr')} key={index}>
                                            <td>{item.name}</td>
                                            <td>{format(new Date(item.createdAt), 'dd/MM/yyyy')}</td>
                                            <td>
                                                <button className={cx('btn-action')}>
                                                    <span onClick={() => handleEditRoom(item)}>
                                                        <EditIcon className={cx('icon-btn-edit')} />
                                                    </span>
                                                    <span onClick={() => handleDeleteRoom(item)}>
                                                        <DeleteIcon className={cx('icon-btn-delete')} />
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageRoom;
