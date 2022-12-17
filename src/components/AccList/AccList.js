import classNames from 'classnames/bind';
import { HiPencilAlt } from 'react-icons/hi';
import { MdDeleteForever } from 'react-icons/md';
import { handleGetAllUser, handleUpdateRole } from '~/services/userService';
import styles from './AccList.module.scss';
import { useEffect, useState } from 'react';
import Modal from '~/components/Modal/Modal';

const cx = classNames.bind(styles);

function AccList() {
    const [arrAcc, setArrAcc] = useState([]);
    const [roleID, setRoleID] = useState();
    useEffect(() => {
        callApi();
    }, []);
    const callApi = async () => {
        try {
            let data = await handleGetAllUser('ALL');
            if (data && data.errCode !== 0) {
                console.log(data.message);
            }
            if (data && data.errCode === 0) {
                setArrAcc(data.user);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    console.log(error.response);
                }
            }
        }
    };
    const toggleAction = async (value, item) => {
        if (value === 'confirm') {
            let respon = await handleUpdateRole({ type: 'role', role: roleID, id: item.id });
            callApi();
        } else {
            return;
        }
    };
    const handleChangeRole = (value) => {
        setRoleID(value);
    };
    return (
        <div className={cx('wrapper')}>
            <h3>Account List</h3>
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
                        {arrAcc.map((item, index) => (
                            <tr className={cx('tr')} key={index}>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.phonenumber}</td>
                                <td>{item.roleID}</td>
                                <td>
                                    <Modal
                                        child={
                                            <div className={cx('form-input')}>
                                                <select
                                                    onChange={(e) => {
                                                        handleChangeRole(e.target.value);
                                                    }}
                                                    name="role"
                                                    id="role"
                                                >
                                                    {' '}
                                                    <option value="">Select Role</option>
                                                    <option value="R2">ADMIN</option>
                                                    <option value="R3">USER</option>
                                                </select>
                                            </div>
                                        }
                                        childBtn={<HiPencilAlt className={cx('icon-btn-1')} />}
                                        colorBtn="green"
                                        titleModal="Edit Role User"
                                        toggleFromParent={toggleAction}
                                        item={item}
                                    />
                                    <Modal colorBtn="red" childBtn={<MdDeleteForever className={cx('icon-btn-2')} />} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AccList;
