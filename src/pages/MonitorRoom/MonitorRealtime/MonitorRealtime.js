import classNames from 'classnames/bind';
import { MdNotStarted } from 'react-icons/md';
import { IoStopCircle } from 'react-icons/io5';
import { useState, useRef, useEffect } from 'react';
import { ref, child, get } from 'firebase/database';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import { database } from '~/fribase';

import styles from './MonitorRealtime.module.scss';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

function MonitorRealtime({ roomId }) {
    var dataSeeChar = [];

    const [listIsDisplay, setListIsDisplay] = useState([
        {
            id: 0,
            key: 'all',
            name: 'All',
            init: '',
            color: '',
            isCheck: false,
        },
        {
            id: 1,
            key: 'Temperature',
            name: 'Temperature',
            init: '(℃)',
            color: '#990000',
            isCheck: false,
        },
        {
            id: 2,
            key: 'Humidity',
            name: 'Humidity',
            init: '(%)',
            color: '#00FF00',
            isCheck: false,
        },
        {
            id: 3,
            key: 'Dust_2.5',
            name: 'Dust 2.5',
            init: '(µm)',
            color: '#6699FF',
            isCheck: false,
        },
        {
            id: 4,
            key: 'Dust_10',
            name: 'Dust 10',
            init: '(µm)',
            color: '#FFCC33',
            isCheck: false,
        },
        {
            id: 5,
            key: 'PressureIn',
            name: 'Pressure In',
            init: '(kPa)',
            color: '#006699',
            isCheck: false,
        },
        {
            id: 6,
            key: 'PressureOut',
            name: 'Pressure Out',
            init: '(kPa)',
            color: '#000011',
            isCheck: false,
        },
        {
            id: 7,
            key: 'Oxygen',
            name: 'Oxygen',
            init: '(%)',
            color: '#011011',
            isCheck: false,
        },
    ]);

    const [status, setStatus] = useState({ type: 'stop', activeStop: true, activeStart: false });
    const [inputSample, setInputSample] = useState(5);
    const [sample, setSample] = useState(5);
    const statusRef = useRef(null);

    const [temp, setTemp] = useState([]);
    const [humi, setHumi] = useState([]);
    const [dust2_5, setDust2_5] = useState([]);
    const [dust10, setDust10] = useState([]);
    const [pressIn, setPressIn] = useState([]);
    const [pressOut, setPressOut] = useState([]);
    const [realTime, setRealTime] = useState([]);
    const dbRef = ref(database);
    const handleStart = () => {
        setStatus({ value: 'start', activeStop: false, activeStart: true });

        statusRef.current = setInterval(() => {
            get(child(dbRef, `valueSensor/${roomId}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let currentTime = format(new Date(), 'HH:MM:ss');
                        setTemp((prev) => [...prev, Number(snapshot.val().Temperature)]);
                        setHumi((prev) => [...prev, Number(snapshot.val().Humidity)]);
                        setDust2_5((prev) => [...prev, Number(snapshot.val().Dust_2_5)]);
                        setDust10((prev) => [...prev, Number(snapshot.val().Dust_10)]);
                        setPressIn((prev) => [...prev, Number(snapshot.val().PressureIn)]);
                        setPressOut((prev) => [...prev, Number(snapshot.val().PressureOut)]);
                        setRealTime((prev) => [...prev, currentTime]);
                    } else {
                        console.log('No data available');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }, sample * 1000);
        return () => {
            clearInterval(statusRef.current);
        };
    };

    const handleStop = () => {
        setStatus({ value: 'stop', activeStop: true, activeStart: false });
        clearInterval(statusRef.current);
    };
    useEffect(() => {
        if (temp.length > 6) {
            temp.shift();
            humi.shift();
            dust2_5.shift();
            dust10.shift();
            pressIn.shift();
            pressOut.shift();
            realTime.shift();
        }
    }, [temp, humi, dust2_5, dust10, pressIn, pressOut, realTime]);
    const handleChangeCheckboxs = (id) => {
        setListIsDisplay((prev) => {
            if (id === 0) {
                if (!prev[0].isCheck) {
                    return prev.map((item) => {
                        return { ...item, isCheck: true };
                    });
                } else {
                    return prev.map((item) => {
                        return { ...item, isCheck: false };
                    });
                }
            } else {
                return prev.map((item) => {
                    if (item.id === id) {
                        return { ...item, isCheck: !item.isCheck };
                    } else {
                        return { ...item };
                    }
                });
            }
        });
    };
    const seriesChart = () => {
        for (let i = 0; i < listIsDisplay.length; i++) {
            if (listIsDisplay[i].isCheck) {
                if (listIsDisplay[i].key !== 'all') {
                    switch (listIsDisplay[i].key) {
                        case 'Temperature':
                            dataSeeChar.push({
                                name: 'Temperature',
                                data: temp,
                                color: '#990000',
                            });
                            break;
                        case 'Humidity':
                            dataSeeChar.push({
                                name: 'Humidity',
                                data: humi,
                                color: '#00FF00',
                            });
                            break;
                        case 'Dust_2.5':
                            dataSeeChar.push({
                                name: 'Dust 2.5',
                                data: dust2_5,
                                color: '#6699FF',
                            });
                            break;
                        case 'Dust_10':
                            dataSeeChar.push({
                                name: 'Dust 10',
                                data: dust10,
                                color: '#FFCC33',
                            });
                            break;
                        case 'PressureIn':
                            dataSeeChar.push({
                                name: 'Pressure In',
                                data: pressIn,
                                color: '#006699',
                            });
                            break;
                        case 'PressureOut':
                            dataSeeChar.push({
                                name: 'Pressure Out',
                                data: pressOut,
                                color: '#000011',
                            });
                            break;
                        default:
                            return dataSeeChar;
                    }
                } else {
                    if (!listIsDisplay[i].isCheck) {
                        return (dataSeeChar = []);
                    }
                }
            }
        }
        return dataSeeChar;
    };
    const renderChart = () => {
        return (
            <HighchartsReact
                // key={item.id}
                highcharts={Highcharts}
                options={{
                    chart: {
                        type: 'spline',
                    },
                    title: {
                        text: `Chart RealTime`,
                        style: {
                            fontSize: '18px',
                            fontFamily: 'Times New Roman',
                            color: '#FF6666',
                            letterSpacing: '1.2px',
                            wordSpacing: '2px',
                            fontWeight: '600',
                        },
                    },

                    xAxis: {
                        title: {
                            text: 'Time',
                            style: {
                                fontSize: '1.4rem',
                                fontFamily: 'Times New Roman',
                                color: '#003366',
                                fontWeight: '600',
                                letterSpacing: '1px',
                            },
                        },
                        categories: realTime,
                        crosshair: false,
                        labels: {
                            rotation: 0,
                            style: {
                                fontSize: '11px',
                                fontFamily: 'Verdana, sans-serif',
                                color: '#FFA500',
                            },
                        },
                    },
                    yAxis: [
                        {
                            // left y axis
                            title: {
                                text: 'Value',
                                style: {
                                    fontSize: '1.4rem',
                                    fontFamily: 'Times New Roman',
                                    color: 'item.color',
                                    fontWeight: '600',
                                    letterSpacing: '1px',
                                },
                            },
                            labels: {
                                align: 'left',
                                x: 3,
                                y: 16,
                                format: '{value:.,0f}',
                            },
                            showFirstLabel: false,
                        },
                    ],
                    legend: {
                        align: 'left',
                        verticalAlign: 'top',
                        borderWidth: 0,
                    },
                    series: seriesChart(),
                }}
                containerProps={{ className: cx('chart-container') }}
            />
        );
    };
    const handleOnchangeSample = (value) => {
        if (value < 1) {
            setInputSample(1);
        } else {
            setInputSample(+value);
        }
    };
    const addValueSample = () => {
        setSample(inputSample);
    };

    useEffect(() => {
        setDust10([]);
        setHumi([]);
        setTemp([]);
        setPressIn([]);
        setDust2_5([]);
        setPressOut([]);
    }, [roomId]);
    return (
        <>
            <div className={cx('status')}>
                <span
                    className={cx('start', {
                        active: status.activeStart,
                    })}
                    onClick={handleStart}
                >
                    <MdNotStarted className={cx('icon')} />
                    START
                </span>
                <span
                    className={cx('stop', {
                        active: status.activeStop,
                    })}
                    onClick={handleStop}
                >
                    <IoStopCircle className={cx('icon')} />
                    STOP
                </span>
            </div>
            <div className={cx('wrapper-content')}>
                <div className={cx('select-mode')}>
                    <div className={cx('sample')}>
                        <h2 className={cx('head')}> Sample</h2>
                        <span>
                            <input
                                disabled={status.activeStart}
                                onChange={(e) => {
                                    handleOnchangeSample(e.target.value);
                                }}
                                value={inputSample}
                                className={cx('input')}
                                type="number"
                            />
                            <label className={cx('unit')}>( s )</label>
                            <button onClick={addValueSample} className={cx('btn')}>
                                Ok
                            </button>
                        </span>
                    </div>
                    <div className={cx('select-sensor')}>
                        {listIsDisplay.map((e) => (
                            <span key={e.id} className={cx('wrapper-input')}>
                                <input
                                    type="checkbox"
                                    checked={e.isCheck}
                                    className={cx('option-input')}
                                    value={e.key}
                                    onChange={() => handleChangeCheckboxs(e.id)}
                                />
                                <label className={cx('title')}>
                                    {e.name}
                                    <span className={cx('init')}>{e.init}</span>
                                </label>
                            </span>
                        ))}
                    </div>
                    {/* <div className={cx('note')}>
                        {typesensor.map((item) => (
                            <span key={item.id}>
                                <div className={cx('item')}>
                                    <div className={cx('line', item.child.child1.type)}></div>
                                    {item.child.child1.type}
                                </div>
                                <div className={cx('item')}>
                                    <div className={cx('line', item.child.child2.type)}></div>
                                    {item.child.child2.type}
                                </div>
                            </span>
                        ))}
                    </div> */}
                </div>
                <div className={cx('chart')}> {renderChart()}</div>
            </div>
        </>
    );
}

export default MonitorRealtime;
