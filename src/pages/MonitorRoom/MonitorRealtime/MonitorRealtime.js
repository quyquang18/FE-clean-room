import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { ref, child, get } from 'firebase/database';
import { FormattedMessage } from 'react-intl';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { format } from 'date-fns';

import { database } from '~/firebase';
import styles from './MonitorRealtime.module.scss';
import { CloseIcon, ControlerIcon, StartIcon, StopIcon } from '~/components/Icons';
import FanControler from '~/pages/MonitorControler/FanControler';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function MonitorRealtime({ roomId, companyId }) {
    var dataSeeChar = [];

    const [status, setStatus] = useState({ type: 'stop', activeStop: true, activeStart: false });
    const [inputSample, setInputSample] = useState(1);
    const [sample, setSample] = useState(1);
    const statusRef = useRef(null);

    const [temp, setTemp] = useState([]);
    const [humi, setHumi] = useState([]);
    const [dust2_5, setDust2_5] = useState([]);
    const [dust10, setDust10] = useState([]);
    const [differPress, setDifferPress] = useState([]);
    const [realTime, setRealTime] = useState([]);
    const [oxy, setOxy] = useState([]);
    const dbRef = ref(database);
    const [maxValueSensor, setMaxValueSensor] = useState(100);
    const handleStart = () => {
        setStatus({ value: 'start', activeStop: false, activeStart: true });

        if (sample) {
            statusRef.current = setInterval(() => {
                get(child(dbRef, `${companyId}/${roomId}/valueSensor`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            let currentTime = format(new Date(), 'mm:ss.SSS');
                            setTemp((prev) => [...prev, Number(snapshot.val().temperature)]);
                            setHumi((prev) => [...prev, Number(snapshot.val().humidity)]);
                            setDust2_5((prev) => [...prev, Number(snapshot.val().dust_pm_25)]);
                            setDust10((prev) => [...prev, Number(snapshot.val().dust_pm_10)]);
                            setDifferPress((prev) => [...prev, Number(snapshot.val().dif_pressure)]);
                            setOxy((prev) => [...prev, Number(snapshot.val().oxy)]);
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
        if (temp.length > 10) {
            temp.shift();
            humi.shift();
            dust2_5.shift();
            dust10.shift();
            differPress.shift();
            oxy.shift();
            realTime.shift();
        }
    }, [temp, humi, dust2_5, dust10, differPress, oxy, realTime]);

    const seriesChart = () => {
        dataSeeChar.push({
            name: 'Temperature',
            data: temp,
            color: '#990000',
        });
        dataSeeChar.push({
            name: 'Humidity',
            data: humi,
            color: '#990000',
        });
        dataSeeChar.push({
            name: 'Dust 2.5',
            data: dust2_5,
            color: '#6699FF',
        });
        dataSeeChar.push({
            name: 'Dust 10',
            data: dust10,
            color: '#FFCC33',
        });

        dataSeeChar.push({
            name: 'Differential Press',
            data: differPress,
            color: '#006699',
        });

        dataSeeChar.push({
            name: 'Oxygen',
            data: oxy,
            color: '#EA18C1',
        });
        return dataSeeChar;
    };

    const renderChart = () => {
        return (
            <HighchartsReact
                // key={item.id}
                highcharts={Highcharts}
                options={{
                    chart: {
                        type: 'line',
                        reflow: true,
                        events: {
                            render(event) {
                                var seriesIndex = this.index;
                                var series = this.series;
                                let dataSensorMax = 0;
                                for (var i = 0; i < series.length; i++) {
                                    if (series[i].index !== seriesIndex) {
                                        if (series[i].visible) {
                                            if (series[i].dataMax && series[i].dataMax > dataSensorMax) {
                                                dataSensorMax = series[i].dataMax;
                                            }
                                        }
                                        //         // series[i].visible ? series[i].hide() : series[i].show();
                                    }
                                }
                                setMaxValueSensor(dataSensorMax + 10);
                            },
                        },
                        // styledMode: true,
                    },
                    title: {
                        text: `Chart RealTime - ${sample * 1000} (ms)`,
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
                        gridLineWidth: 1,
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
                            min: 0,
                            max: maxValueSensor || 100,
                        },
                    ],
                    legend: {
                        align: 'left',
                        verticalAlign: 'top',
                        borderWidth: 0,
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true,
                            },
                            color: '#ffff',
                            // enableMouseTracking: false,
                        },
                        series: {
                            events: {
                                show: function (event) {
                                    var seriesIndex = this.index;
                                    console.log(this);
                                    var series = this.chart.series;
                                    let dataSensorMax = 0;
                                    for (var i = 0; i < series.length; i++) {
                                        if (series[i].index !== seriesIndex) {
                                            if (series[i].visible) {
                                                if (series[i].dataMax && series[i].dataMax > dataSensorMax) {
                                                    dataSensorMax = series[i].dataMax;
                                                }
                                            }
                                            //         // series[i].visible ? series[i].hide() : series[i].show();
                                        }
                                    }
                                    setMaxValueSensor(dataSensorMax + 10);
                                    // return false;
                                },
                            },
                        },
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
        const isNumber = !isNaN(value);
        if (isNumber) {
            setInputSample(value);
        }
    };
    const addValueSample = () => {
        const isNumber = !isNaN(inputSample);
        if (isNumber) {
            if (inputSample < 0.2) {
                toast.warning('It is recommended to set the sampling time value above 200ms');
                setInputSample(0.2);
                setSample(0.2);
            } else {
                setSample(inputSample);
            }
        } else {
            toast.error('Please enter the correct number format');
        }
    };

    useEffect(() => {
        setDust10([]);
        setHumi([]);
        setTemp([]);
        setDifferPress([]);
        setDust2_5([]);
        setOxy([]);
        setRealTime([]);
        handleStop();
    }, [roomId]);
    return (
        <>
            <div className={cx('row', 'content-control')}>
                <div className={cx('col c-8 m-3 l-3')}>
                    <div className={cx('sample')}>
                        <h2 className={cx('head')}>
                            <FormattedMessage id="monitor-room.monitor-realtime.sample" />
                        </h2>
                        <div className={cx('set-input')}>
                            <input
                                disabled={status.activeStart}
                                onChange={(e) => {
                                    handleOnchangeSample(e.target.value);
                                }}
                                value={inputSample}
                                className={cx('input')}
                                type="text"
                            />
                            <label className={cx('unit')}>( s )</label>
                            <button onClick={addValueSample} className={cx('btn')}>
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('col c-2 m-6 l-6')}>
                    <div className={cx('status')}>
                        <span
                            className={cx('start', {
                                active: status.activeStart,
                            })}
                            onClick={handleStart}
                        >
                            <StartIcon className={cx('icon')} />
                            <FormattedMessage id="monitor-room.monitor-realtime.start" />
                        </span>
                        <span
                            className={cx('stop', {
                                active: status.activeStop,
                            })}
                            onClick={handleStop}
                        >
                            <StopIcon className={cx('icon')} />
                            <FormattedMessage id="monitor-room.monitor-realtime.stop" />
                        </span>
                    </div>
                </div>
                <div className={cx('col c-2 m-3 l-3')}>
                    <div className={cx('fan-control')}>
                        <input
                            className={cx('input-set-open-fan-control')}
                            type="checkbox"
                            id="setOpenFanControl"
                        ></input>
                        <label htmlFor="setOpenFanControl">
                            <span className={cx('dashboard')}>
                                <ControlerIcon />
                                <p>Dashboard</p>
                            </span>
                        </label>
                        <div className={cx('wrapper-fan-controler')}>
                            <span className={cx('head-control')}>
                                <p>Controler</p>
                                <label htmlFor="setOpenFanControl">
                                    <span className={cx('icon-close')}>
                                        <CloseIcon width="2.0rem" height="2.0rem" color="#C9B8D2" fontWeight={4} />
                                    </span>
                                </label>
                            </span>
                            <FanControler roomId={roomId && roomId} companyId={companyId && companyId} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('wrapper-content', 'row')}>
                <div className={cx('chart', 'col l-12 m-12 c-12')}>{renderChart()}</div>
            </div>
        </>
    );
}

export default MonitorRealtime;
