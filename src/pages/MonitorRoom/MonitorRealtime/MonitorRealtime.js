import classNames from 'classnames/bind';
import { MdNotStarted } from 'react-icons/md';
import { IoStopCircle } from 'react-icons/io5';
import { useState, useRef, useEffect } from 'react';
import { ref, child, get } from 'firebase/database';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import { database } from '~/firebase';

import styles from './MonitorRealtime.module.scss';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

function MonitorRealtime({ roomId, userId }) {
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
            key: 'DifferentialPress',
            name: 'DifferPress',
            init: '(Pa)',
            color: '#006699',
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
    const [differPress, setDifferPress] = useState([]);
    const [realTime, setRealTime] = useState([]);
    const [oxy, setOxy] = useState([]);
    const dbRef = ref(database);
    const handleStart = () => {
        setStatus({ value: 'start', activeStop: false, activeStart: true });

        statusRef.current = setInterval(() => {
            get(child(dbRef, `${userId}/${roomId}/valueSensor`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let currentTime = format(new Date(), 'HH:MM:ss');
                        setTemp((prev) => [...prev, Number(snapshot.val().Temperature)]);
                        setHumi((prev) => [...prev, Number(snapshot.val().Humidity)]);
                        setDust2_5((prev) => [...prev, Number(snapshot.val().Dust_2_5)]);
                        setDust10((prev) => [...prev, Number(snapshot.val().Dust_10)]);
                        setDifferPress((prev) => [...prev, Number(snapshot.val().DifferPress)]);
                        setOxy((prev) => [...prev, Number(snapshot.val().Oxy)]);
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
            differPress.shift();
            oxy.shift();
            realTime.shift();
        }
    }, [temp, humi, dust2_5, dust10, differPress, oxy, realTime]);
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
                                data: differPress,
                                color: '#006699',
                            });
                            break;
                        case 'Oxygen':
                            dataSeeChar.push({
                                name: 'Oxygen',
                                data: oxy,
                                color: '#EA18C1',
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
                        reflow: true, // Thêm thuộc tính reflow
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
                    responsive: {
                        rules: [
                            {
                                condition: {
                                    maxWidth: 500,
                                },
                                chartOptions: {
                                    legend: {
                                        enabled: false,
                                    },
                                    height: 300,
                                },
                            },
                        ],
                    },
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
        setDifferPress([]);
        setDust2_5([]);
    }, [roomId]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);
    const chartRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const chart = chartRef.current?.chart;
            if (chart) {
                chart.setSize(null, null, false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
            <div className={cx('wrapper-content', 'row')}>
                <div className={cx('chart', 'col l-9 m-12 c-12')}>{renderChart()}</div>
                <div className={cx('select-mode', 'col l-3 m-12 c-12')}>
                    <div className={cx('sample', ' c-8 c-o-2 m-5 l-12')}>
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
                    <div className={cx('select-sensor', 'col c-12 m-12 l-12')}>
                        <div className="row">
                            {listIsDisplay.map((e) => (
                                <span key={e.id} className={cx('wrapper-input', 'row', 'col c-6  m-3 l-12')}>
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default MonitorRealtime;
