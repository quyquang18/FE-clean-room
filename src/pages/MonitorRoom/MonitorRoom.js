import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import styles from './MonitorRoom.module.scss';
import MonitorRealtime from './MonitorRealtime';
import * as actions from '~/store/actions';
import TimeTracking from './TimeTracking';

const cx = classNames.bind(styles);

var optionDisplay = [];
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
    const companyId = useSelector((state) => state.user.userInfo.companyId);
    const dispatch = useDispatch();
    const initSelectedRoom = useMemo(() => listRoom && listRoom.length > 0 && listRoom[0], [listRoom]);
    const [selectedRoom, setSelectedRoom] = useState(initSelectedRoom);

    useEffect(() => {
        dispatch(actions.fetchAllRoom(companyId));
    }, [companyId, dispatch]);
    useEffect(() => {
        if (listRoom && listRoom.length > 0 && !selectedRoom) {
            setSelectedRoom(initSelectedRoom);
        }
    }, [listRoom, selectedRoom, initSelectedRoom]);

    useEffect(() => {
        optionDisplay = [
            { type: 'current', label: <FormattedMessage id="monitor-room.option-display-1" />, active: true },
            { type: 'old', label: <FormattedMessage id="monitor-room.option-display-2" />, active: false },
        ];
    }, []);

    const handleChangeRoom = (value) => {
        setSelectedRoom(value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('select-room', 'row')}>
                <div className="col l-3 m-4 c-5">
                    <Select value={selectedRoom} onChange={(event) => handleChangeRoom(event)} options={listRoom} />
                </div>
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
            {display === 'current' && (
                <MonitorRealtime roomId={selectedRoom && selectedRoom.value} companyId={companyId} />
            )}
            {display === 'old' && <TimeTracking roomId={selectedRoom && selectedRoom.value} companyId={companyId} />}
        </div>
    );
}

export default MonitorRoom;
