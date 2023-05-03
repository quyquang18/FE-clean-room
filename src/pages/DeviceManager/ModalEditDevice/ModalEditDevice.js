import Select from 'react-select';
import Modal from '~/components/Modal';
import { useMemo, useState } from 'react';
import { handleUpdateDevice } from '~/services/deviceService';
import { toast } from 'react-toastify';

function ModalEditDevice({ ...props }) {
    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                if (type === 'room') {
                    object.label = item.name;
                    object.value = item.id;
                } else {
                    object.label = item.valueVI;
                    object.value = item.keyMap;
                }
                result.push(object);
                return true;
            });
            return result;
        }
    };
    let lisTypeDevice = buildDataInputSelect(props.lisTypeDevice);
    let listRoom = buildDataInputSelect(props.listRoom, 'room');

    const toggle = () => {
        props.toggleEditDeviceModal();
    };
    const { dataDeviceEdit } = props;
    const initSelectedRoom = useMemo(
        () => listRoom && listRoom.length > 0 && listRoom.find((element) => element.value === dataDeviceEdit.roomId),
        [dataDeviceEdit, listRoom],
    );
    const [selectedRoom, setSelectedRoom] = useState(initSelectedRoom);
    const initSelectedTypeDevice = useMemo(
        () =>
            lisTypeDevice &&
            lisTypeDevice.length > 0 &&
            lisTypeDevice.find((element) => element.value === dataDeviceEdit.typeDevice),
        [dataDeviceEdit, lisTypeDevice],
    );
    const [selectedTypeDevice, setSelectedTypeDevice] = useState(initSelectedTypeDevice);
    const initNameDevice = useMemo(() => dataDeviceEdit.deviceName, [dataDeviceEdit]);
    const [deviceName, setDeviceName] = useState(initNameDevice);

    const handleEditDevice = async () => {
        let data = {};
        data.typeDevice = selectedTypeDevice.value;
        data.roomId = selectedRoom.value;
        data.deviceName = deviceName;
        data.idDevice = dataDeviceEdit.id;

        let res = await handleUpdateDevice(data);
        if (res.errCode === 0) {
            toast.success('Update Info Device Succeed!');
            props.toggleEditDeviceModal();
            props.updateInfoSuccees(data);
        } else {
            toast.error('Update Info Device Failed!');
        }
    };

    const handleChangeRoom = (value) => {
        setSelectedRoom(value);
    };
    const handleChangeTypeDevice = (value) => {
        setSelectedTypeDevice(value);
    };
    const handleChangeDeviceName = (event) => {
        setDeviceName(event.target.value);
    };
    return (
        <Modal
            isOpen={props.isOpen}
            size="sm"
            toggle={() => toggle()}
            titleModal="Modal Edit Device"
            clickOutside={false}
        >
            {dataDeviceEdit && (
                <>
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="lable-input">Name Device:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={deviceName}
                                        onChange={(event) => handleChangeDeviceName(event)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="lable-input">Locatin:</label>
                                    <Select
                                        value={selectedRoom}
                                        onChange={(event) => handleChangeRoom(event)}
                                        options={listRoom}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="lable-input">Type:</label>
                                    <Select
                                        value={selectedTypeDevice}
                                        onChange={(event) => handleChangeTypeDevice(event)}
                                        options={lisTypeDevice}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="btn">
                        <button className="btn-left" onClick={() => handleEditDevice()}>
                            Save Changes
                        </button>
                        <button className="btn-right" onClick={() => toggle()}>
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </Modal>
    );
}

export default ModalEditDevice;
