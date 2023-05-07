import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { format, getTime } from 'date-fns';
import { toast } from 'react-toastify';
function PieChart({ data = [], type, dateRange }) {
    // const [dataDraw, setDataDraw] = useState({});
    var subtitle = '';
    var today = new Date();
    var yesterday = today.getDate() - 1 + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var currentday = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var thismonth = today.getMonth() + 1 + '-' + today.getFullYear();
    var lastmonth = today.getMonth() + '-' + today.getFullYear();
    switch (type) {
        case 'yesterday':
            subtitle = 'Day :  ' + yesterday;
            break;
        case 'today':
            subtitle = 'Day :  ' + currentday;
            break;
        case 'thismonth':
            subtitle = 'Month :  ' + thismonth;
            break;
        case 'lastmonth':
            subtitle = 'Month :  ' + lastmonth;
            break;
        case 'range':
            subtitle = `Date: From ${format(getTime(dateRange[0]), 'dd/MM/yyyy')} to ${format(
                getTime(dateRange[1]),
                'dd/MM/yyyy',
            )}`;
            break;
        default:
            break;
    }
    const handleConvertTimeToString = (inputTimeMiliSecons) => {
        let dateObj = new Date(inputTimeMiliSecons);
        if (inputTimeMiliSecons) {
            let hour = dateObj.toISOString().substr(11, 2);
            let min = dateObj.toISOString().substr(14, 2);
            let secons = dateObj.toISOString().substr(17, 2);
            return `${hour}:Hour - ${min}:Min - ${secons}:Secons`;
        }
    };
    const handleData = () => {
        let dataDraw = {
            on: {
                totalMiliSecons: 0,
                stringTime: '',
            },
            off: {
                totalMiliSecons: 0,
                stringTime: '',
            },
            error: {
                totalMiliSecons: 0,
                stringTime: '',
            },
        };
        if (data && data.length > 0) {
            data.map((item, index) => {
                let startTime = new Date(+item.stateStartTime);
                let endTime = new Date(+item.stateEndTime);
                let miliSecons = endTime - startTime;
                switch (item.status) {
                    case 'S1':
                        dataDraw.on.totalMiliSecons += miliSecons;
                        dataDraw.on.stringTime = handleConvertTimeToString(dataDraw.on.totalMiliSecons);
                        break;
                    case 'S2':
                        dataDraw.off.totalMiliSecons += miliSecons;
                        dataDraw.off.stringTime = handleConvertTimeToString(dataDraw.off.totalMiliSecons);
                        break;
                    case 'S3':
                        dataDraw.error.totalMiliSecons += miliSecons;
                        dataDraw.error.stringTime = handleConvertTimeToString(dataDraw.error.totalMiliSecons);
                        break;
                    default:
                        break;
                }
                return true;
            });
            return dataDraw;
        } else {
            return;
        }
    };

    const chartConfig = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: `Device status statistics pie chart`,
            style: {
                fontSize: '2.0rem',
                fontFamily: 'Times New Roman',
                color: '#e54a1c',
                textTransform: 'capitalize',
            },
        },

        subtitle: {
            text: subtitle,
            style: {
                fontSize: '1.6rem',
                fontFamily: 'Times New Roman',
                color: '#880000',
                fontWeight: 600,
            },
        },
        tooltip: {
            pointFormat: '<b>{point.time:.1f}</b>',
        },
        accessibility: {
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                },
            },
        },

        series: {
            name: 'Total Time',
            colorByPoint: true,
            data: [
                {
                    name: 'Status On',
                    y: handleData() && handleData().on.totalMiliSecons,
                    color: '#06db06',
                    time: handleData() && handleData().on.stringTime,
                },
                {
                    name: 'Status Off',
                    y: handleData() && handleData().off.totalMiliSecons,
                    color: '#db0606',
                    time: handleData() && handleData().off.stringTime,
                },
                {
                    name: 'Status Error',
                    y: handleData() && handleData().error.totalMiliSecons,
                    color: '#e4bc0d',
                    time: handleData() && handleData().error.stringTime,
                },
            ],
        },
    };

    return (
        <div>
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartConfig}
                    containerProps={{ className: 'chartContainer' }}
                />
            </div>
        </div>
    );
}
export default PieChart;
