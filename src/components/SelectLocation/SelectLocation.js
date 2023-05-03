import { useEffect, useState, memo } from 'react';
import { handleGetLocation } from '~/services/deviceService';
import styles from './Selects.module.scss';

function SelectLocation({ change = () => {}, isEnable = false }) {
    // const userId = JSON.parse(localStorage.getItem('user')).userInfo.id || 0;

    // const [listLocation, setListLocation] = useState([]);
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await handleGetLocation(userId);
    //         if (response.errCode === 0) {
    //             setListLocation(response.data);
    //         }
    //     }
    //     fetchData();
    // }, [userId]);
    // const handleChangeSelect = (value) => {
    //     change(JSON.parse(value));
    // };
    return (
        <div className={styles['wrapper']}>
            {/* <select
                className={styles['select']}
                disabled={isEnable}
                onChange={(e) => handleChangeSelect(e.target.value)}
            >
                <option value={0}>{`Select location.....`}</option>
                {listLocation &&
                    listLocation.map((item, index) => (
                        <option
                            key={index}
                            value={JSON.stringify({ locationId: item.id, locationName: item.location })}
                        >
                            {item.location}
                        </option>
                    ))}
            </select> */}
        </div>
    );
}

export default memo(SelectLocation);
