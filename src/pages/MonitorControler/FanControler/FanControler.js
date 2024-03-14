import classNames from 'classnames/bind';
import { useState, useMemo, useEffect, useReducer } from 'react';
import { ref, child, onValue, update } from 'firebase/database';
import Select from 'react-select';
import { database } from '~/firebase';
import ProgressBar from '~/components/ProgressBar';
import * as actions from '~/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FanControler.module.scss';

import { FanIcon, MinusIcon, PlusIcon, DashedCircleIcon, PowerIcon } from '~/components/Icons';
import { MODAL, StatusOnOff, TYPE_DISPLAY } from '~/utils';

const listModalControl = [
    { label: 'Manual', value: MODAL.MANUAL },
    { label: 'Automation', value: MODAL.AUTOMATION },
];
const dbRef = ref(database);
const cx = classNames.bind(styles);

function FanControler({ companyId, roomId }) {
    const [statusFan, setStatusFan] = useState(StatusOnOff.OFF);
    const [selectedModalControllerFan, setSelectedModalControllerFan] = useState(listModalControl[0]);
    useEffect(() => {
        if (companyId && roomId) {
            onValue(child(dbRef, `${companyId}/${roomId}/deviceControler/Fan`), (snapshot) => {
                if (snapshot.val() && snapshot.val().Speed && snapshot.val().Status) {
                    setValueFan(snapshot.val().Speed);
                    setStatusFan(snapshot.val().Status);
                }
            });
            onValue(child(dbRef, `${companyId}/${roomId}/deviceControler/Fan/Modal`), (snapshot) => {
                if (snapshot.val()) {
                    let valueSelected = listModalControl.find((element) => element.value === snapshot.val());
                    setSelectedModalControllerFan(valueSelected);
                }
            });
        }
    }, [companyId, roomId]);
    const [valueFan, setValueFan] = useState(10);
    const handleChangeSpeedFan = (action) => {
        let coppyValueFan = valueFan;
        switch (action) {
            case 'PLUS':
                if (coppyValueFan < 30) {
                    coppyValueFan += 1;
                    break;
                } else {
                    coppyValueFan = 30;
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
        if (companyId && roomId) {
            // eslint-disable-next-line no-useless-concat
            updates[`${companyId}/${roomId}/deviceControler/Fan/` + 'Speed'] = coppyValueFan;
            update(dbRef, updates);
        }
    };
    const handleChangeStatusFan = () => {
        if (statusFan === StatusOnOff.ON) {
            setStatusFan(StatusOnOff.OFF);
            if (companyId && roomId) {
                const updates = {};
                // eslint-disable-next-line no-useless-concat
                updates[`${companyId}/${roomId}/deviceControler/Fan/` + 'Status'] = StatusOnOff.OFF;
                update(dbRef, updates);
            }
        }
        if (statusFan === StatusOnOff.OFF) {
            setStatusFan(StatusOnOff.ON);
            if (companyId && roomId) {
                const updates = {};
                // eslint-disable-next-line no-useless-concat
                updates[`${companyId}/${roomId}/deviceControler/Fan/` + 'Status'] = StatusOnOff.ON;
                update(dbRef, updates);
            }
        }
    };
    const handleChangeModalControlFan = (event) => {
        setSelectedModalControllerFan(event);
        if (companyId && roomId) {
            const updates = {};
            // eslint-disable-next-line no-useless-concat
            updates[`${companyId}/${roomId}/deviceControler/Fan/` + 'Modal'] = event.value;
            update(dbRef, updates);
        }
    };
    return (
        <div>
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
                        <p>{statusFan === StatusOnOff.ON ? 'ON' : 'OFF'}</p>
                    </span>
                </div>
                <div className={cx('modal-controler')}>
                    <Select
                        value={selectedModalControllerFan}
                        onChange={(event) => handleChangeModalControlFan(event)}
                        options={listModalControl}
                    />
                </div>
                <div>
                    <span className={cx('speed-control')}>
                        <span className={cx('control-value')}>
                            <button
                                className={cx('btn-set-value')}
                                disabled={
                                    selectedModalControllerFan && selectedModalControllerFan.value === MODAL.AUTOMATION
                                }
                                onClick={() => handleChangeSpeedFan('MINUS')}
                            >
                                <MinusIcon className={cx('icon-btn')} />
                            </button>
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
                            <button
                                disabled={
                                    selectedModalControllerFan && selectedModalControllerFan.value === MODAL.AUTOMATION
                                }
                                onClick={() => handleChangeSpeedFan('PLUS')}
                                className={cx('btn-set-value')}
                            >
                                <PlusIcon className={cx('icon-btn')} />
                            </button>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default FanControler;
