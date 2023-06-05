import Modal from '~/components/Modal';
import { handleDeleteDevice } from '~/services/deviceService';
import { toast } from 'react-toastify';
import { ref, remove } from 'firebase/database';
import { database } from '~/firebase';
function ModalDeleteDevice({ ...props }) {
    const toggle = () => {
        props.toggleDeleteDeviceModal();
    };
    const { dataDeviceEdit } = props;
    const handleConfirmDelete = async () => {
        let res = await handleDeleteDevice(dataDeviceEdit.id);
        if (res.errCode === 0) {
            remove(
                ref(database, `${dataDeviceEdit.companyId}/${dataDeviceEdit.roomId}/statusDevice/${dataDeviceEdit.id}`),
            );
            toast.success('Delete Device Succeed!');
            props.toggleDeleteDeviceModal();
            props.updateInfoSuccees();
        } else {
            toast.error('Delete Device Failed!');
        }
    };

    return (
        <Modal
            isOpen={props.isOpen}
            size="sm"
            toggle={() => toggle()}
            titleModal="Confirm device erasure"
            clickOutside={true}
        >
            {dataDeviceEdit && (
                <>
                    <form>
                        <div className="row">
                            <div className="col c-12 m-8 l-8 m-o-2 l-o-2">
                                <div className="form-group">
                                    <label className="lable-input">Name Device:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={dataDeviceEdit.deviceName}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col c-12 m-8 l-8 m-o-2 l-o-2">
                                <div className="form-group">
                                    <label className="lable-input">Locatin:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={dataDeviceEdit.Room.name}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="btn">
                        <button className="btn-left" onClick={() => handleConfirmDelete()}>
                            Confirm
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

export default ModalDeleteDevice;
