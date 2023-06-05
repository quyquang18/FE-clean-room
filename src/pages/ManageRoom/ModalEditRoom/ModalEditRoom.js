import Modal from '~/components/Modal';
import { useMemo, useState } from 'react';
import { updateInfoRoom } from '~/services/roomService';
import { toast } from 'react-toastify';

function ModalEditDevice({ ...props }) {
    const toggle = () => {
        props.toggleEditRoomModal();
    };
    const { dataRoom } = props;

    const initNameRoom = useMemo(() => dataRoom.name, [dataRoom]);
    const [roomName, setRoomName] = useState(initNameRoom);

    const handleEditDevice = async () => {
        let data = {};
        data.roomName = roomName;
        data.roomId = dataRoom.id;
        data.companyId = dataRoom.companyId;
        let res = await updateInfoRoom(data);
        if (res.errCode === 0) {
            toast.success('Update Info Device Succeed!');
            props.toggleEditRoomModal();
            props.updateInfoSuccees(data);
        } else {
            toast.error(res.message);
        }
    };

    const handleChangeDeviceName = (event) => {
        setRoomName(event.target.value);
    };
    return (
        <Modal
            isOpen={props.isOpen}
            size="sm"
            toggle={() => toggle()}
            titleModal="Modal Edit Room"
            clickOutside={false}
        >
            {dataRoom && (
                <>
                    <form>
                        <div className="row">
                            <div className="col c-12 m-12 l-12">
                                <div className="form-group">
                                    <label className="lable-input">Name Room:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={roomName}
                                        onChange={(event) => handleChangeDeviceName(event)}
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
