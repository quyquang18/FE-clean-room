import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import styles from './MonitorRoom.module.scss';
import MonitorRealtime from './MonitorRealtime';
import * as actions from '~/store/actions';
import TimeTracking from './TimeTracking';

const cx = classNames.bind(styles);

var optionDisplay = [
    { type: 'current', label: 'Monitor RealTime', active: true },
    { type: 'old', label: 'Monitor Old', active: false },
];
function MonitorRoom() {
    document.title = 'LUXAS-Monitor Room';
    const [display, setDisplay] = useState('current');

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
    const userId = useSelector((state) => state.user.userInfo.id);
    const dispatch = useDispatch();
    const initSelectedRoom = useMemo(() => listRoom && listRoom.length > 0 && listRoom[0], [listRoom]);
    const [selectedRoom, setSelectedRoom] = useState(initSelectedRoom);

    useEffect(() => {
        dispatch(actions.fetchAllRoom(userId));
    }, []);
    useEffect(() => {
        if (listRoom && listRoom.length > 0 && !selectedRoom) {
            setSelectedRoom(initSelectedRoom);
        }
    }, [listRoom, selectedRoom, initSelectedRoom]);

    useEffect(() => {
        optionDisplay = [
            { type: 'current', label: 'Monitor RealTime', active: true },
            { type: 'old', label: 'Track previous time', active: false },
        ];
    }, []);

    const handleChangeRoom = (value) => {
        setSelectedRoom(value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('select-room')}>
                <Select value={selectedRoom} onChange={(event) => handleChangeRoom(event)} options={listRoom} />
            </div>

            <div className={cx('display-list')}>
                {optionDisplay.map((e, index) => (
                    <span
                        className={cx('list', { active: e.active })}
                        key={index}
                        value={display}
                        onClick={() => {
                            setDisplay(e.type);
                            optionDisplay.map((e) => {
                                return (e.active = false);
                            });
                            optionDisplay[index].active = true;
                        }}
                    >
                        {e.label}
                    </span>
                ))}
            </div>
            {display === 'current' && <MonitorRealtime roomId={selectedRoom && selectedRoom.value} />}
            {display === 'old' && <TimeTracking roomId={selectedRoom && selectedRoom.value} userId={userId} />}
        </div>
    );
}

export default MonitorRoom;
