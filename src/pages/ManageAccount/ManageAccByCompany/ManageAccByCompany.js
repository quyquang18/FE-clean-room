import classNames from 'classnames/bind';
import { getAllUserByCompany } from '~/services/userService';
import styles from './ManageAccByCompany.module.scss';
import { useCallback, useEffect, useState } from 'react';
import ModalConfirmUser from './ModalConfirmUser';
import { useSelector } from 'react-redux';
import { CancelIcon, DoneIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function ManageAccByCompany() {
    const user = useSelector((state) => state.user);
    const companyId = useSelector((state) => state.user.userInfo.companyId);
    const [dataUser, setDataUser] = useState();
    const [isOpenModalConfirmUser, setIsOpenModalConfirmUser] = useState(false);
    const [listUser, setListUser] = useState([]);
    const handleCancel = (item) => {};
    const handleConfirm = (item) => {
        setIsOpenModalConfirmUser(true);
        setDataUser(item);
    };

    const getListCompany = useCallback(async () => {
        if (companyId) {
            let res = await getAllUserByCompany(companyId);
            if (res && res.errCode === 0) {
                setListUser(res.data);
            }
        }
    }, [companyId]);
    useEffect(() => {
        getListCompany();
    }, [getListCompany]);
    const toggleModalConfirmUser = () => {
        setIsOpenModalConfirmUser(!isOpenModalConfirmUser);
    };
    const confirmSuceess = () => {
        getListCompany();
    };
    return (
        <div>
            {user.userInfo.roleID === 'R2' && (
                <div className={cx('wrapper')}>
                    <h3>User List</h3>
                    {isOpenModalConfirmUser && (
                        <ModalConfirmUser
                            isOpen={isOpenModalConfirmUser}
                            toggleModalConfirmUser={toggleModalConfirmUser}
                            dataUser={dataUser}
                            confirmSuceess={confirmSuceess}
                        />
                    )}
                    <div className={cx('acc-table')}>
                        <table className={cx('table')} id="customers">
                            <thead>
                                <tr className={cx('tr')}>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>User verified</th>
                                    <th>Company verified</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser && listUser.length > 0 ? (
                                    listUser.map((item, index) => {
                                        return (
                                            <tr className={cx('tr')} key={index}>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phonenumber}</td>
                                                <td>{item.userVerified ? 'Confirmed' : 'Unconfimred'}</td>
                                                <td>{item.companyVerified ? 'Confirmed' : 'Unconfimred'}</td>
                                                <td>
                                                    <button className={cx('btn-action')}>
                                                        {!item.companyVerified && (
                                                            <span onClick={() => handleConfirm(item)}>
                                                                <DoneIcon className={cx('icon-btn-edit')} />
                                                            </span>
                                                        )}
                                                        <span onClick={() => handleCancel(item)}>
                                                            <CancelIcon className={cx('icon-btn-delete')} />
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            style={{
                                                textAlign: 'center',
                                                fontSize: '1.6rem',
                                                color: 'red',
                                                fontWeight: 'bold',
                                            }}
                                            colSpan="8"
                                        >
                                            {'No data'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageAccByCompany;
