import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

function PieChart({ data = [], type, valuePeriod }) {
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
        case 'currentday':
            subtitle = 'Day :  ' + currentday;
            break;
        case 'thismonth':
            subtitle = 'Month :  ' + thismonth;
            break;
        case 'lastmonth':
            subtitle = 'Month :  ' + lastmonth;
            break;
        case 'Period':
            subtitle = ` From Date ${valuePeriod.from} To Date ${valuePeriod.to}`;
            break;
        default:
            break;
    }
    const handleData = (dataInput) => {
        if (dataInput !== undefined) {
            let times = dataInput.split(':');
            return +times[0] * 3600 + +times[1] * 60 + +times[2];
        } else {
            return;
        }
    };
    const handleUnit = (dataInput) => {
        if (dataInput !== undefined) {
            let times = dataInput.split(':');
            return times[0] + ':hour / ' + times[1] + ':min / ' + times[2] + ':sec';
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
            pointFormat: '{series.name} <b>{point.time:.1f}</b>',
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

        series:
            data.on !== undefined
                ? [
                      {
                          name: 'Total Time',
                          colorByPoint: true,
                          data: [
                              {
                                  name: 'Active Status',
                                  y: handleData(data.on),
                                  color: '#06db06',
                                  time: handleUnit(data.on),
                              },
                              {
                                  name: 'Status Off',
                                  y: handleData(data.off),
                                  color: '#db0606',
                                  time: handleUnit(data.off),
                              },
                              {
                                  name: 'Status Error',
                                  y: handleData(data.error),
                                  color: '#e4bc0d',
                                  time: handleUnit(data.off),
                              },
                          ],
                      },
                  ]
                : [],
    };
    const styleNofity = {
        color: 'red',
        fontSize: '1.7rem',
        fontWeight: 500,
        padding: '12px 12px',
        position: 'absolute',
        zIndex: 1,
        top: '35%',
        left: '23%',
    };
    return (
        <div>
            <div>
                {data.on === undefined && (
                    <span style={styleNofity}>No data for this time. Please choose another time. thank !!!</span>
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
export default PieChart;
