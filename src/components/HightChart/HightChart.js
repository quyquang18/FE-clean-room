import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import fullscreen from 'highcharts/modules/full-screen';
import { format, getTime } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import styles from './HightChart.module.scss';

exporting(Highcharts);
fullscreen(Highcharts);

const cx = classNames.bind(styles);

const optionsModule = [
    { type: 'all', label: 'All', active: true },
    { type: 'temp-humi', label: 'Temper-Humi', active: false },
    { type: 'dust', label: 'Dust', active: false },
    { type: 'pressure', label: 'Pressure ', active: false },
    { type: 'oxy', label: 'Oxy ', active: false },
];

function HightChart({ data = [], mode, valueTime, valueTimeTo }) {
    const [typesensor, setTypeSensor] = useState('all');
    const [statusResultApi, setStatusResultApi] = useState(true);
    // const [optionMode,setOptionMode]=
    const [newData, setNewData] = useState({
        temper: {
            value: [],
        },
        humidity: {
            value: [],
        },
        dust25: {
            value: [],
        },
        dust10: {
            value: [],
        },
        differPressure: {
            value: [],
        },
        oxy: {
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
        let dataDraw = {
            temper: {
                value: [],
            },
            humidity: {
                value: [],
            },
            dust25: {
                value: [],
            },
            dust10: {
                value: [],
            },
            differPressure: {
                value: [],
            },
            oxy: {
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
                humidity: {
                    value: [],
                },
                dust25: {
                    value: [],
                },
                dust10: {
                    value: [],
                },
                differPressure: {
                    value: [],
                },
                oxy: {
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
            if (data && data.length > 0) {
                data.forEach((item) => {
                    dataDraw.temper.value.push(Number(item.temperature));
                    dataDraw.humidity.value.push(Number(item.humidity));
                    dataDraw.dust25.value.push(Number(item.dust25));
                    dataDraw.dust10.value.push(Number(item.dust10));
                    dataDraw.differPressure.value.push(Number(item.differPressure));
                    dataDraw.oxy.value.push(Number(item.oxy));
                    dataDraw.times.value.push(format(+item.date, 'HH:mm'));
                    dataDraw.dates.value.push(format(+item.date, 'dd/MM'));
                });
            }
        }
        setNewData(dataDraw);
    }, [data]);
    const datachart = [
        {
            name: 'Temperature (℃)',
            data: newData.temper.value,
            color: '#153AB9',
        },
        {
            name: 'Humidity (%)',
            data: newData.humidity.value,
            color: '#E60CBB',
        },
        {
            name: 'Dust 2.5 (µm)',
            data: newData.dust25.value,
            color: '#E6340C',
        },
        {
            name: 'Dust 10 (µm)',
            data: newData.dust10.value,
            color: '#3DCD16',
        },
        {
            name: 'Defferential Press (Pa)',
            data: newData.differPressure.value,
            color: '#DFE60C',
        },
        {
            name: 'Oxy (%)',
            data: newData.oxy.value,
            color: '#15B942',
        },
    ];
    useEffect(() => {
        handleActive(0);
    }, []);
    const seriesChart = () => {
        let coppyData = datachart;
        let dataSeriesChart = [];
        var [temp, humidity, dust25, dust10, differPressure, oxy] = coppyData;
        switch (typesensor) {
            case 'all':
                dataSeriesChart = [temp, humidity, dust25, dust10, differPressure, oxy];
                break;
            case 'temp-humi':
                dataSeriesChart = [temp, humidity];
                break;
            case 'dust':
                dataSeriesChart = [dust25, dust10];
                break;
            case 'pressure':
                dataSeriesChart = [differPressure];
                break;
            case 'oxy':
                dataSeriesChart = [oxy];
                break;
            default:
                return;
        }
        return dataSeriesChart;
    };
    const handleActive = (index) => {
        optionsModule.map((e) => {
            return (e.active = false);
        });
        optionsModule[index].active = true;
    };
    const renderSubText = () => {
        let subText = '';
        if (valueTime) {
            if (valueTime.length > 1) {
                if (mode === 'range') {
                    subText = `Date: From ${format(getTime(valueTime[0]), 'dd/MM/yyyy')} to ${format(
                        getTime(valueTime[1]),
                        'dd/MM/yyyy',
                    )}`;
                }
            } else {
                switch (mode) {
                    case 'date':
                        subText = `Date: ${format(getTime(valueTime), 'iiii-dd/MM/yyyy', { locale: viLocale })}`;
                        break;
                    case 'month':
                        subText = `Month: ${format(getTime(valueTime), 'MM/yyyy')}`;
                        break;
                    default:
                    // code block
                }
            }
        }
        return subText;
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
            text: renderSubText(),
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
                    text: typesensor === 'all' ? '' : seriesChart().length > 0 ? seriesChart()[0].name : '',
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
                    text: typesensor === 'all' ? 'Value' : seriesChart().length > 1 ? seriesChart()[1].name : '',
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
export default memo(HightChart);
