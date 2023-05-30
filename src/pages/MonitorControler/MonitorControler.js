import classNames from 'classnames/bind';
import { useState, useMemo, useEffect, useReducer } from 'react';
import { ref, child, onValue, update } from 'firebase/database';
import Select from 'react-select';
import { database } from '~/firebase';
import ProgressBar from '~/components/ProgressBar';
import * as actions from '~/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MonitorControler.module.scss';
import {
    FanIcon,
    RoomIcon,
    MinusIcon,
    PlusIcon,
    DashedCircleIcon,
    DewIcon,
    SettingsIcon,
    PowerIcon,
} from '~/components/Icons';
import InfomationSensor from '~/components/InfomationSensor';
import Button from '~/components/Button';
import { StatusOnOff, TYPE_DISPLAY } from '~/utils';

const dbRef = ref(database);
const cx = classNames.bind(styles);
const listSensorDisplay = [
    { label: 'T-H', value: TYPE_DISPLAY.TEMPERATURE_HUMIDITY },
    { label: 'Dust', value: TYPE_DISPLAY.DUST },
    { label: 'Press', value: TYPE_DISPLAY.PRESSURE },
    { label: 'Oxy', value: TYPE_DISPLAY.OXY },
];

function MonitorControler() {
    const [valueDew, dispatchDew] = useReducer(20);
    const [statusFan, setStatusFan] = useState(StatusOnOff.OFF);
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
    const companyId = useSelector((state) => state.user.userInfo.companyId);
    useEffect(() => {
        dispatch(actions.fetchAllRoom(companyId));
    }, [dispatch, companyId]);
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
    useEffect(() => {
        if (companyId && selectedRoom) {
            onValue(
                child(dbRef, `${companyId}/${selectedRoom.value}/valueDevice/Fan`),
                (snapshot) => {
                    if (snapshot.val() && snapshot.val().Speed && snapshot.val().Status) {
                        setValueFan(snapshot.val().Speed);
                        setStatusFan(snapshot.val().Status);
                    }
                },
                { onlyOnce: true },
            );
        }
    }, [companyId, selectedRoom]);

    const [valueFan, setValueFan] = useState(10);
    const handleChangeSpeedFan = (action) => {
        let coppyValueFan = valueFan;
        switch (action) {
            case 'PLUS':
                if (coppyValueFan < 40) {
                    coppyValueFan += 1;
                    break;
                } else {
                    coppyValueFan = 40;
                    break;
                }
            case 'MINUS':
                if (coppyValueFan > 0) {
                    coppyValueFan -= 1;
                    break;
                } else {
                    coppyValueFan = 0;
                    break;
                }
            default:
                break;
        }
        setValueFan(coppyValueFan);
        const updates = {};
        if (companyId && selectedRoom) {
            updates[`${companyId}/${selectedRoom.value}/valueDevice/Fan/` + 'Speed'] = coppyValueFan;
            update(dbRef, updates);
        }
    };
    const handleChangeStatusFan = () => {
        if (statusFan === StatusOnOff.ON) {
            setStatusFan(StatusOnOff.OFF);
            if (companyId && selectedRoom) {
                const updates = {};
                // eslint-disable-next-line no-useless-concat
                updates[`${companyId}/${selectedRoom.value}/valueDevice/Fan/` + 'Status'] = StatusOnOff.OFF;
                update(dbRef, updates);
            }
        }
        if (statusFan === StatusOnOff.OFF) {
            setStatusFan(StatusOnOff.ON);
            if (companyId && selectedRoom) {
                const updates = {};
                // eslint-disable-next-line no-useless-concat
                updates[`${companyId}/${selectedRoom.value}/valueDevice/Fan/` + 'Status'] = StatusOnOff.ON;
                update(dbRef, updates);
            }
        }
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
            <div className={cx('conten-wrapper', 'row')}>
                <div className={cx('control', 'col c-12 m-6 l-6')}>
                    <h4 className={cx('header')}>Control</h4>
                    <div className={cx('control-wrapper')}>
                        <div className={cx('header-control')}>
                            <span className={cx('title-control')}>
                                <FanIcon width="22px" height="22px" />
                                <p>speed fan</p>
                            </span>
                            <span
                                className={cx('btn-control', statusFan === StatusOnOff.ON ? 'on' : 'off')}
                                onClick={() => handleChangeStatusFan()}
                            >
                                <PowerIcon width="22px" height="22px" />
                                <p>{statusFan}</p>
                            </span>
                        </div>
                        <div>
                            <span className={cx('speed-control')}>
                                <span className={cx('control-value')}>
                                    <span onClick={() => handleChangeSpeedFan('MINUS')}>
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
                                    <span onClick={() => handleChangeSpeedFan('PLUS')}>
                                        <PlusIcon className={cx('icon-btn')} />
                                    </span>
                                </span>
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
                                    <span>
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
                                    <span>
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
                <div className={cx('monitor', 'col c-12 m-5 l-5')}>
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
                                    companyId={companyId}
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
