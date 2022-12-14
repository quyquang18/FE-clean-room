import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './StatisticalTable.module.scss';

const cx = classNames.bind(styles);
function StatisticalTables({ data }) {
    const [valueBiggest, setValueBiggest] = useState({ value: 'null', time: 'null', date: 'null' });
    const [valueAverage, setValueAverage] = useState({ value: 'null', time: 'null', date: 'null' });
    const [valueSmallest, setValueSmallest] = useState({ value: 'null', time: '', date: '' });
    const [typeValue, setTypeValue] = useState('null');
    const findMax = (type) => {
        return data.reduce(function (accumulator, currentValue) {
            return Number(accumulator[type]) > Number(currentValue[type]) ? accumulator : currentValue;
        });
    };
    const findMin = (type) => {
        return data.reduce(function (accumulator, currentValue) {
            return Number(accumulator[type]) < Number(currentValue[type]) ? accumulator : currentValue;
        });
    };
    useEffect(() => {
        setTypeValue('null');
        setValueBiggest({ value: 'null', time: 'null', date: 'null' });
        setValueAverage({ value: 'null', time: 'null', date: 'null' });
        setValueSmallest({ value: 'null', time: '', date: '' });
    }, [data]);
    const averageValue = (type) => {
        let sum = data.reduce(function (accumulator, currentValue) {
            return accumulator + Number(currentValue[type]);
        }, 0);
        return (sum / data.length).toFixed(2);
    };
    const setValueTable = (key) => {
        if (data.length > 0) {
            let maxValue = findMax(key);
            let minValue = findMin(key);
            let averagevalue = averageValue(key);
            setValueBiggest({ value: maxValue[key], time: maxValue.time, date: maxValue.date });
            setValueAverage({ value: minValue[key], time: minValue.time, date: minValue.date });
            setValueSmallest({ value: averagevalue, time: '', date: '' });
        }
    };

    const handleChangeSelect = (type) => {
        switch (type) {
            case 'tempre': {
                setValueTable('temperature');
                break;
            }
            case 'humi': {
                setValueTable('humidity');
                break;
            }
            case 'dust_25': {
                setValueTable('dust2_5');
                break;
            }
            case 'dust_10': {
                setValueTable('dust10');
                break;
            }
            case 'press_in': {
                setValueTable('pressureIn');
                break;
            }
            case 'press_out': {
                setValueTable('pressureOut');
                break;
            }
            default: {
                setValueBiggest({ value: 'null', time: 'null', date: 'null' });
                setValueAverage({ value: 'null', time: 'null', date: 'null' });
                setValueSmallest({ value: 'null', time: '', date: '' });
                break;
            }
        }
    };
    return (
        <table className={cx('table')} id="customers">
            <thead>
                <tr className={cx('tr')}>
                    <th>
                        <select
                            value={typeValue}
                            className={cx('selects-type')}
                            onChange={(e) => {
                                handleChangeSelect(e.target.value);
                                setTypeValue(e.target.value);
                            }}
                        >
                            <option value="null">Select Value Type...</option>
                            <option value="tempre">Temperature</option>
                            <option value="humi">Humidity</option>
                            <option value="dust_25">Dust 2.5</option>
                            <option value="dust_10">Dust 10</option>
                            <option value="press_in">Pressure In</option>
                            <option value="press_out">Pressure Out</option>
                        </select>
                    </th>
                    <th>Value</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr className={cx('tr')}>
                    <td>Biggest</td>
                    <td>{valueBiggest.value}</td>
                    <td>{valueBiggest.time}</td>
                    <td>{valueBiggest.date}</td>
                </tr>
                <tr className={cx('tr')}>
                    <td>Average </td>
                    <td>{valueAverage.value}</td>
                    <td>{valueAverage.time}</td>
                    <td>{valueAverage.date}</td>
                </tr>
                <tr className={cx('tr')}>
                    <td>Smallest</td>
                    <td>{valueSmallest.value}</td>
                    <td>{valueSmallest.time}</td>
                    <td>{valueSmallest.date}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default StatisticalTables;
