import classNames from 'classnames/bind';
import { format } from 'date-fns';
import * as FileSaver from 'file-saver';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils';
import styles from './TableStatusDevice.module.scss';

const cx = classNames.bind(styles);
function TableStatusDevice({ data = [], time, roomName, deviceName }) {
    const fileExtension = '.xlsx';
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    var filename = 'Value status device';
    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };
    const header = ['Room', 'Device', 'Status', 'State Start Time', 'State End Time', 'Status Time', 'Date'];
    const renderTableHeader = () => {
        return header.map((item, index) => {
            return (
                <th className={cx('th')} key={index}>
                    {item}
                </th>
            );
        });
    };
    const dispatch = useDispatch();
    let listStatus = useSelector((state) => state.admin.arrStatus);
    let language = useSelector((state) => state.app.language);
    useEffect(() => {
        dispatch(actions.fetchStatusDevice());
    }, [dispatch]);
    const handleDataTable = () => {
        let dataTable = [];
        if (data && data.length > 0) {
            dataTable = data.map((item, index) => {
                let object = {};
                let valueStatus = '';
                if (language === LANGUAGES.VI) {
                    valueStatus = listStatus.find((element) => element.keyMap === item.status).valueVI;
                }
                if (language === LANGUAGES.EN) {
                    valueStatus = listStatus.find((element) => element.keyMap === item.status).valueEN;
                }
                let statusTime = new Date(+item.stateEndTime - +item.stateStartTime).toISOString().substr(11, 8);
                object.date = format(+item.date, 'dd/MM/yyyy');
                object.status = valueStatus;
                object.stateEndTime = format(+item.stateEndTime, 'HH:mm:ss');
                object.stateStartTime = format(+item.stateStartTime, 'HH:mm:ss');
                object.statusTime = statusTime;
                return object;
            });
        }
        return dataTable;
    };
    const renderTableData = () => {
        let dataTable = handleDataTable();
        if (dataTable && dataTable.length > 0) {
            return dataTable.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{roomName}</td>
                        <td>{deviceName}</td>
                        <td>{item.status}</td>
                        <td>{item.stateStartTime}</td>
                        <td>{item.stateEndTime}</td>
                        <td>{item.statusTime}</td>
                        <td>{item.date}</td>
                    </tr>
                );
            });
        } else {
            return (
                <tr>
                    <td
                        style={{ textAlign: 'center', fontSize: '1.6rem', color: 'red', fontWeight: 'bold' }}
                        colSpan="8"
                    >
                        {'No data'}
                    </td>
                </tr>
            );
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

export default TableStatusDevice;
