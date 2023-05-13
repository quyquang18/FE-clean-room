import classNames from 'classnames/bind';
import { SettingsIcon } from '../Icons';
import { child, ref, onValue } from 'firebase/database';
import { database } from '~/firebase';
import { useState, useEffect, useCallback } from 'react';
import styles from './InfomationSensor.module.scss';
import { TYPE_DISPLAY, TYPE_SENSOR } from '~/utils';
import { handleGetValueThreshold } from '~/services/deviceService';
import _ from 'lodash';
import ModalSettingsThreshold from './ModalSettingsThreshold';

const cx = classNames.bind(styles);
const dbRef = ref(database);

function InfomationSensor({ userId, roomId, typeDisplay }) {
    const [curentValue1, setCurrentValue1] = useState();
    const [curentValue2, setCurrentValue2] = useState();
    const [valueThreshold1, setValueThreshold1] = useState({});
    const [valueThreshold2, setValueThreshold2] = useState({});
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [nameSensor, setNameSensor] = useState(['', '']);

    const getValueThreshold = useCallback(
        async (typeSensor) => {
            let dataReq = {};
            dataReq.Type_sensor = typeSensor;
            dataReq.userId = userId;
            dataReq.roomId = roomId;
            let res = await handleGetValueThreshold(dataReq);
            if (res && res.errCode === 0) {
                let data = {};
                data.valueUp = res.data.valueUp;
                data.valueDown = res.data.valueDown;
                data.init = res.data.init;
                data.Type_sensor = res.data.Type_sensor;
                data.roomId = res.data.roomId;
                data.userId = res.data.userId;
                return data;
            } else {
            }
        },
        [roomId, userId],
    );
    useEffect(() => {
        switch (typeDisplay) {
            case TYPE_DISPLAY.TEMPERATURE_HUMIDITY:
                const fetchData1 = async () => {
                    let value1 = await getValueThreshold(TYPE_SENSOR.TEMPERATURE);
                    let value2 = await getValueThreshold(TYPE_SENSOR.HUMIDITY);
                    setValueThreshold1(value1);
                    setValueThreshold2(value2);
                };
                fetchData1();
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
                const fetchData2 = async () => {
                    let value1 = await getValueThreshold(TYPE_SENSOR.DUST_25);
                    let value2 = await getValueThreshold(TYPE_SENSOR.DUST_10);
                    setValueThreshold1(value1);
                    setValueThreshold2(value2);
                };
                fetchData2();
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
                const fetchData3 = async () => {
                    let value1 = await getValueThreshold(TYPE_SENSOR.PRESSURE_IN);
                    let value2 = await getValueThreshold(TYPE_SENSOR.PRESSURE_OUT);
                    setValueThreshold1(value1);
                    setValueThreshold2(value2);
                };
                fetchData3();
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
                const fetchData4 = async () => {
                    let value1 = await getValueThreshold(TYPE_SENSOR.OXY);
                    setValueThreshold1(value1);
                };
                fetchData4();
                setNameSensor(['Oxy']);
                onValue(child(dbRef, `${userId}/${roomId}/valueSensor/Oxy`), (snapshot) => {
                    const dataFb = snapshot.val();
                    setCurrentValue1(dataFb);
                });
                break;
            default:
                break;
        }
    }, [roomId, userId, typeDisplay, getValueThreshold]);
    const renderStatus = () => {
        let status1 = '';
        let status2 = '';
        if (curentValue1 && valueThreshold1 && valueThreshold1.valueDown && valueThreshold1.valueUp) {
            status1 =
                +valueThreshold1.valueDown < +curentValue1 && +curentValue1 < +valueThreshold1.valueUp
                    ? 'OK'
                    : 'Warning';
        }
        if (curentValue2 && valueThreshold2 && valueThreshold2.valueDown && valueThreshold2.valueUp) {
            status2 =
                +valueThreshold2.valueDown < +curentValue2 && +curentValue2 < +valueThreshold2.valueUp
                    ? 'OK'
                    : 'Warning';
        }
        return (
            <span className={cx('sensor-status')}>
                {status1 && <p className={cx(status1 === 'OK' ? 'ok' : 'warning')}>{status1}</p>}
                {status2 && <p className={cx(status2 === 'OK' ? 'ok' : 'warning')}>{status2}</p>}
            </span>
        );
    };
    const handleClickSettings = () => {
        setIsOpenModal(true);
    };
    const toggleEditUserModal = () => {
        setIsOpenModal(!isOpenModal);
    };
    return (
        <div className={cx('wrapper')}>
            {isOpenModal && (
                <ModalSettingsThreshold
                    isOpen={isOpenModal}
                    toggleEditUserModal={toggleEditUserModal}
                    valueThreshold1={valueThreshold1}
                    valueThreshold2={valueThreshold2}
                />
            )}
            <div className={cx('header')}>
                <h2 className={cx('sensor-name')}>
                    <p>{nameSensor[0]}</p>
                    {nameSensor[1] && <p>{nameSensor[1]}</p>}
                    {
                        <span className={cx('icon-settings')} onClick={handleClickSettings}>
                            <SettingsIcon width="1.8rem" height="1.8rem" />
                        </span>
                    }
                </h2>
                {renderStatus()}
            </div>
            <div className={cx('wrapper-table')}>
                <table className={cx('flat-table')}>
                    <thead className={cx('thead')}>
                        <tr>
                            <th>Parameters</th>
                            <th>
                                {nameSensor[0] && nameSensor[0]}
                                <p>{valueThreshold1.init}</p>
                            </th>
                            <th>
                                {nameSensor[1] && nameSensor[1]}
                                <p>{'(' + valueThreshold2.init + ')'}</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody className={cx('tbody')}>
                        <tr className={cx('tr-1', 'tr')}>
                            <td className={cx('title-row')}>
                                <span>Up</span>
                            </td>
                            <td>{valueThreshold1.valueUp && <p>{valueThreshold1.valueUp}</p>}</td>
                            <td>{valueThreshold2.valueUp && <p>{valueThreshold2.valueUp}</p>}</td>
                        </tr>
                        <tr className={cx('tr-2', 'tr')}>
                            <td className={cx('title-row')}>
                                <span>Down</span>
                            </td>
                            <td>{valueThreshold1.valueDown && <p>{valueThreshold1.valueDown}</p>}</td>
                            <td>{valueThreshold2.valueDown && <p>{valueThreshold2.valueDown}</p>}</td>
                        </tr>
                        <tr className={cx('tr-3', 'tr')}>
                            <td>Current </td>
                            <td>{curentValue1 && <p>{curentValue1}</p>}</td>
                            <td>{curentValue2 && <p>{curentValue2}</p>}</td>
                        </tr>
                        <tr className={cx('tr-4', 'tr')}>
                            <td>Sample (s)</td>
                            <td>
                                <p>5</p>
                            </td>
                            <td>{curentValue2 && <p>5</p>}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InfomationSensor;
