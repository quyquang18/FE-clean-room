import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';
import StatisticalTables from './StatisticalTables';
import HightChart from '~/components/HightChart';
import Table from '~/components/Table';
import styles from './TimeTracking.module.scss';
import CustomDatePicker from '~/components/CustomDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfDay, getTime } from 'date-fns';
import { getValueSensorByTime } from '~/services/roomService';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
const listViewMode = [
    { value: 'date', label: 'By Date' },
    { value: 'month', label: 'By Monthly' },
    { value: 'range', label: 'By time range' },
];

function TimeTracking({ roomId, userId }) {
    const [selectedViewMode, setSelectedViewMode] = useState();
    const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
    const [typeSee, setTypeSee] = useState({ char: false, table: false });
    const [data, setData] = useState([]);
    const handleSeeChart = () => {
        if (!roomId) {
            toast.error('vui long chon room');
        } else {
            setTypeSee({ char: true, table: false });
        }
    };
    const handleSeeTable = () => {
        if (!roomId) {
            toast.error('vui long chon room');
        } else {
            setTypeSee({ char: false, table: true });
        }
    };
    const handleChangeViewMode = (value) => {
        setSelectedViewMode(value);
    };
    const handleGetValueSensor = useCallback(async () => {
        let fomatedDate;
        if (selectedDate && selectedDate.length > 1) {
            fomatedDate = [getTime(selectedDate[0]), getTime(selectedDate[1])];
            if (selectedViewMode) {
                let res = await getValueSensorByTime(selectedViewMode.value, userId, roomId, fomatedDate);
                if (res && res.errCode === 0) {
                    setData(res.data);
                }
            }
        } else {
            fomatedDate = getTime(selectedDate);
            if (selectedViewMode) {
                let res = await getValueSensorByTime(selectedViewMode.value, userId, roomId, fomatedDate);
                if (res && res.errCode === 0) {
                    setData(res.data);
                }
            }
        }
    }, [selectedViewMode, roomId, selectedDate, userId]);
    useEffect(() => {
        handleGetValueSensor();
    }, [handleGetValueSensor]);

    const handleChangeDatePicker = async (date) => {
        if (date && date.length > 1) {
            setSelectedDate([date[0], date[1]]);
        } else {
            setSelectedDate(date);
        }
    };
    return (
        <>
            <div className={cx('select-wrapper', 'row')}>
                <div className={cx('select-view-mode', 'col c-5 m-3 l-3')}>
                    <Select
                        value={selectedViewMode}
                        onChange={(event) => handleChangeViewMode(event)}
                        options={listViewMode}
                        isClearable
                    />
                </div>
                <div className={cx('select-time', 'col c-7 m-4 l-4')}>
                    <CustomDatePicker
                        showIcon
                        selected={selectedDate}
                        onChange={(date, type) => handleChangeDatePicker(date, type)}
                        typeShow={selectedViewMode && selectedViewMode.value}
                        maxDate={startOfDay(new Date()).getTime()}
                    />
                </div>
                <div className={cx('btn-wrapper', 'col c-12 m-5 l-5')}>
                    <div className="row">
                        <button className={cx('btn-see', 'col c-4 m-4 l-4')} onClick={handleSeeChart}>
                            See Chart
                        </button>
                        <button className={cx('btn-see', 'col c-4 m-4 l-4')} onClick={handleSeeTable}>
                            See Table
                        </button>
                    </div>
                </div>
            </div>
            {typeSee.char && (
                <HightChart
                    data={data}
                    mode={selectedViewMode && selectedViewMode.value}
                    valueTime={selectedDate}
                    // valueTimeTo={valueTimeTo}
                />
            )}
            {typeSee.table && (
                <>
                    <StatisticalTables data={data} />
                    <Table data={data} />
                </>
            )}
        </>
    );
}

export default TimeTracking;
