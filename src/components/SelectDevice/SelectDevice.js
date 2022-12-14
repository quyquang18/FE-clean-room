import { useEffect, useState, memo } from 'react';
import { handleGetDeviceAPI } from '~/services/deviceService';
import styles from './SelectDevice.module.scss';

function SelectDevice({ change = () => {}, isEnable = false, locationId }) {
    const userId = JSON.parse(localStorage.getItem('user')).userInfo.id || 0;

    const [listDevice, setListDevice] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await handleGetDeviceAPI(userId, locationId);
            if (response.errCode === 0) {
                let arrData = [];
                for (let i = 0; i < response.data.length; i++) {
                    arrData.push(response.data[i].Device);
                }
                setListDevice(arrData);
            }
        }
        fetchData();
    }, [locationId, userId]);
    const handleChangeSelect = (value) => {
        change(JSON.parse(value));
    };
    return (
        <div className={styles['wrapper']}>
            <select
                className={styles['select']}
                disabled={isEnable}
                onChange={(e) => handleChangeSelect(e.target.value)}
            >
                <option value={0}>{`Select device.....`}</option>
                {listDevice &&
                    listDevice.map((item, index) => (
                        <option key={index} value={JSON.stringify({ deviceId: item.id, deviceName: item.deviceName })}>
                            {item.deviceName}
                        </option>
                    ))}
            </select>
        </div>
    );
}

export default memo(SelectDevice);
