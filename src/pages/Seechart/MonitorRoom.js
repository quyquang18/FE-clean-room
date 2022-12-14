import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './MonitorRoom.module.scss';
import HightChart from '~/components/HightChart';
import SeeChartlive from './MonitorRealtime';
import Table from '~/components/Table';
import Selects from '~/components/SelectLocation';
import { LocationIcon } from '~/components/Icons';
import StatisticalTables from './StatisticalTables';

const cx = classNames.bind(styles);

const optionsTime = [
    { value: 'null', label: 'Choose a time period' },
    { value: 'date', label: 'By Date' },
    { value: 'month', label: 'By Monthly' },
    { value: 'period', label: 'By time period' },
];
var optionDisplay = [
    { type: 'current', label: 'Monitor RealTime', active: true },
    { type: 'old', label: 'Monitor Old', active: false },
];
function Seechart() {
    const [mode, setMode] = useState('null');
    const [valueTimeFrom, setValueTimeFrom] = useState(null);
    const [valueTimeTo, setValueTimeTo] = useState(null);
    const [typeSee, setTypeSee] = useState({ char: false, table: false });
    const [display, setDisplay] = useState('current');
    const [data, setData] = useState([]);
    const [location, setLocation] = useState('null');
    const [locationName, setLocationName] = useState();

    document.title = 'LUXAS-Monitor Room';
    useEffect(() => {
        optionDisplay = [
            { type: 'current', label: 'Monitor RealTime', active: true },
            { type: 'old', label: 'Monitor Old', active: false },
        ];
    }, []);
    useEffect(() => {
        setData([]);
    }, [mode]);
    const handleCallApi = () => {
        const url = process.env.REACT_APP_API_URL;
        axios
            .get(url + '/getValueSensor/', {
                params: {
                    type: mode,
                    from: valueTimeFrom,
                    to: valueTimeTo,
                    location: location,
                },
            })
            .then(function (response) {
                setData(response.data.valueSensor);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleSeeTable = () => {
        if (location !== 'null') {
            if (mode === undefined || valueTimeFrom === null) {
                alert('Please choose a viewing time');
            } else {
                setTypeSee({ char: false, table: true });
                handleCallApi();
            }
        } else {
            alert('Please select location');
        }
    };

    const handleSeeChart = () => {
        if (location !== 'null') {
            if (mode === undefined || valueTimeFrom === null) {
                alert('Vui lòng chọn thời gian xem');
            } else {
                setTypeSee({ char: true, table: false });
                handleCallApi();
            }
        } else {
            alert('Please select location');
        }
    };
    const handleSelectLocation = (value) => {
        setLocation(value.locationId);
        setLocationName(value.locationName);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('select-location')}>
                <Selects change={handleSelectLocation} />
            </div>
            <span className={cx('header')}>
                <LocationIcon className={cx('header-icon')} />
                <h2 className={cx('device-name')}>
                    {!locationName ? 'location has not been selected yet' : locationName}
                </h2>
            </span>
            <div className={cx('display-list')}>
                {optionDisplay.map((e, index) => (
                    <span
                        className={cx('list', { active: e.active })}
                        key={index}
                        value={display}
                        onClick={() => {
                            setDisplay(e.type);
                            optionDisplay.map((e) => {
                                return (e.active = false);
                            });
                            optionDisplay[index].active = true;
                        }}
                    >
                        {e.label}
                    </span>
                ))}
            </div>
            {display === 'current' && <SeeChartlive location={location} />}
            {display === 'old' && (
                <>
                    <div className={cx('select-wrapper')}>
                        <div className={cx('select-mode')}>
                            <select
                                value={mode}
                                className={cx('select-date')}
                                onChange={(e) => {
                                    setMode(e.target.value);
                                }}
                            >
                                {optionsTime.map((e, index) => (
                                    <option key={index} value={e.value}>
                                        {e.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('select-time')}>
                            {(mode === 'date' || mode === 'month') && (
                                <input
                                    className={cx('input-time')}
                                    type={mode}
                                    value={valueTimeFrom}
                                    onChange={(e) => {
                                        setValueTimeFrom(e.target.value);
                                    }}
                                />
                            )}
                            {mode === 'period' && (
                                <>
                                    <input
                                        className={cx('input-time')}
                                        type="date"
                                        value={valueTimeFrom}
                                        onChange={(e) => {
                                            setValueTimeFrom(e.target.value);
                                        }}
                                    />
                                    <label style={{ margin: '16px', fontSize: '1.4rem' }}>đến</label>
                                    <input
                                        className={cx('input-time')}
                                        type="date"
                                        value={valueTimeTo}
                                        onChange={(e) => {
                                            setValueTimeTo(e.target.value);
                                        }}
                                    />
                                </>
                            )}
                            {mode === 'null' && <p style={{ color: 'red' }}> Please select the view mode !!!</p>}
                        </div>
                        <div>
                            <button className={cx('btn-see')} onClick={handleSeeChart}>
                                See Chart
                            </button>
                            <button className={cx('btn-see')} onClick={handleSeeTable}>
                                See Table
                            </button>
                        </div>
                    </div>
                    {typeSee.char && (
                        <HightChart data={data} mode={mode} valueTimeFrom={valueTimeFrom} valueTimeTo={valueTimeTo} />
                    )}
                    {typeSee.table && (
                        <>
                            <StatisticalTables data={data} />
                            <Table data={data} />
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Seechart;
