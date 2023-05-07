import classNames from 'classnames/bind';
import { useState, useMemo, useEffect, useReducer } from 'react';

import Select from 'react-select';

import ProgressBar from '~/components/ProgressBar';
import * as actions from '~/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MonitorControler.module.scss';
import { FanIcon, RoomIcon, MinusIcon, PlusIcon, DashedCircleIcon, DewIcon, SettingsIcon } from '~/components/Icons';
import InfomationSensor from '~/components/InfomationSensor';
import Button from '~/components/Button';
import { TYPE_DISPLAY } from '~/utils';

const cx = classNames.bind(styles);
const listSensorDisplay = [
    { label: 'T-H', value: TYPE_DISPLAY.TEMPERATURE_HUMIDITY },
    { label: 'Dust', value: TYPE_DISPLAY.DUST },
    { label: 'Press', value: TYPE_DISPLAY.PRESSURE },
    { label: 'Oxy', value: TYPE_DISPLAY.OXY },
];

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

function MonitorControler() {
    const [valueFan, dispatchFan] = useReducer(reducer, 10);
    const [valueDew, dispatchDew] = useReducer(reducer, 20);
    const [selectedDisplay, setSelectedDisplay] = useState();
    document.title = 'LUXAS-Monitor Control';

    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.value = item.id;
                object.label = item.name;
                result.push(object);
                return true;
            });
            return result;
        }
    };
    let listRoom = useSelector((state) => state.admin.arrRoom);
    listRoom = buildDataInputSelect(listRoom);
    const initSelectedRoom = useMemo(() => listRoom && listRoom.length > 0 && listRoom[0], [listRoom]);
    const [selectedRoom, setSelectedRoom] = useState(initSelectedRoom);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userInfo.id);
    useEffect(() => {
        dispatch(actions.fetchAllRoom(userId));
    }, [dispatch, userId]);
    useEffect(() => {
        if (listRoom && listRoom.length > 0 && !selectedRoom) {
            setSelectedRoom(initSelectedRoom);
        }
    }, [listRoom, selectedRoom, initSelectedRoom]);

    const handleChangeRoom = (value) => {
        setSelectedRoom(value);
    };
    const handleChangeDisplay = (value) => {
        setSelectedDisplay(value);
    };
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Monitor Control </h2>
            <div className={cx('select-location')}>
                <Select value={selectedRoom} onChange={(event) => handleChangeRoom(event)} options={listRoom} />
            </div>
            <div className={cx('room-header')}>
                <div className={cx('room-name')}>
                    <RoomIcon /> <p>{selectedRoom && selectedRoom.label}</p>
                </div>
                <div className={cx('btn-settings')}>
                    <Button primary leftIcon={<SettingsIcon />} to="./settings-controler">
                        Settings
                    </Button>
                </div>
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
                    <Select
                        value={selectedDisplay}
                        onChange={(event) => handleChangeDisplay(event)}
                        options={listSensorDisplay}
                        isMulti
                    />
                    {selectedDisplay &&
                        selectedDisplay.length > 0 &&
                        selectedDisplay.map((item, index) => {
                            return (
                                <InfomationSensor
                                    key={index}
                                    userId={userId}
                                    typeDisplay={item.value}
                                    roomId={selectedRoom && selectedRoom.value}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default MonitorControler;
