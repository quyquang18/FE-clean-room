import classNames from 'classnames/bind';
import { child, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

import { handleGetStatusDevice } from '~/services/deviceService';
import PieChart from '~/components/PieChart';
import Table from '~/components/Table';
import styles from './DeviceMonitor.module.scss';
import { database } from '~/fribase';
import SelectLocation from '~/components/SelectLocation';
import SelectDevice from '~/components/SelectDevice';
const cx = classNames.bind(styles);
const dbRef = ref(database);
function DeviceMonitor() {
    document.title = 'LUXAS-Device Monitor';
    const userId = JSON.parse(localStorage.getItem('user')).userInfo.id || 0;
    const [message, setMessage] = useState();
    const [errCode, setErrCode] = useState(0);
    const [locationDeviceId, setLocationDeviceId] = useState(null);
    const [locationDeviceName, setLocationDeviceName] = useState(null);
    const [deviceId, setDeviceId] = useState('null');
    const [deviceName, setDeviceName] = useState('null');
    const [statusDevicce, setStatusDevicce] = useState('');
    const [timeMode, setTimeMode] = useState('yesterday');
    const [timePeriod, SetTimePeriod] = useState({
        from: '',
        to: '',
    });
    const handleSelectLocation = (value) => {
        setLocationDeviceId(value.locationId);
        setLocationDeviceName(value.locationName);
    };
    const handleSelectDevice = (value) => {
        setDeviceId(value.deviceId);
        setDeviceName(value.deviceName);
    };
    const handleDataTable = (inputDataFromCallApi) => {
        let data = inputDataFromCallApi.map((item) => {
            // let statusTime = countStatusTime(item.date, item.stateStartTime, item.stateEndTime);
            return { ...item, location: locationDeviceName, device: deviceName };
        });
        setDataTable(data);
    };

    const [dataTable, setDataTable] = useState([]);
    const [totalTime, setTotalTime] = useState({ on: '', off: '', error: '' });
    const handleCallApi = async (type, valueDate) => {
        let response = await handleGetStatusDevice(userId, deviceId, locationDeviceId, type, valueDate);
        if (response.errCode === 0) {
            // setMessage(response.message);
            // setErrCode(0);
            handleDataTable(response.values);
            countTotalTimeStatus(response.values);
        }
        if (response.errCode !== 0) {
            setMessage(response.message);
            setErrCode(1);
        }
    };
    const countTotalTimeStatus = (value) => {
        let timeOn = [],
            timeOff = [],
            timeError = [];

        for (let i = 0; i < value.length; i++) {
            if (value[i].status === 'ON') {
                timeOn.push(value[i].statusTime);
            }
            if (value[i].status === 'OFF') {
                timeOff.push(value[i].statusTime);
            }
            if (value[i].status === 'ERROR') {
                timeError.push(value[i].statusTime);
            }
        }
        setTotalTime({
            on: addTime(timeOn),
            off: addTime(timeOff),
            error: addTime(timeError),
        });
    };
    const addTime = (value = []) => {
        if (value.length > 0) {
            let total;
            let time = [];
            let hour = 0;
            let min = 0;
            let sec = 0;
            for (let i = 0; i < value.length; i++) {
                if (value[i] !== null) {
                    let times = value[i].split(':');
                    hour += parseInt(times[0]);
                    min += parseInt(times[1]);
                    sec += parseInt(times[2]);
                }
            }
            if (min >= 60) {
                hour += Math.floor(min / 60);
                min -= 60;
            }
            if (sec >= 60) {
                min += Math.floor(sec / 60);
                sec -= 60;
            }
            time = [hour, min, sec];
            total = time.join(':');
            return total;
        }
    };
    var today = new Date();
    var yesterday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 1);
    var currentday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var thismonth = today.getMonth() + 1;
    var lastmonth = today.getMonth();

    useEffect(() => {
        handleCallApi('day', yesterday);
    }, [deviceId]);
    useEffect(() => {
        switch (timeMode) {
            case 'yesterday':
                handleCallApi('day', yesterday);
                // handleCallApi('getAll', 'yesterday', yesterday);
                break;
            case 'currentday':
                // handleCallApi('getsum', 'currentday', currentday);
                handleCallApi('day', currentday);
                break;
            case 'thismonth':
                // handleCallApi('getsum', 'thismonth', thismonth);
                handleCallApi('month', thismonth);
                break;
            case 'lastmonth':
                handleCallApi('month', lastmonth);
                break;
            case 'Period':
                break;
            default:
                break;
        }
    }, [timeMode]);
    useEffect(() => {
        onValue(child(dbRef, `statusDevice/${locationDeviceName}/${deviceName}/status`), (snapshot) => {
            const dataFb = snapshot.val();

            setStatusDevicce(dataFb);
        });
    }, [locationDeviceId]);
    // const handlePeriod = () => {
    //     handleCallApi('getsum', 'Period', timePeriod.from, timePeriod.to);
    //     handleCallApi('getAll', 'Period', timePeriod.from, timePeriod.to);
    // };
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Device Monitor</h2>
            <div className={cx('select-location')}>
                <SelectLocation change={handleSelectLocation} />
                {locationDeviceId && <SelectDevice locationId={locationDeviceId} change={handleSelectDevice} />}
            </div>
            <div className={cx('status-device')}>
                <h4 className={cx('head-content')}>Current device status</h4>
                <div className={cx('status-content')}>
                    <div className={cx('status-light')}>
                        <div className={cx({ on: statusDevicce === 'on' ? true : false })}></div>
                        <div className={cx({ error: statusDevicce === 'error' ? true : false })}></div>
                        <div className={cx({ off: statusDevicce === 'off' ? true : false })}></div>
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
                        onClick={() => setTimeMode('yesterday')}
                    >
                        Yesterday
                    </button>
                    <button
                        className={cx('item', { active: timeMode === 'currentday' ? true : false })}
                        onClick={() => setTimeMode('currentday')}
                    >
                        CurrentDay
                    </button>

                    <button
                        className={cx('item', { active: timeMode === 'thismonth' ? true : false })}
                        onClick={() => setTimeMode('thismonth')}
                    >
                        This Month
                    </button>
                    <button
                        className={cx('item', { active: timeMode === 'lastmonth' ? true : false })}
                        onClick={() => setTimeMode('lastmonth')}
                    >
                        Last Month
                    </button>
                    <span
                        className={cx('item', { active: timeMode === 'Period' ? true : false })}
                        onClick={() => setTimeMode('Period')}
                    >
                        <>
                            <input
                                onChange={(e) => SetTimePeriod((prev) => ({ ...prev, from: e.target.value }))}
                                className={cx('input-time')}
                                type="date"
                            />
                            <label style={{ margin: '0 6px', fontSize: '1.4rem' }}>To</label>
                            <input
                                type="date"
                                placeholder="dd-mm-yyyy"
                                onChange={(e) => SetTimePeriod((prev) => ({ ...prev, to: e.target.value }))}
                                className={cx('input-time')}
                            />
                            <button
                                // onClick={handlePeriod}
                                className={cx('btn-select')}
                            >
                                OK
                            </button>
                        </>
                    </span>
                </div>
                <PieChart data={totalTime} type={timeMode} valuePeriod={timePeriod} />
                <div className={cx('list-status')}>
                    <h2 className={cx('head-content')}>Status List</h2>
                    <Table data={dataTable} type="value-status" />
                </div>
            </div>
        </div>
    );
}

export default DeviceMonitor;
