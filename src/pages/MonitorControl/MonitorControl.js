import classNames from 'classnames/bind';
import { useState, useRef, useEffect, useReducer } from 'react';
import axios from 'axios';
import { getDatabase, child, ref, onValue } from 'firebase/database';

import { database } from '~/fribase';
import ProgressBar from '~/components/ProgressBar';
import Selects from '~/components/SelectLocation';
import styles from './MonitorControl.module.scss';
import { FanIcon, RoomIcon, MinusIcon, PlusIcon, DashedCircleIcon, DewIcon } from '~/components/Icons';
import InfomationSensor from '~/components/InfomationSensor';
const cx = classNames.bind(styles);
const reducer = (state, action) => {
    switch (action) {
        case 'PLUS':
            if (state < 40) {
                return state + 1;
            } else {
                return (state = 0);
            }
        case 'MINUS':
            if (state > 0) {
                return state - 1;
            } else {
                return (state = 0);
            }
        default:
            throw new Error('Invalid action');
    }
};
const dbRef = ref(database);

function MonitorControl() {
    const [valueFan, dispatchFan] = useReducer(reducer, 10);
    const [valueDew, dispatchDew] = useReducer(reducer, 20);
    const [curentValueTemp, setCurrentValueTemp] = useState(10);
    const [curentValueHumi, setCurrentValueHumi] = useState(10);
    const [curentValueDust25, setCurrentValueDust25] = useState(10);
    const [curentValueDust10, setCurrentValueDust10] = useState(10);
    const [curentValuePresIn, setCurrentValuePresIn] = useState(10);
    const [curentValuePresOut, setCurrentValuePresOut] = useState(10);

    document.title = 'LUXAS-Monitor Control';

    useEffect(() => {
        onValue(child(dbRef, `valueSensor/workShop1/temperature`), (snapshot) => {
            const dataFb = snapshot.val();
            setCurrentValueTemp(dataFb);
        });
        onValue(child(dbRef, `valueSensor/workShop1/humidity`), (snapshot) => {
            const dataFb = snapshot.val();
            setCurrentValueHumi(dataFb);
        });
        onValue(child(dbRef, `valueSensor/workShop1/dust2_5`), (snapshot) => {
            const dataFb = snapshot.val();
            setCurrentValueDust25(dataFb);
        });
        onValue(child(dbRef, `valueSensor/workShop1/dust10`), (snapshot) => {
            const dataFb = snapshot.val();
            setCurrentValueDust10(dataFb);
        });
        onValue(child(dbRef, `valueSensor/workShop1/pressure_in`), (snapshot) => {
            const dataFb = snapshot.val();
            setCurrentValuePresIn(dataFb);
        });
        onValue(child(dbRef, `valueSensor/workShop1/pressure_out`), (snapshot) => {
            const dataFb = snapshot.val();
            setCurrentValuePresOut(dataFb);
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Monitor Control </h2>
            <div className={cx('select-location')}>
                <Selects defaultOPtion={'Select Location'} />
            </div>
            <div className={cx('room-name')}>
                <RoomIcon /> <p>Clean Room 1</p>
            </div>
            <div className={cx('conten-wrapper')}>
                <div className={cx('control')}>
                    <h4 className={cx('header')}>Control</h4>
                    <div className={cx('control-wrapper')}>
                        <span className={cx('title-control')}>
                            <FanIcon width="22px" height="22px" />
                            <p>speed fan</p>
                        </span>
                        <div>
                            <span className={cx('speed-control')}>
                                <span className={cx('control-value')}>
                                    <span onClick={() => dispatchFan('MINUS')}>
                                        <MinusIcon className={cx('icon-btn')} />
                                    </span>
                                    <p className={cx('text-value')}>05</p>
                                </span>
                                <span className={cx('slider-value')}>
                                    <p className={cx('text-value')}>15</p>
                                    <DashedCircleIcon width="160" height="160" />
                                    <div className={cx('range-slider')}>
                                        <ProgressBar value={valueFan} />
                                    </div>
                                </span>
                                <span className={cx('control-value')}>
                                    <p className={cx('text-value')}>25</p>
                                    <span onClick={() => dispatchFan('PLUS')}>
                                        <PlusIcon className={cx('icon-btn')} />
                                    </span>
                                </span>
                            </span>

                            <span className={cx('input-value')}>
                                <input type="number" placeholder="Input values"></input>
                            </span>
                        </div>
                    </div>
                    <div className={cx('control-wrapper')}>
                        <span className={cx('title-control')}>
                            <DewIcon width="22px" height="22px" />
                            <p>Fog Degree</p>
                        </span>

                        <div>
                            <span className={cx('speed-control')}>
                                <span className={cx('control-value')}>
                                    <span onClick={() => dispatchDew('MINUS')}>
                                        <MinusIcon className={cx('icon-btn')} />
                                    </span>
                                    <p className={cx('text-value')}>05</p>
                                </span>
                                <span className={cx('slider-value')}>
                                    <p className={cx('text-value')}>15</p>
                                    <DashedCircleIcon width="160" height="160" />
                                    <div className={cx('range-slider')}>
                                        <ProgressBar value={valueDew} />
                                    </div>
                                </span>
                                <span className={cx('control-value')}>
                                    <p className={cx('text-value')}>25</p>
                                    <span onClick={() => dispatchDew('PLUS')}>
                                        <PlusIcon className={cx('icon-btn')} />
                                    </span>
                                </span>
                            </span>
                            <span className={cx('input-value')}>
                                <input placeholder="Input values"></input>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('monitor')}>
                    <h4 className={cx('header')}>Monitor</h4>
                    <InfomationSensor
                        ssName="Temperature"
                        valueCurrent={{ value1: curentValueTemp, value2: curentValueHumi }}
                        status={{
                            ss1: curentValueTemp <= 37 && curentValueTemp >= 15 ? 'OK' : 'Warrning',
                            ss2: curentValueHumi <= 100 && curentValueHumi >= 50 ? 'OK' : 'Warrning',
                        }}
                    />
                    <InfomationSensor
                        ssName="dust"
                        status={{
                            ss1: curentValueDust25 <= 100 ? 'OK' : 'Warrning',
                            ss2: curentValueDust10 <= 99 ? 'OK' : 'Warrning',
                        }}
                        valueCurrent={{ value1: curentValueDust25, value2: curentValueDust10 }}
                    />
                    <InfomationSensor
                        ssName="pressure"
                        status={{
                            ss1: curentValuePresIn <= 130 ? 'OK' : 'Warrning',
                            ss2: curentValuePresOut <= 130 ? 'OK' : 'Warrning',
                        }}
                        valueCurrent={{ value1: curentValuePresIn, value2: curentValuePresOut }}
                    />
                </div>
            </div>
        </div>
    );
}

export default MonitorControl;
