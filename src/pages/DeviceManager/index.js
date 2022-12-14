import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { MdDeleteForever } from 'react-icons/md';
// import AddDevice from '../AddDevice';
import Button from '~/components/Button';
import { PlusIcon } from '~/components/Icons';
import { handleGetDeviceAPI, handleUpdateDevice, handleDeleteDevice } from '~/services/deviceService';
import styles from './DeviceManager.module.scss';
import Modal from '~/components/Modal/Modal';

const cx = className.bind(styles);

function DeviceManager() {
    const [arrDevice, setArrAcc] = useState([]);
    const [newDeviceName, setNewDeviceName] = useState();
    const [newTypeDevice, setNewTypeDevice] = useState();

    const userId = JSON.parse(localStorage.getItem('user')).userInfo.id ||0;

    useEffect(() => {
        callApi();
    }, []);
    const callApi = async () => {
        try {
            let data = await handleGetDeviceAPI(userId, 'all');
            if (data && data.errCode !== 0) {
                console.log(data.message);
            }
            if (data && data.errCode === 0) {
                setArrAcc(data.data);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    console.log(error.response);
                }
            }
        }
    };
    const toggleActionEdit = async (value, item) => {
        if (value === 'confirm') {
            await handleUpdateDevice(item.Device.id, newDeviceName, newTypeDevice);
            callApi();
        } else {
            return;
        }
    };
    const toggleActionDelete = async (value, item) => {
        console.log(value, item);
        if (value === 'confirm') {
            console.log('call delete');
            await handleDeleteDevice(item.Device.id);
            callApi();
        } else {
            return;
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Device Manager</h2>
            <div className={cx('btn-add-device')}>
                <Button leftIcon={<PlusIcon />} to="./add-device" primary>
                    Add New Device
                </Button>
            </div>
            <div className={cx('list-device')}>
                <h3 className={cx('title')}>List Device</h3>
                <div className={cx('acc-table')}>
                    <table className={cx('table')} id="customers">
                        <thead>
                            <tr className={cx('tr')}>
                                <th>Deive Name</th>
                                <th>Type</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrDevice.map((item, index) => (
                                <tr className={cx('tr')} key={index}>
                                    <td>{item.Device.deviceName}</td>
                                    <td>{item.Device.typeDevice}</td>
                                    <td>{item.location}</td>
                                    <td>
                                        <Modal
                                            child={
                                                <>
                                                    <div className={cx('form-group')}>
                                                        <label>Deviece Name</label>
                                                        <input
                                                            name="deviceName"
                                                            type="text"
                                                            defaultValue={item.Device.deviceName}
                                                            className={cx('form-input')}
                                                            onBlur={(e) => {
                                                                setNewDeviceName(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={cx('form-group')}>
                                                        <label>Location</label>
                                                        <input
                                                            name="location"
                                                            type="text"
                                                            defaultValue={item.location}
                                                            className={cx('form-input')}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className={cx('form-group')}>
                                                        <label>Type Device</label>
                                                        <input
                                                            name="typedevice"
                                                            type="text"
                                                            defaultValue={item.Device.typeDevice}
                                                            className={cx('form-input')}
                                                            onBlur={(e) => {
                                                                setNewTypeDevice(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </>
                                            }
                                            childBtn={<HiPencilAlt />}
                                            colorBtn="green"
                                            titleModal="Edit Device"
                                            toggleFromParent={toggleActionEdit}
                                            item={item}
                                        />
                                        <Modal
                                            child="Are you sure you want to delete?"
                                            colorBtn="red"
                                            childBtn={<MdDeleteForever />}
                                            toggleFromParent={toggleActionDelete}
                                            item={item}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DeviceManager;
