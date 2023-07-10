import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { onValue, ref, child, update } from 'firebase/database';

import styles from './AddDevice.module.scss';
import { handleCreateNewDevice } from '~/services/deviceService';
import { CRUD_ACTIONS, path } from '~/utils';
import * as actions from '~/store/actions';
import Button from '~/components/Button';
import { BackWard } from '~/components/Icons';
import { database } from '~/firebase';
const dbRef = ref(database);
const cx = classNames.bind(styles);
function AddDevice() {
    const [modeLocation, setModeLocation] = useState();
    const [selecedRoom, setSelectedRoom] = useState();
    const [selecedTypeDevice, setSelectedTypeDevice] = useState();
    const [deviceName, setDeviceName] = useState('');
    const [roomName, setroomName] = useState('');
    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                if (type === 'room') {
                    object.label = item.name;
                    object.value = item.id;
                } else {
                    object.label = item.valueVI;
                    object.value = item.keyMap;
                }
                result.push(object);
                return true;
            });
            return result;
        }
    };
    const companyId = useSelector((state) => state.user.userInfo.companyId);
    let lisTypeDevice = useSelector((state) => state.admin.arrTypeDevice);
    let listRoom = useSelector((state) => state.admin.arrRoom);
    listRoom = buildDataInputSelect(listRoom, 'room');
    lisTypeDevice = buildDataInputSelect(lisTypeDevice);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchAllRoom(companyId));
    }, [dispatch, companyId]);
    useEffect(() => {
        dispatch(actions.fetchTypeDevice());
    }, [dispatch]);
    const updateInFirebase = (data) => {
        let dataCreate = {};
        dataCreate.companyId = data.companyId;
        dataCreate.roomId = data.roomId;
        dataCreate.typeDevice = data.typeDevice;
        dataCreate.deviceName = data.deviceName;
        dataCreate.idDevice = data.id;
        dataCreate.status = 'OFF';
        onValue(
            child(dbRef, `${companyId}/${dataCreate.roomId}/statusDevice/` + dataCreate.idDevice),
            (snapshot) => {
                var exists = snapshot.exists();
                let resData = snapshot.val();
                if (exists) {
                    if (
                        resData.deviceName === dataCreate.deviceName &&
                        resData.companyId === dataCreate.companyId &&
                        resData.roomId === dataCreate.roomId &&
                        resData.typeDevice === dataCreate.typeDevice
                    ) {
                        return true;
                    } else {
                        const updates = {};
                        updates[`${companyId}/${dataCreate.roomId}/statusDevice/` + dataCreate.idDevice] = dataCreate;
                        update(dbRef, updates);
                    }
                } else {
                    const updates = {};
                    updates[`${companyId}/${dataCreate.roomId}/statusDevice/` + dataCreate.idDevice] = dataCreate;
                    update(dbRef, updates);
                }
            },
            {
                onlyOnce: true,
            },
        );
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (modeLocation === CRUD_ACTIONS.UPDATE) {
            let data = {};
            data.roomId = selecedRoom.value;
            data.companyId = companyId;
            data.typeDevice = selecedTypeDevice.value;
            data.deviceName = deviceName;
            data.mode = modeLocation;
            let res = await handleCreateNewDevice(data);
            if (res && res.errCode === 0) {
                toast.success(res.message);
                updateInFirebase(res.data);
            } else {
                toast.error(res.message);
            }
        }
        if (modeLocation === CRUD_ACTIONS.CREATE) {
            let data = {};
            data.roomName = roomName;
            data.companyId = companyId;
            data.typeDevice = selecedTypeDevice.value;
            data.deviceName = deviceName;
            data.mode = modeLocation;
            let res = await handleCreateNewDevice(data);
            if (res && res.errCode === 0) {
                toast.success(res.message);
                dispatch(actions.fetchAllRoom(companyId));
                updateInFirebase(res.data);
            } else {
                toast.error(res.message);
            }
        }
    };
    const handleChangeDeviceName = (event) => {
        setDeviceName(event.target.value);
    };
    const handleChangeRoom = (value) => {
        setSelectedRoom(value);
    };
    const handleChangeTypeDevice = (value) => {
        setSelectedTypeDevice(value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('btn-back')}>
                <Button leftIcon={<BackWard />} to={path.DEVICE_MANAGER} primary>
                    Back
                </Button>
            </div>
            <h2 className={cx('title')}>Add New Devices</h2>
            <div className="row">
                <div className="col c-10 c-o-1 m-8 m-o-2 l-6 l-o-3">
                    <form method="post" className={cx('form')}>
                        <div className={cx('form-group')}>
                            <label className={cx('form-label')}>Tên Thiết bị</label>
                            <input
                                placeholder="Ex: Lights"
                                type="text"
                                className={cx('form-input', 'input')}
                                value={deviceName}
                                onChange={(event) => handleChangeDeviceName(event)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label forhtml="device-type" className={cx('form-label')}>
                                Loại thiết bị
                            </label>
                            <Select
                                value={selecedTypeDevice}
                                onChange={(event) => handleChangeTypeDevice(event)}
                                options={lisTypeDevice}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label forhtml="location" className={cx('form-label')}>
                                Vị trí
                            </label>
                            <div className={cx('inputGroup')}>
                                <input
                                    className={cx('input')}
                                    name="mode"
                                    type="radio"
                                    id="radio1"
                                    value={CRUD_ACTIONS.UPDATE}
                                    onChange={(e) => setModeLocation(e.target.value)}
                                />
                                <label htmlFor="radio1">Vị trí có sẵn</label>
                            </div>
                            {modeLocation === CRUD_ACTIONS.UPDATE && (
                                <Select
                                    value={selecedRoom}
                                    onChange={(event) => handleChangeRoom(event)}
                                    options={listRoom}
                                />
                            )}
                            <div className={cx('inputGroup')}>
                                <input
                                    className={cx('input')}
                                    name="mode"
                                    type="radio"
                                    id="radio2"
                                    value={CRUD_ACTIONS.CREATE}
                                    onChange={(e) => setModeLocation(e.target.value)}
                                />
                                <label htmlFor="radio2">Vị trí mới</label>
                            </div>
                            {modeLocation === CRUD_ACTIONS.CREATE && (
                                <span className={cx('location-input')}>
                                    <input
                                        name="location"
                                        placeholder="Ex: Work Shop 1"
                                        type="text"
                                        className={cx('form-input', 'input')}
                                        value={roomName}
                                        onChange={(e) => setroomName(e.target.value)}
                                    />
                                </span>
                            )}
                        </div>
                        <button type="submit" className={cx('form-submit')} onClick={handleSubmit}>
                            Thêm
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddDevice;
