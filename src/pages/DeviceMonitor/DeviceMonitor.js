import classNames from 'classnames/bind';
import { child, ref, onValue } from 'firebase/database';
import { useState, useEffect, useMemo, useCallback, forwardRef } from 'react';

import { handleGetStatusDevice } from '~/services/deviceService';
import PieChart from '~/components/PieChart';
import styles from './DeviceMonitor.module.scss';
import { database } from '~/fribase';
import Select from 'react-select';
import * as actions from '~/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from '~/components/CustomDatePicker';
import { getTime, startOfDay, startOfMonth, sub } from 'date-fns';
import { toast } from 'react-toastify';
import TableStatusDevice from './TableStatusDevice';
const cx = classNames.bind(styles);
const dbRef = ref(database);
function DeviceMonitor() {
    document.title = 'LUXAS-Device Monitor';
    const [statusDevicce, setStatusDevicce] = useState('');
    const [timeMode, setTimeMode] = useState('yesterday');
    const [selectedDate, setSelectedDate] = useState();
    const [data, setData] = useState([]);

    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === 'room') {
                inputData.map((item, index) => {
                    let object = {};
                    object.value = item.id;
                    object.label = item.name;
                    result.push(object);
                    return true;
                });
            }
            if (type === 'device') {
                inputData.map((item, index) => {
                    let object = {};
                    object.value = item.id;
                    object.label = item.deviceName;
                    result.push(object);
                    return true;
                });
            }
            return result;
        }
    };

    const userId = useSelector((state) => state.user.userInfo.id);
    const dispatch = useDispatch();
    let listRoom = useSelector((state) => state.admin.arrRoom);
    listRoom = buildDataInputSelect(listRoom, 'room');
    let listDevice = useSelector((state) => state.admin.arrDevice);
    listDevice = buildDataInputSelect(listDevice, 'device');
    useEffect(() => {
        dispatch(actions.fetchAllRoom(userId));
    }, []);
    const initSelectedRoom = useMemo(() => listRoom && listRoom.length > 0 && listRoom[0], [listRoom]);
    const [selectedRoom, setSelectedRoom] = useState(initSelectedRoom);
    const [selectedDevice, setSelectedDevice] = useState();
    useEffect(() => {
        if (listRoom && listRoom.length > 0 && !selectedRoom) {
            setSelectedRoom(initSelectedRoom);
        }
    }, [listRoom, selectedRoom, initSelectedRoom]);
    const handleChangeRoom = (value) => {
        setSelectedRoom(value);
    };
    const handleChangeDevice = (value) => {
        setSelectedDevice(value);
    };
    useEffect(() => {
        if (selectedRoom) {
            dispatch(actions.fetchAllDeviceInRoom(userId, selectedRoom.value));
        }
    }, [dispatch, userId, selectedRoom]);

    useEffect(() => {
        if (selectedRoom && selectedDevice) {
            onValue(child(dbRef, `statusDevice/${selectedDevice.value}/status`), (snapshot) => {
                const dataFb = snapshot.val();
                setStatusDevicce(dataFb);
            });
        }
    }, [selectedRoom, selectedDevice]);
    const handleSelectTimeMode = (key) => {
        setTimeMode(key);
    };
    const handleChangeDatePicker = (date) => {
        if (date.length > 1) {
            setTimeMode('range');
            setSelectedDate([date[0], date[1]]);
            handleCallApi('range', [getTime(date[0]), getTime(date[1])]);
        }
    };
    const handleCallApi = useCallback(
        async (type, valueDate) => {
            if (selectedDevice && selectedRoom) {
                let response = await handleGetStatusDevice(
                    userId,
                    selectedDevice.value,
                    selectedRoom.value,
                    type,
                    valueDate,
                );
                if (response.errCode === 0) {
                    setData(response.data);
                }
                if (response.errCode !== 0) {
                    toast.error(response.message);
                }
            }
        },
        [userId, selectedDevice, selectedRoom],
    );

    useEffect(() => {
        switch (timeMode) {
            case 'yesterday':
                handleCallApi('date', getTime(startOfDay(sub(new Date(), { days: 1 }))));
                break;
            case 'currentday':
                handleCallApi('date', getTime(startOfDay(new Date())));
                break;
            case 'thismonth':
                handleCallApi('month', getTime(startOfMonth(new Date())));
                break;
            case 'lastmonth':
                handleCallApi('month', getTime(startOfMonth(sub(new Date(), { months: 1 }))));
                break;
            default:
                break;
        }
    }, [timeMode, handleCallApi]);
    const CustomInputDatePicker = forwardRef(({ value, onClick }, ref) => {
        if (!value) {
            value = 'Select Range Time...';
        }
        return (
            <button className={cx('item', { active: timeMode === 'range' ? true : false })} onClick={onClick} ref={ref}>
                {value}
            </button>
        );
    });
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Device Monitor</h2>
            <div className={cx('select-location')}>
                <Select value={selectedRoom} onChange={(event) => handleChangeRoom(event)} options={listRoom} />
                <Select value={selectedDevice} onChange={(event) => handleChangeDevice(event)} options={listDevice} />
            </div>
            <div className={cx('status-device')}>
                <h4 className={cx('head-content')}>Current device status</h4>
                <div className={cx('status-content')}>
                    <div className={cx('status-light')}>
                        <div className={cx({ on: statusDevicce === 'ON' ? true : false })}></div>
                        <div className={cx({ error: statusDevicce === 'ERROR' ? true : false })}></div>
                        <div className={cx({ off: statusDevicce === 'OFF' ? true : false })}></div>
                    </div>
                    <div className={cx('staust-name')}>
                        Status : <p>{statusDevicce}</p>
                    </div>
                </div>
            </div>
            <div className={cx('statistical')}>
                <h2 className={cx('head-content')}>My Stats</h2>
                <div className={cx('select-time')}>
                    <button
                        className={cx('item', { active: timeMode === 'yesterday' ? true : false })}
                        onClick={() => handleSelectTimeMode('yesterday')}
                    >
                        Yesterday
                    </button>
                    <button
                        className={cx('item', { active: timeMode === 'currentday' ? true : false })}
                        onClick={() => handleSelectTimeMode('currentday')}
                    >
                        CurrentDay
                    </button>

                    <button
                        className={cx('item', { active: timeMode === 'thismonth' ? true : false })}
                        onClick={() => handleSelectTimeMode('thismonth')}
                    >
                        This Month
                    </button>
                    <button
                        className={cx('item', { active: timeMode === 'lastmonth' ? true : false })}
                        onClick={() => handleSelectTimeMode('lastmonth')}
                    >
                        Last Month
                    </button>
                    <CustomDatePicker
                        selected={selectedDate}
                        onChange={(date, type) => handleChangeDatePicker(date, type)}
                        typeShow={'range'}
                        maxDate={startOfDay(new Date()).getTime()}
                        customInput={<CustomInputDatePicker />}
                    />
                </div>
                <PieChart data={data} type={timeMode} dateRange={selectedDate} />
                <div className={cx('list-status')}>
                    <h2 className={cx('head-content')}>Status List</h2>
                    <TableStatusDevice
                        data={data}
                        roomName={selectedRoom && selectedRoom.label}
                        deviceName={selectedDevice && selectedDevice.label}
                    />
                </div>
            </div>
        </div>
    );
}

export default DeviceMonitor;
