import className from 'classnames/bind';
import { useEffect, useState } from 'react';


import Button from '~/components/Button';
import { DeleteIcon, EditIcon, PlusIcon } from '~/components/Icons';
import { getAllInfoDeviceByCompany } from '~/services/deviceService';
import styles from './DeviceManager.module.scss';
import * as actions from '~/store/actions';
import { useSelector, useDispatch } from 'react-redux';
import ModalEditDevice from './ModalEditDevice';
import { format } from 'date-fns';
import { LANGUAGES } from '~/utils';
import ModalDeleteDevice from './ModalDeleteDevice';
import { onValue, ref, child, update } from 'firebase/database';
import { database } from '~/firebase';
const cx = className.bind(styles);
const dbRef = ref(database);
function DeviceManager() {
    const [arrDevice, setArrAcc] = useState([]);
    const [isOpenModalEditDevice, setIsOpenModalEditDevice] = useState(false);
    const [isOpenModalDeleteDevice, setIsOpenModalDeleteDevice] = useState();
    const [dataDeviceEdit, setDataDeviceEdit] = useState();

    const companyId = useSelector((state) => state.user.userInfo.companyId);
    let language = useSelector((state) => state.app.language);
    const lisTypeDevice = useSelector((state) => state.admin.arrTypeDevice);
    let listRoom = useSelector((state) => state.admin.arrRoom);
    const dispatch = useDispatch();
    useEffect(() => {
        if (companyId) {
            callApi(companyId);
        }
        dispatch(actions.fetchAllRoom(companyId));
    }, [dispatch, companyId]);
    useEffect(() => {
        dispatch(actions.fetchTypeDevice());
    }, [dispatch]);
    const callApi = async (companyId) => {
        let res = await getAllInfoDeviceByCompany(companyId);
        if (res && res.errCode !== 0) {
            console.log(res.message);
        }
        if (res && res.errCode === 0) {
            setArrAcc(res.data);
        }
    };
    const handleDeleteUser = (item) => {
        setIsOpenModalDeleteDevice(true);
        setDataDeviceEdit(item);
    };
    const handleEditDevice = (item) => {
        setIsOpenModalEditDevice(true);
        setDataDeviceEdit(item);
    };

    const toggleEditDeviceModal = () => {
        setIsOpenModalEditDevice(!isOpenModalEditDevice);
    };
    const toggleDeleteDeviceModal = () => {
        setIsOpenModalDeleteDevice(!isOpenModalDeleteDevice);
    };
    const updateInFirebase = (data) => {
        data.companyId = companyId;
        data.status = 'OFF';
        onValue(
            child(dbRef, `${companyId}/${data.roomId}/statusDevice/` + data.idDevice),
            (snapshot) => {
                var exists = snapshot.exists();
                let resData = snapshot.val();
                if (exists) {
                    if (
                        resData.deviceName === data.deviceName &&
                        resData.roomId === data.roomId &&
                        resData.typeDevice === data.typeDevice
                    ) {
                        return true;
                    } else {
                        const updates = {};
                        updates[`${companyId}/${data.roomId}/statusDevice/` + data.idDevice] = data;
                        update(dbRef, updates);
                    }
                } else {
                    const updates = {};
                    updates[`${companyId}/${data.roomId}/statusDevice/` + data.idDevice] = data;
                    update(dbRef, updates);
                }
            },
            {
                onlyOnce: true,
            },
        );
    };
    const updateInfoSuccees = (data) => {
        if (companyId) {
            callApi(companyId);
            updateInFirebase(data);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Device Manager</h2>
            {isOpenModalEditDevice && (
                <ModalEditDevice
                    isOpen={isOpenModalEditDevice}
                    toggleEditDeviceModal={toggleEditDeviceModal}
                    dataDeviceEdit={dataDeviceEdit}
                    lisTypeDevice={lisTypeDevice}
                    listRoom={listRoom}
                    updateInfoSuccees={updateInfoSuccees}
                />
            )}
            {isOpenModalDeleteDevice && (
                <ModalDeleteDevice
                    isOpen={isOpenModalDeleteDevice}
                    toggleDeleteDeviceModal={toggleDeleteDeviceModal}
                    dataDeviceEdit={dataDeviceEdit}
                    lisTypeDevice={lisTypeDevice}
                    listRoom={listRoom}
                    updateInfoSuccees={updateInfoSuccees}
                />
            )}
            <div className={cx('btn-add-device')}>
                <Button leftIcon={<PlusIcon />} to="./add-device" primary>
                    Add New Device
                </Button>
            </div>
            <div className={cx('list-device')}>
                <h3 className={cx('title')}>List Device</h3>
                <div className={cx('device-table')}>
                    <table className={cx('table')} id="customers">
                        <thead>
                            <tr className={cx('tr')}>
                                <th>Deive Name</th>
                                <th>Type</th>
                                <th>Location</th>
                                <th>Date created</th>
                                <th>Last update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrDevice.map((item, index) => {
                                let typeDevice = lisTypeDevice.find((element) => element.keyMap === item.typeDevice);
                                let typeDeviceName;
                                if (typeDevice) {
                                    typeDeviceName =
                                        language === LANGUAGES.VI ? typeDevice.valueVI : typeDevice.valueEN;
                                }
                                return (
                                    <tr className={cx('tr')} key={index}>
                                        <td>{item.deviceName}</td>
                                        <td>{typeDeviceName}</td>
                                        <td>{item.Room.name}</td>
                                        <td>{format(new Date(item.createdAt), 'dd/MM/yyyy')}</td>
                                        <td>{format(new Date(item.updatedAt), 'dd/MM/yyyy')}</td>
                                        <td>
                                            <button className={cx('btn-action')}>
                                                <span onClick={() => handleEditDevice(item)}>
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
        </div>
    );
}

export default DeviceManager;
