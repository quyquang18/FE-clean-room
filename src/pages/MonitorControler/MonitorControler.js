import classNames from 'classnames/bind';
import { useState, useMemo, useEffect } from 'react';
import Select from 'react-select';
import * as actions from '~/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MonitorControler.module.scss';
import { RoomIcon, SettingsIcon } from '~/components/Icons';
import InfomationSensor from '~/components/InfomationSensor';
import Button from '~/components/Button';
import { TYPE_DISPLAY } from '~/utils';
import FanControler from './FanControler';

const cx = classNames.bind(styles);
const listSensorDisplay = [
    { label: 'T-H', value: TYPE_DISPLAY.TEMPERATURE_HUMIDITY },
    { label: 'Dust', value: TYPE_DISPLAY.DUST },
    { label: 'Press', value: TYPE_DISPLAY.PRESSURE },
    { label: 'Oxy', value: TYPE_DISPLAY.OXY },
];

function MonitorControler() {
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
    const userId = useSelector((state) => state.user.userInfo.id);
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

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Device Drivers </h2>
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
                    <FanControler roomId={selectedRoom && selectedRoom.value} companyId={companyId && companyId} />
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
                                    roomName={selectedRoom && selectedRoom.label}
                                    userId={userId}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default MonitorControler;
