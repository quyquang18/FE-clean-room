import classNames from 'classnames/bind';

import styles from './InfomationSensor.module.scss';

const cx = classNames.bind(styles);

var settingValue = {
    name: '',
    valueUpper: [],
    valueLow: [],
    unit: [],
    title: ['', ''],
};

function InfomationSensor({
    ssName,
    status = { ss1: 'OK', ss2: 'OK' },
    valueCurrent = { value1: null, value2: null },
}) {
    switch (ssName) {
        case 'Temperature':
            settingValue.name = ['Temperature', 'Humidity'];
            settingValue.title = ['Temper ', 'Humidy'];
            settingValue.valueUpper = [37, 100];
            settingValue.valueLow = [15, 50];
            settingValue.unit = ['(°C)', '(%)'];

            break;

        case 'dust':
            settingValue.name = ['Dust 2.5 µm', 'Dust 10 µm'];
            settingValue.unit = ['(hạt/m³)', '(hạt/m³)'];
            settingValue.title = ['Dust 2.5', 'Dust 10'];
            settingValue.valueUpper = [100, 99];
            settingValue.valueLow = false;
            break;
        case 'pressure':
            settingValue.name = ['Pressure In', 'Pressure Out'];
            settingValue.valueUpper = [130, 130];
            settingValue.valueLow = false;
            settingValue.unit = ['(kPa)', '(kPa)'];
            settingValue.title = ['Press In', 'Press Out'];
            break;
        default:
            return;
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('sensor-name')}>
                    <p>{settingValue.name[0]}</p>
                    <p>{settingValue.name[1]}</p>
                </h2>
                <span className={cx('sensor-status')}>
                    <p className={cx(status.ss1 === 'OK' ? 'ok' : 'warrning')}>{status.ss1}</p>
                    <p className={cx(status.ss2 === 'OK' ? 'ok' : 'warrning')}>{status.ss2}</p>
                </span>
            </div>
            <div className={cx('wrapper-table')}>
                <table className={cx('flat-table')}>
                    <thead className={cx('thead')}>
                        <tr>
                            <th>Parameters</th>
                            <th>
                                {settingValue.title[0]}
                                <p>{settingValue.unit[0]}</p>
                            </th>
                            <th>
                                {settingValue.title[1]}
                                <p>{settingValue.unit[1]}</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody className={cx('tbody')}>
                        <tr className={cx('tr-1', 'tr')}>
                            <td>Upper setting</td>
                            <td>
                                <p>{settingValue.valueUpper[0]}</p>
                            </td>
                            <td>
                                <p>{settingValue.valueUpper[1]}</p>
                            </td>
                        </tr>
                        {settingValue.valueLow && (
                            <tr className={cx('tr-2', 'tr')}>
                                <td>Low setting</td>
                                <td>
                                    <p>{settingValue.valueLow[0]}</p>
                                </td>
                                <td>
                                    <p>{settingValue.valueLow[1]}</p>
                                </td>
                            </tr>
                        )}
                        <tr className={cx('tr-3', 'tr')}>
                            <td>Current </td>
                            <td>
                                <p>{valueCurrent.value1}</p>
                            </td>
                            <td>
                                <p>{valueCurrent.value2}</p>
                            </td>
                        </tr>
                        <tr className={cx('tr-4', 'tr')}>
                            <td>Sample (s)</td>
                            <td>
                                <p>5</p>
                            </td>
                            <td>
                                <p>5</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InfomationSensor;
