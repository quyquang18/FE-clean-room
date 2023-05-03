import { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { handleGetDeviceAPI } from '~/services/deviceService';
import styles from './SelectDevice.module.scss';

function SelectDevice({ change = () => {}, isEnable = false, locationId }) {
    const user = useSelector((state) => state.user);
    const [listDevice, setListDevice] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await handleGetDeviceAPI(user.userInfor.roleID, locationId);
            if (response.errCode === 0) {
                let arrData = [];
                for (let i = 0; i < response.data.length; i++) {
                    arrData.push(response.data[i].Device);
                }
                setListDevice(arrData);
            }
        }
        fetchData();
    }, [locationId, user]);
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
