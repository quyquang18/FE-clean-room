import classNames from 'classnames/bind';
import { child, ref, onValue } from 'firebase/database';
import { useState, useEffect, useMemo, useCallback, forwardRef, useRef } from 'react';

import { handleGetStatusDevice } from '~/services/deviceService';
import PieChart from '~/components/PieChart';
import styles from './DeviceMonitor.module.scss';
import { database } from '~/firebase';
import Select from 'react-select';
import * as actions from '~/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from '~/components/CustomDatePicker';
import { getTime, startOfDay, startOfMonth, sub } from 'date-fns';
import { toast } from 'react-toastify';
import TableStatusDevice from './TableStatusDevice';
import { getPathStatusDeviceFirebase, LANGUAGES } from '~/utils';
import { buildDataInputSelect } from '~/reuse';
const cx = classNames.bind(styles);
const dbRef = ref(database);
function DeviceMonitor() {
    document.title = 'LUXAS-Device Monitor';
    const [statusDevicce, setStatusDevicce] = useState('');
    const [timeMode, setTimeMode] = useState('yesterday');
    const [selectedDate, setSelectedDate] = useState();
    const [data, setData] = useState([]);

    const companyId = useSelector((state) => state.user.userInfo.companyId);
    let listRoom = useSelector((state) => state.admin.arrRoom);
    listRoom = buildDataInputSelect(listRoom, 'room');

    let listDevice = useSelector((state) => state.admin.arrDevice);
    listDevice = buildDataInputSelect(listDevice, 'device');
    const listStatus = useSelector((state) => state.admin.arrStatus);
    const language = useSelector((state) => state.app.language);

    const initSelectedRoom = useMemo(() => listRoom && listRoom.length > 0 && listRoom[0], [listRoom]);
    const [selectedRoom, setSelectedRoom] = useState(initSelectedRoom);
    const [selectedDevice, setSelectedDevice] = useState();
    useEffect(() => {
        if (listRoom && listRoom.length > 0 && !selectedRoom) {
            setSelectedRoom(initSelectedRoom);
        }
    }, [listRoom, selectedRoom, initSelectedRoom]);

    const listRoomRef = useRef(null);
    useEffect(() => {
        if (JSON.stringify(listRoomRef.current) !== JSON.stringify(listRoom)) {
            listRoomRef.current = listRoom;
            console.log(listRoom);
        }
    }, [listRoom]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (selectedRoom) {
            dispatch(actions.fetchAllDeviceInRoom(companyId, selectedRoom.value));
        }
    }, [dispatch, companyId, selectedRoom]);
    useEffect(() => {
        if (selectedRoom && selectedDevice) {
            onValue(
                child(dbRef, getPathStatusDeviceFirebase(companyId, selectedRoom.value, selectedDevice.value)),
                (snapshot) => {
                    const dataFb = snapshot.val();
                    setStatusDevicce(dataFb);
                },
            );
        }
    }, [selectedRoom, selectedDevice, companyId]);
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
    const handleChangeRoom = (value) => {
        setSelectedRoom(value);
    };
    const handleChangeDevice = (value) => {
        setSelectedDevice(value);
    };
    const valuePrev = useRef(null);
    useEffect(() => {
        if (listDevice && listDevice.length > 0) {
            if (listDevice[0].value === valuePrev.current) {
                return;
            } else {
                valuePrev.current = listDevice[0].value;
                handleChangeDevice(listDevice[0]);
            }
        }
    }, [selectedRoom, listDevice]);
    const handleCallApi = useCallback(
        async (type, valueDate) => {
            if (selectedDevice && selectedRoom) {
                let response = await handleGetStatusDevice(
                    companyId,
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
        [companyId, selectedRoom, selectedDevice],
    );

    useEffect(() => {
        switch (timeMode) {
            case 'yesterday':
                handleCallApi('date', getTime(startOfDay(sub(new Date(), { days: 1 }))));
                break;
            case 'today':
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
            <button
                className={cx('item', 'item-range', { active: timeMode === 'range' ? true : false })}
                onClick={onClick}
                ref={ref}
            >
                {value}
            </button>
        );
    });
    let labelStatusDevice = listStatus && listStatus.find((elment) => elment.keyMap === statusDevicce);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Device Monitor</h2>
            <div className={cx('select-location', 'row')}>
                <Select
                    className="col c-5 m-4 l-4"
                    value={selectedRoom}
                    onChange={(event) => handleChangeRoom(event)}
                    options={listRoom}
                />
                <Select
                    className="col c-5 m-4 l-4"
                    value={selectedDevice}
                    onChange={(event) => handleChangeDevice(event)}
                    options={listDevice}
                />
            </div>
            <div className={cx('status-device')}>
                <h4 className={cx('head-content')}>Current device status</h4>
                <div className={cx('status-content')}>
                    <div className={cx('status-light')}>
                        <div className={cx({ on: statusDevicce === 'S1' ? true : false })}></div>
                        <div className={cx({ error: statusDevicce === 'S3' ? true : false })}></div>
                        <div className={cx({ off: statusDevicce === 'S2' ? true : false })}></div>
                    </div>
                    <div className={cx('staust-name')}>
                        Status :{' '}
                        <p>
                            {labelStatusDevice &&
                                (language === LANGUAGES.VI ? labelStatusDevice.valueVI : labelStatusDevice.valueEN)}
                        </p>
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
                        className={cx('item', { active: timeMode === 'today' ? true : false })}
                        onClick={() => handleSelectTimeMode('today')}
                    >
                        Today
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
                    <div>
                        <CustomDatePicker
                            selected={selectedDate}
                            onChange={(date, type) => handleChangeDatePicker(date, type)}
                            typeShow={'range'}
                            maxDate={startOfDay(new Date()).getTime()}
                            customInput={<CustomInputDatePicker />}
                        />
                    </div>
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
