import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { handleCreateNewDevice, handleGetLocation } from '~/services/deviceService';
import styles from './AddDevice.module.scss';

const cx = classNames.bind(styles);
const url = process.env.REACT_APP_API_URL;

function AddDevice() {
    const [modeLocation, setModeLocation] = useState();
    const [listLocation, setListLocation] = useState([]);
    const [message, setMessage] = useState();
    const [errCode, setErrCode] = useState(0);
    const userId = JSON.parse(localStorage.getItem('user')).userInfo.id ||0;
    useEffect(() => {
        async function fetchData() {
            const response = await handleGetLocation(userId);
            if (response.errCode === 0) {
                setListLocation(response.data);
            }
        }
        fetchData();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        let { deviceName, deviceType, location } = document.forms[0];
        if (modeLocation === 'available') {
            let data = {
                deviceName: deviceName.value,
                deviceType: deviceType.value,
                locationID: +location.value,
                mode: modeLocation,
                userId: userId,
            };
            let response = await handleCreateNewDevice(data);
            if (response.errCode === 0) {
                setMessage(response.message);
                setErrCode(0);
            }
            if (response.errCode !== 0) {
                setMessage(response.message);
                setErrCode(1);
            }
        } else {
            let data = {
                deviceName: deviceName.value,
                deviceType: deviceType.value,
                location: location.value,
                mode: modeLocation,
                userId: userId,
            };
            let response = await handleCreateNewDevice(data);
            if (response.errCode === 0) {
                setMessage(response.message);
                setErrCode(0);
            }
            if (response.errCode !== 0) {
                setMessage(response.message);
                setErrCode(1);
            }
        }

        // axios
        //     .post(url + '/setDevices/', {
        //         namedevice: deviceName,
        //         location: location,
        //         type: typeDevice,
        //     })
        //     .then((res) => {
        //         setError(res.data.status);
        //         setMessage(res.data.msg);
        //         alert(res.data.msg);
        //     });
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}> Add New Devices</h2>
            <form method="post" className={cx('form')}>
                <div className={cx('form-group')}>
                    <label forhtml="deviceName" className={cx('form-label')}>
                        Tên Thiết bị
                    </label>
                    <input
                        name="deviceName"
                        placeholder="Ex: Lights"
                        type="text"
                        className={cx('form-input', 'input')}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label forhtml="device-type" className={cx('form-label')}>
                        Loại thiết bị
                    </label>
                    <input
                        name="deviceType"
                        placeholder="Ex: Sensor"
                        type="text"
                        className={cx('form-input', 'input')}
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
                            value="available"
                            onChange={(e) => setModeLocation(e.target.value)}
                        />
                        <label htmlFor="radio1">Vị trí có sẵn</label>
                    </div>
                    {modeLocation === 'available' && (
                        <div className={cx('select-wrapper')}>
                            <select
                                // value={location}
                                className={cx('select-location')}
                                name="location"
                                id="location"
                            >
                                <option value={0}> Select...</option>
                                {listLocation.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.location}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className={cx('inputGroup')}>
                        <input
                            className={cx('input')}
                            name="mode"
                            type="radio"
                            id="radio2"
                            value="new"
                            onChange={(e) => setModeLocation(e.target.value)}
                        />
                        <label htmlFor="radio2">Vị trí mới</label>
                    </div>
                    {modeLocation === 'new' && (
                        <span className={cx('location-input')}>
                            <input
                                name="location"
                                placeholder="Ex: Work Shop 1"
                                type="text"
                                className={cx('form-input', 'input')}
                                // value={location}
                                // onChange={(e) => setLocationID(e.target.value)}
                            />
                        </span>
                    )}
                </div>
                <div className={cx('message', errCode ? 'err' : 'success')}>{message}</div>
                <button
                    name="submit"
                    value="Add device"
                    type="submit"
                    className={cx('form-submit')}
                    onClick={handleSubmit}
                >
                    Thêm
                </button>
            </form>
        </div>
    );
}

export default AddDevice;
