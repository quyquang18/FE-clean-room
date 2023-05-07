import classNames from 'classnames/bind';
import { SettingsIcon } from '../Icons';
import { child, ref, onValue } from 'firebase/database';
import { database } from '~/fribase';
import { useState, useEffect } from 'react';
import styles from './InfomationSensor.module.scss';
import { TYPE_DISPLAY, TYPE_SENSOR } from '~/utils';
import { handleGetValueThreshold } from '~/services/deviceService';

const cx = classNames.bind(styles);
const dbRef = ref(database);

function InfomationSensor({ userId, roomId, typeDisplay }) {
    const [curentValue1, setCurrentValue1] = useState(0);
    const [curentValue2, setCurrentValue2] = useState(0);
    const [valueUp, setValueUp] = useState(0);
    const [valueDown, setValueDown] = useState(0);

    const [nameSensor, setNameSensor] = useState(['', '']);

    const getValueThreshold = async (typeSensor) => {
        let dataReq = {};
        dataReq.Type_sensor = typeSensor;
        dataReq.userId = userId;
        dataReq.roomId = roomId;
        let res = await handleGetValueThreshold(dataReq);
        console.log(res);
    };
    useEffect(() => {
        switch (typeDisplay) {
            case TYPE_DISPLAY.TEMPERATURE_HUMIDITY:
                getValueThreshold(TYPE_SENSOR.TEMPERATURE);
                getValueThreshold(TYPE_SENSOR.HUMIDITY);
                setNameSensor(['Temperature', 'Humidity']);
                onValue(child(dbRef, `${userId}/${roomId}/valueSensor/Temperature`), (snapshot) => {
                    const dataFb = snapshot.val();
                    setCurrentValue1(dataFb);
                });
                onValue(child(dbRef, `${userId}/${roomId}/valueSensor/Humidity`), (snapshot) => {
                    const dataFb = snapshot.val();
                    setCurrentValue2(dataFb);
                });
                break;
            case TYPE_DISPLAY.DUST:
                setNameSensor(['Dust 2.5', 'Dust 10']);
                onValue(child(dbRef, `${userId}/${roomId}/valueSensor/Dust_2_5`), (snapshot) => {
                    const dataFb = snapshot.val();
                    setCurrentValue1(dataFb);
                });
                onValue(child(dbRef, `${userId}/${roomId}/valueSensor/Dust_10`), (snapshot) => {
                    const dataFb = snapshot.val();
                    setCurrentValue2(dataFb);
                });
                break;
            case TYPE_DISPLAY.PRESSURE:
                setNameSensor(['Pressure In', 'Pressure Out']);
                onValue(child(dbRef, `${userId}/${roomId}/valueSensor/PressureIn`), (snapshot) => {
                    const dataFb = snapshot.val() / 1000;
                    setCurrentValue1(dataFb);
                });
                onValue(child(dbRef, `${userId}/${roomId}/valueSensor/PressureOut`), (snapshot) => {
                    const dataFb = snapshot.val() / 1000;
                    setCurrentValue2(dataFb);
                });
                break;
            case TYPE_DISPLAY.OXY:
                setNameSensor(['Oxy']);
                onValue(child(dbRef, `${userId}/${roomId}/valueSensor/Oxy`), (snapshot) => {
                    const dataFb = snapshot.val();
                    setCurrentValue1(dataFb);
                });
                break;
            default:
                break;
        }
    }, [roomId, userId, typeDisplay]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('sensor-name')}>
                    <p>{nameSensor[0]}</p>
                    {nameSensor[1] && <p>{nameSensor[1]}</p>}
                </h2>
                <span className={cx('sensor-status')}>
                    {/* <p className={cx(status.ss1 === 'OK' ? 'ok' : 'warrning')}>{status.ss1}</p>
                    <p className={cx(status.ss2 === 'OK' ? 'ok' : 'warrning')}>{status.ss2}</p> */}
                </span>
            </div>
            <div className={cx('wrapper-table')}>
                {/* <table className={cx('flat-table')}>
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
                            <td className={cx('title-row')}>
                                <span>Up</span>
                                {
                                    <span className={cx('icon')}>
                                        <SettingsIcon width="1.8rem" height="1.8rem" />
                                    </span>
                                }
                            </td>
                            <td>
                                <p>{settingValue.valueUpper[0]}</p>
                            </td>
                            <td>
                                <p>{settingValue.valueUpper[1]}</p>
                            </td>
                        </tr>
                        {settingValue.valueLow && (
                            <tr className={cx('tr-2', 'tr')}>
                                <td className={cx('title-row')}>
                                    <span>Down</span>
                                    {
                                        <span className={cx('icon')}>
                                            <SettingsIcon width="1.8rem" height="1.8rem" />
                                        </span>
                                    }
                                </td>
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
                </table> */}
            </div>
        </div>
    );
}

export default InfomationSensor;
