import { useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

function HightChart({ data = [] }) {
    useEffect(() => {
        data.forEach((item) => {
            // console.log(item);
        });
    }, [data]);
    const chartConfig = {
        chart: {
            type: 'column',
            width: '720',
            backgroundColor: 'transparent',
        },
        title: {
            text: 'Average temperature, 2021',
        },
        xAxis: {
            categories: ['Temperture', 'Humidity', 'Dust 2.5', 'Dust 10', 'Pressure In', 'Pressure Out'],
            crosshair: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        yAxis: {
            title: {
                text: 'Vlue',
            },
        },
        credits: {
            enabled: false,
        },
        exporting: {
            enabled: false,
        },
        series: [
            {
                name: 'Hight',
                data: [5.0, 3.6, 3.3, 5.8, 10.6, 17.3],
            },
            {
                name: 'Medium',
                data: [8.5, 7.8, 10.8, 6.8, 4.0, 3.7],
            },
            {
                name: 'Low',
                data: [6.2, 4.6, 1.7, 2.3, 8.1, 13.2],
            },
        ],
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
