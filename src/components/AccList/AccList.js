import classNames from 'classnames/bind';
import { handleUpdateRole } from '~/services/userService';
import { EditIcon, DeleteIcon } from '../Icons';
import styles from './AccList.module.scss';
import { useEffect, useState } from 'react';
import ModalEditUser from './ModalEditUser';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import _ from 'lodash';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

function AccList() {
    const [dataUserEdit, setDataUserEdit] = useState();
    const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
    const listUser = useSelector((state) => state.admin.arrUser);
    const listRole = useSelector((state) => state.admin.roles);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fechAllUser());
        dispatch(actions.fetchRole());
    }, [dispatch]);

    const handleDeleteUser = (item) => {};
    const handleEditUser = (item) => {
        setIsOpenModalEditUser(true);
        setDataUserEdit(item);
    };
    const toggleEditUserModal = () => {
        setIsOpenModalEditUser(!isOpenModalEditUser);
    };
    const editUser = async (data) => {
        try {
            console.log(data);
            let response = await handleUpdateRole({ type: 'role', id: dataUserEdit.id, role: data.value });
            if (response.errCode !== 0) {
                toast.error(response.message);
            } else {
                dispatch(actions.fechAllUser());
                setIsOpenModalEditUser(false);
                toast.success('Update Role User Succeed !');
                // emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h3>Account List</h3>
            {isOpenModalEditUser && (
                <ModalEditUser
                    isOpen={isOpenModalEditUser}
                    toggleEditUserModal={toggleEditUserModal}
                    dataUserEdit={dataUserEdit}
                    editUser={editUser}
                />
            )}
            <div className={cx('acc-table')}>
                <table className={cx('table')} id="customers">
                    <thead>
                        <tr className={cx('tr')}>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser &&
                            listUser.length > 0 &&
                            listUser.map((item, index) => {
                                let role = '';
                                item.role = {};
                                if (listRole && listRole.length > 0) {
                                    role = listRole.find((itemGender) => itemGender.keyMap === item.roleID);
                                    if (role && !_.isEmpty(role)) {
                                        item.role.value = item.roleID;
                                        item.role.label = role.valueVI;
                                    }
                                }
                                return (
                                    <tr className={cx('tr')} key={index}>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>{item.role.label}</td>
                                        <td>
                                            <button className={cx('btn-action')}>
                                                <span onClick={() => handleEditUser(item)}>
                                                    <EditIcon className={cx('icon-btn-edit')} />
                                                </span>
                                                <span onClick={() => handleDeleteUser(item)}>
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
    );
}

export default AccList;
