import classNames from 'classnames/bind';
import axios from 'axios';
import { useState, useEffect } from 'react';

import styles from './Devices.module.scss';
import { LocationIcon } from '~/components/Icons';
import AirConditioner from './AriConditioner';
import Fan from './Fan';
import Light from './Light';
import HeaderDashboard from '../HeaderDashboard';

const cx = classNames.bind(styles);

const url = process.env.REACT_APP_API_URL;

function Devices() {
    // const [modelocation, setModeLocation] = useState();

    const [deviceName, setDeviceName] = useState('');
    const [location, setLocation] = useState([]);
    const [typeDevice, setTypeDevice] = useState('null');

    const callApi = () => {
        axios
            .post(url + '/getDevices', {
                action: deviceName,
                location: location,
                type: typeDevice,
            })
            .then(function (response) {
                setLocation(response.data.valueSensor);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        axios
            .post(url + '/getDevices', {
                action: 'getLocation',
            })
            .then(function (response) {
                setLocation(response.data);
                var arrLocation = [];
                const dataReturn = response.data.location;
                dataReturn.forEach((element) => {
                    arrLocation.push(element.location);
                });
                setLocation(arrLocation);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    // console.log(location);
    const handleChangeLocation = (value) => {
        console.log(value);
    };
    return (
        <div className={cx('wrapper')}>
            <HeaderDashboard change={handleChangeLocation} location={location} />
            <span className={cx('header')}>
                <LocationIcon className={cx('header-icon')} />
                <h2 className={cx('device-name')}>Work Shop 1</h2>
            </span>
            <div className={cx('row')}>
                <div className={cx('wrapper-conditioner')}>
                    <span className={cx('content')}>
                        <AirConditioner name="Ari Conditioning 1" />
                        <AirConditioner name="Ari Conditioning 2" />
                    </span>
                </div>
                <div className={cx('wrapper-conditioner')}>
                    <span className={cx('content')}>
                        <Fan name="Fan 1" />
                        <Fan name="Fan 2" />
                        <Fan name="Fan 3" />
                    </span>
                </div>
                <div className={cx('wrapper-conditioner')}>
                    <span className={cx('content')}>
                        <Light name="Light 1" />
                        <Light name="Light 2" />
                        <Light name="Light 3" />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Devices;
