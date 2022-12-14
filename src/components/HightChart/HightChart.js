import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import exporting from 'highcharts/modules/exporting';
import fullscreen from 'highcharts/modules/full-screen';

import styles from './HightChart.module.scss';

exporting(Highcharts);
fullscreen(Highcharts);

const cx = classNames.bind(styles);

const optionsModule = [
    { type: 'all', label: 'All', active: true },
    { type: 'temp-humi', label: 'Temper-Humi', active: false },
    { type: 'dust', label: 'Dust', active: false },
    { type: 'pressure', label: 'Pressure ', active: false },
];

function HightChart({ data = [], mode, valueTimeFrom, valueTimeTo }) {
    const [typesensor, setTypeSensor] = useState('all');
    const [statusResultApi, setStatusResultApi] = useState(true);
    const [newData, setNewData] = useState({
        temper: {
            value: [],
        },
        humi: {
            value: [],
        },
        dust2_5: {
            value: [],
        },
        dust10: {
            value: [],
        },
        pressIn: {
            value: [],
        },
        pressOut: {
            value: [],
        },
        times: {
            value: [],
        },
        dates: {
            value: [],
        },
    });

    useEffect(() => {
        var dataDraw = {
            temper: {
                value: [],
            },
            humi: {
                value: [],
            },
            dust2_5: {
                value: [],
            },
            dust10: {
                value: [],
            },
            pressIn: {
                value: [],
            },
            pressOut: {
                value: [],
            },
            times: {
                value: [],
            },
            dates: {
                value: [],
            },
        };
        if (data.length === 0) {
            setStatusResultApi(false);
            dataDraw = {
                temper: {
                    value: [],
                },
                humi: {
                    value: [],
                },
                dust2_5: {
                    value: [],
                },
                dust10: {
                    value: [],
                },
                pressIn: {
                    value: [],
                },
                pressOut: {
                    value: [],
                },
                times: {
                    value: [],
                },
                dates: {
                    value: [],
                },
            };
        } else {
            setStatusResultApi(true);
            data.forEach((item) => {
                dataDraw.temper.value.push(Number(item.temperature));
                dataDraw.humi.value.push(Number(item.humidity));
                dataDraw.dust2_5.value.push(Number(item.dust2_5));
                dataDraw.dust10.value.push(Number(item.dust10));
                dataDraw.pressIn.value.push(Number(item.pressureIn));
                dataDraw.pressOut.value.push(Number(item.pressureOut));
                dataDraw.times.value.push(item.time.slice(0, 5));
                dataDraw.dates.value.push(item.date.split('-')[2] + '-' + item.date.split('-')[1]);
            });
        }
        setNewData(dataDraw);
    }, [data]);
    const datachart = [
        {
            name: 'Temperature (℃)',
            data: newData.temper.value,
        },
        {
            name: 'Humidity (%)',
            data: newData.humi.value,
        },
        {
            name: 'Dust 2.5 (µm)',
            data: newData.dust2_5.value,
        },
        {
            name: 'Dust 10 (µm',
            data: newData.dust10.value,
        },
        {
            name: 'Pressure In (kPa)',
            data: newData.pressIn.value,
        },
        {
            name: 'Pressure Out (kPa)',
            data: newData.pressOut.value,
        },
    ];
    const seriesChart = () => {
        var [temp, humi, dust25, dust10, pressIn, pressOut] = datachart;

        switch (typesensor) {
            case 'all':
                return [temp, humi, dust25, dust10, pressIn, pressOut];
            case 'temp-humi':
                return [
                    temp,
                    humi,
                    (dust25 = {
                        name: '',
                        data: [],
                    }),
                    (dust10 = {
                        name: '',
                        data: [],
                    }),
                    (pressIn = {
                        name: '',
                        data: [],
                    }),
                    (pressOut = {
                        name: '',
                        data: [],
                    }),
                ];
            case 'dust':
                return [
                    (temp = {
                        name: '',
                        data: [],
                    }),
                    (humi = {
                        name: '',
                        data: [],
                    }),
                    dust25,
                    dust10,
                    (pressIn = {
                        name: '',
                        data: [],
                    }),
                    (pressOut = {
                        name: '',
                        data: [],
                    }),
                ];
            case 'pressure':
                return [
                    (dust25 = {
                        name: '',
                        data: [],
                    }),
                    (dust10 = {
                        name: '',
                        data: [],
                    }),
                    (temp = {
                        name: '',
                        data: [],
                    }),
                    (humi = {
                        name: '',
                        data: [],
                    }),
                    pressIn,
                    pressOut,
                ];
            default:
                return;
        }
    };
    const handleActive = (index) => {
        optionsModule.map((e) => {
            return (e.active = false);
        });
        optionsModule[index].active = true;
    };
    const chartConfig = {
        chart: {
            type: 'spline',
        },

        title: {
            text: `Chart ${typesensor}`,
            style: {
                fontSize: '18px',
                fontFamily: 'Times New Roman',
                color: '#32CD32',
                textTransform: 'capitalize',
            },
        },

        subtitle: {
            text: mode + ' ' + valueTimeFrom + (valueTimeTo || ''),
            style: {
                fontSize: '14px',
                fontFamily: 'Times New Roman',
                color: '#00FF00',
            },
        },
        plotOptions: {
            column: {
                stacking: 'normal',
            },
        },
        xAxis: {
            title: {
                text: mode === 'date' ? 'Time' : 'Date',
                style: {
                    fontSize: '1.4rem',
                    fontFamily: 'Times New Roman',
                    color: '#003366',
                    fontWeight: '600',
                    letterSpacing: '1px',
                },
            },
            categories: mode === 'date' ? newData.times.value : newData.dates.value,
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
                    text: seriesChart()[0].name || seriesChart()[2].name || seriesChart()[4].name,
                    style: {
                        fontSize: '1.4rem',
                        fontFamily: 'Times New Roman',
                        color: '#003366',
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
                    text: seriesChart()[1].name || seriesChart()[3].name || seriesChart()[5].name,
                    style: {
                        fontSize: '1.4rem',
                        fontFamily: 'Times New Roman',
                        color: '#003366',
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
        exporting: {
            enabled: true,
            buttons: {
                menuItems: ['viewFullscreen', 'printChart', 'separator', 'downloadPNG', 'downloadJPEG'],
            },
        },
        series: seriesChart(),
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu-mode')}>
                {optionsModule.map((e, index) => (
                    <div
                        key={index}
                        className={cx('option-mode', { active: e.active })}
                        onClick={() => {
                            handleActive(index);
                            setTypeSensor(e.type);
                        }}
                    >
                        {e.label}
                    </div>
                ))}
            </div>
            <div className={cx('content')}>
                {!statusResultApi && (
                    <div className={cx('status-result-api')}>
                        <p>No data available for this time. Please choose another time !!!</p>
                    </div>
                )}
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartConfig}
                    containerProps={{ className: 'chartContainer' }}
                />
            </div>
        </div>
    );
}
export default HightChart;
