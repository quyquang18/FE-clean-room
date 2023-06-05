import Modal from '~/components/Modal';
import { format, getTime } from 'date-fns';
import { toast } from 'react-toastify';
import { apiConfirmUserByCompany } from '~/services/userService';
function ModalConfirmUser({ ...props }) {
    const toggle = () => {
        props.toggleModalConfirmUser();
    };

    let { dataUser } = props;
    const handleConfirmCompany = async () => {
        let res = await apiConfirmUserByCompany({ userId: dataUser.id, companyId: dataUser.companyId });
        if (res && res.errCode === 0) {
            toast.success('Successful company confirmation');
            props.confirmSuceess();
        } else {
            toast.error('Failed company confirmation');
        }
        props.toggleModalConfirmUser();
    };
    let time = dataUser && getTime(new Date(dataUser.createdAt));
    const timeString = format(time, 'HH:mm -- dd/MM/yyyy');
    return (
        <Modal
            isOpen={props.isOpen}
            size="lg"
            toggle={() => toggle()}
            titleModal="Modal Confirm User"
            clickOutside={false}
        >
            {dataUser && (
                <>
                    <form>
                        <div className="row">
                            <div className="col c-6 m-6 l-6">
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        disabled={true}
                                        value={dataUser.email}
                                    />
                                </div>
                            </div>
                            <div className="col c-6 m-6 l-6">
                                <div className="form-group">
                                    <label>User Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={dataUser.username}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col c-6 m-6 l-6">
                                <div className="form-group">
                                    <label>Phonenumber:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={dataUser.phonenumber}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="col c-6 m-6 l-6">
                                <div className="form-group">
                                    <label>Time Create:</label>
                                    <input type="text" className="form-control" value={timeString} disabled={true} />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="btn">
                        <button className="btn-left" onClick={() => handleConfirmCompany()}>
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

export default ModalConfirmUser;
