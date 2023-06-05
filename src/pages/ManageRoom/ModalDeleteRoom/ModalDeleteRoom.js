import Modal from '~/components/Modal';
import { apiDeleteRoom } from '~/services/roomService';
import { toast } from 'react-toastify';
import { ref, remove } from 'firebase/database';
import { database } from '~/firebase';
function ModalDeleteRoom({ ...props }) {
    const toggle = () => {
        props.toggleDeleteRoomModal();
    };
    const { dataRoom } = props;
    const handleConfirmDelete = async () => {
        let res = await apiDeleteRoom({ roomId: dataRoom.id, companyId: dataRoom.companyId });
        if (res.errCode === 0) {
            remove(ref(database, `${dataRoom.companyId}/${dataRoom.id}`));
            toast.success('Delete Device Succeed!');
            props.toggleDeleteRoomModal();
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
            {dataRoom && (
                <>
                    <form>
                        <div className="row">
                            <div className="col c-12 m-8 l-8 m-o-2 l-o-2">
                                <div className="form-group">
                                    <label className="lable-input">Room Name:</label>
                                    <input className="form-control" type="text" value={dataRoom.name} disabled={true} />
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

export default ModalDeleteRoom;
