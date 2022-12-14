import classNames from 'classnames/bind';
import { MdNotStarted } from 'react-icons/md';
import { IoStopCircle } from 'react-icons/io5';
import { useState, useRef, useEffect } from 'react';
import { ref, child, get } from 'firebase/database';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import { database } from '~/fribase';

import styles from './MonitorRealtime.module.scss';

const cx = classNames.bind(styles);

function SeeChartLive({ location }) {
    const [typesensor, setTypeSensor] = useState([
        {
            id: 0,
            key: 'temp-humi',
            type: 'temperature',
            data: [
                { data: [], name: 'temp' },
                { data: [], name: 'humi' },
            ],
            child: {
                child1: {
                    type: 'Temperature',
                    name: 'Temperature (℃)',
                    colorLine: '#990000',
                },
                child2: {
                    type: 'Humidity',
                    name: 'Humidity (%)',
                    colorLine: '#00FF00',
                },
            },
            title: 'Show Temp-Humid',
            check: true,
        },
        {
            id: 1,
            type: 'dust',
            key: 'dust',
            data: [{ data: [3, 4, 5], name: 'dust' }],
            dataTime: [],
            child: {
                child1: {
                    type: 'Dust_2_5',
                    name: 'Dust 2.5 (µm)',
                    colorLine: '#6699FF',
                },
                child2: {
                    type: 'Dust_10',
                    name: 'Dust 10 (µm)',
                    colorLine: '#FFCC33',
                },
            },
            title: 'Show Dust',
            check: false,
        },
        {
            id: 2,
            key: 'pressure',
            type: 'pressure',
            data: [],
            child: {
                child1: {
                    type: 'PressureIn',
                    name: 'Pressure In (kPa)',
                    colorLine: '#006699',
                },
                child2: {
                    type: 'PressureOut',
                    name: 'Pressure Out (kPa)',
                    colorLine: '#000011',
                },
            },
            title: 'Show Pressu',
            check: false,
        },
        {
            id: 3,
            key: 'pressure',
            type: 'pressure',
            data: [],
            child: {
                child1: {
                    type: 'PressureIn',
                    name: 'All',
                    colorLine: '#006699',
                },
                child2: {
                    type: 'PressureOut',
                    name: '',
                    colorLine: '#000011',
                },
            },
            title: 'Show all in chart',
            check: false,
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
        if (location === 'null') {
            alert('Please select a location to view');
        } else {
            setStatus({ value: 'start', activeStop: false, activeStart: true });

            statusRef.current = setInterval(() => {
                get(child(dbRef, `valueSensor/${location}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            var today = new Date();
                            var currentTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

                            setTemp((prev) => [...prev, Number(snapshot.val().temperature)]);
                            setHumi((prev) => [...prev, Number(snapshot.val().humidity)]);
                            setDust2_5((prev) => [...prev, Number(snapshot.val().dust2_5)]);
                            setDust10((prev) => [...prev, Number(snapshot.val().dust10)]);
                            setPressIn((prev) => [...prev, Number(snapshot.val().pressure_in)]);
                            setPressOut((prev) => [...prev, Number(snapshot.val().pressure_out)]);
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
        }
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
        setTypeSensor((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    return { ...item, check: !item.check };
                } else {
                    return { ...item };
                }
            });
        });
    };
    const seriesChart = (key) => {
        switch (key) {
            case 'temp-humi':
                return [
                    {
                        name: 'Temperature',
                        data: temp,
                        color: '#990000',
                    },
                    {
                        name: 'Humidity',
                        data: humi,
                        color: '#00FF00',
                    },
                ];
            case 'dust':
                return [
                    {
                        name: 'Dust 2.5',
                        data: dust2_5,
                        color: '#6699FF',
                    },
                    {
                        name: 'Dust 10',
                        data: dust10,
                        color: '#FFCC33',
                    },
                ];
            case 'pressure':
                return [
                    {
                        name: 'Press In',
                        data: pressIn,
                        color: '#006699',
                    },
                    {
                        name: 'Press Out',
                        data: pressOut,
                        color: '#000011',
                    },
                ];
            default:
                return;
        }
    };

    const renderChart = () => {
        return typesensor.map((item) => {
            if (item.check) {
                return (
                    <HighchartsReact
                        key={item.id}
                        highcharts={Highcharts}
                        options={{
                            chart: {
                                type: 'spline',
                            },
                            title: {
                                text: `Chart RealTime ${item.child.child1.name} / ${item.child.child2.name} `,
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
                                        text: item.child.child1.name,
                                        style: {
                                            fontSize: '1.4rem',
                                            fontFamily: 'Times New Roman',
                                            color: item.child.child1.colorLine,
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
                                {
                                    // right y axis
                                    linkedTo: 0,
                                    gridLineWidth: 0,
                                    opposite: true,
                                    title: {
                                        text: item.child.child2.name,
                                        style: {
                                            fontSize: '1.4rem',
                                            fontFamily: 'Times New Roman',
                                            color: item.child.child2.colorLine,
                                            fontWeight: '600',
                                            letterSpacing: '1px',
                                        },
                                    },
                                    labels: {
                                        align: 'right',
                                        x: -3,
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

                            series: seriesChart(item.key),
                        }}
                        containerProps={{ className: cx('chart-container') }}
                    />
                );
            } else {
                return null;
            }
        });
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
    }, [location]);
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
                        {typesensor.map((e) => (
                            <span key={e.id} className={cx('wrapper-input')}>
                                <input
                                    type="checkbox"
                                    defaultChecked={e.check}
                                    className={cx('option-input')}
                                    value={e.value}
                                    onClick={() => handleChangeCheckboxs(e.id)}
                                />
                                <label className={cx('title')}>{e.title}</label>
                            </span>
                        ))}
                    </div>
                    <div className={cx('note')}>
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
                    </div>
                </div>
                <div className={cx('chart')}> {renderChart()}</div>
            </div>
        </>
    );
}

export default SeeChartLive;
