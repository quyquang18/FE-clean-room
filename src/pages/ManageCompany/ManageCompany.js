import classNames from 'classnames/bind';
import { handleGetListCompany } from '~/services/userService';
import styles from './ManageCompany.module.scss';
import Select from 'react-select';
import { useCallback, useEffect, useState } from 'react';
import ModalConfirmCompany from './ModalConfirmCompany';
import { useSelector } from 'react-redux';
import { CancelIcon, DoneIcon } from '~/components/Icons';
import { STAUTUS_COMPANY } from '~/utils';

const cx = classNames.bind(styles);

const listOptionStatus = [
    {
        label: 'Chưa xác nhận',
        value: STAUTUS_COMPANY.UNCONFIMRED,
    },
    {
        label: 'Đã xác nhận',
        value: STAUTUS_COMPANY.CONFIRMED,
    },
];

function ManageCompany() {
    document.title = 'LUXAS-ManageCompany';
    const user = useSelector((state) => state.user);
    const [dataCompany, setDataCompany] = useState();
    const [isOpenModalConfirmCompany, setIsOpenModalConfirmCompany] = useState(false);
    const [selectedOption, setSelectedOption] = useState(listOptionStatus[0]);
    const [listCompany, setListCompany] = useState([]);
    const handleCancel = (item) => {};
    const handleConfirm = (item) => {
        setIsOpenModalConfirmCompany(true);
        setDataCompany(item);
    };
    const handleChangeOption = (event) => {
        setSelectedOption(event);
    };
    const getListCompany = useCallback(async () => {
        if (selectedOption) {
            let res = await handleGetListCompany(selectedOption.value);
            if (res && res.errCode === 0) {
                setListCompany(res.data);
            }
        }
    }, [selectedOption]);
    useEffect(() => {
        getListCompany();
    }, [getListCompany]);
    const toggleModalConfirmCompany = () => {
        setIsOpenModalConfirmCompany(!isOpenModalConfirmCompany);
    };
    const confirmSuceess = () => {
        getListCompany();
    };
    return (
        <div>
            {user.userInfo.roleID === 'R1' && (
                <div className={cx('wrapper')}>
                    <h3>Company List</h3>
                    <div className={cx('select-option')}>
                        <Select
                            value={selectedOption}
                            onChange={(event) => handleChangeOption(event)}
                            options={listOptionStatus}
                        />
                    </div>
                    {isOpenModalConfirmCompany && (
                        <ModalConfirmCompany
                            isOpen={isOpenModalConfirmCompany}
                            toggleModalConfirmCompany={toggleModalConfirmCompany}
                            dataCompany={dataCompany}
                            confirmSuceess={confirmSuceess}
                        />
                    )}
                    <div className={cx('acc-table')}>
                        <table className={cx('table')} id="customers">
                            <thead>
                                <tr className={cx('tr')}>
                                    <th>Company Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listCompany && listCompany.length > 0 ? (
                                    listCompany.map((item, index) => {
                                        return (
                                            <tr className={cx('tr')} key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phonenumber}</td>
                                                <td>
                                                    {
                                                        <button className={cx('btn-action')}>
                                                            <span onClick={() => handleConfirm(item)}>
                                                                <DoneIcon className={cx('icon-btn-edit')} />
                                                            </span>
                                                            <span onClick={() => handleCancel(item)}>
                                                                <CancelIcon className={cx('icon-btn-delete')} />
                                                            </span>
                                                        </button>
                                                    }
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

export default ManageCompany;
