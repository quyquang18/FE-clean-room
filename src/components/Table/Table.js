import classNames from 'classnames/bind';
import { format } from 'date-fns';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import styles from './Table.module.scss';

const cx = classNames.bind(styles);
function Table({
    data = [],
    time,
    type = 'valuesensor',
    header = [
        'ID',
        'Temperatu',
        'Humidi',
        'Dust 2.5µm',
        'Dust 10µm',
        'Pressure In',
        'Pressure Out',
        'Time',
        'Year - Month - Day',
        'Location ID',
    ],
}) {
    const fileExtension = '.xlsx';
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };
    var filename = 'Value Sensor';
    if (type === 'value-status') {
        header = ['ID', 'Location', 'Device', 'Status', 'State Start Time', 'State End Time', 'Status Time', 'Date'];
        filename = 'Status device';
    }
    const renderTableHeader = () => {
        return header.map((item, index) => {
            return (
                <th className={cx('th')} key={index}>
                    {item}
                </th>
            );
        });
    };
    console.log(data);
    const renderTableData = () => {
        if (type === 'valuesensor') {
            console.log(data);
            return data.map((item, index) => {
                const { temperature, humidity, dust25, dust10, pressIn, pressOut, date, roomId } = item;
                let formatedDate = format(+date, 'dd:MM:yyyy');
                let formatedTime = format(+date, 'HH:mm:ss');
                return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{temperature}</td>
                        <td>{humidity}</td>
                        <td>{dust25}</td>
                        <td>{dust10}</td>
                        <td>{pressIn}</td>
                        <td>{pressOut}</td>
                        <td>{formatedTime}</td>
                        <td>{formatedDate}</td>
                        <td>{roomId}</td>
                    </tr>
                );
            });
        }
        if (type === 'value-status') {
            return data.map((item, index) => {
                const { date, device, location, stateEndTime, stateStartTime, status, statusTime } = item;
                return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{location}</td>
                        <td>{device}</td>
                        <td>{status}</td>
                        <td>{stateStartTime}</td>
                        <td>{stateEndTime}</td>
                        <td>{statusTime}</td>
                        <td>{date}</td>
                    </tr>
                );
            });
        }
        if (type === 'value') {
            return data.map((item, index) => {
                const { location, status, date, start_status_time, end_state_time, status_time } = item;
                return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{location}</td>
                        <td>{status}</td>
                        <td>{start_status_time}</td>
                        <td>{end_state_time}</td>
                        <td>{status_time}</td>
                        <td>{date}</td>
                    </tr>
                );
            });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('table')}>
                <table className={cx('fl-table')}>
                    <tbody>
                        <tr className={cx('tbl-header')}>{renderTableHeader()}</tr>
                    </tbody>
                    <tbody className={cx('tbl-content')}>{renderTableData()}</tbody>
                </table>
            </div>
            <div className={cx('btn-wrapper')}>
                <button className={cx('btn-export')} onClick={(e) => exportToCSV(data, filename)}>
                    Export Excel
                </button>
            </div>
        </div>
    );
}

export default Table;
