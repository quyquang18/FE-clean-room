import Modal from '~/components/Modal';
import { format, getTime } from 'date-fns';
import { toast } from 'react-toastify';
import { apiConfirmCompany } from '~/services/userService';
function ModalConfirmCompany({ ...props }) {
    const toggle = () => {
        props.toggleModalConfirmCompany();
    };

    let { dataCompany } = props;

    const handleConfirmCompany = async () => {
        let res = await apiConfirmCompany({ companyId: dataCompany.id });
        if (res && res.errCode === 0) {
            toast.success('Successful company confirmation');
            props.confirmSuceess();
        } else {
            toast.error('Failed company confirmation');
        }
        props.toggleModalConfirmCompany();
    };
    let time = getTime(new Date(dataCompany.createdAt));
    const timeString = format(time, 'HH:mm -- dd/MM/yyyy');
    return (
        <Modal
            isOpen={props.isOpen}
            size="lg"
            toggle={() => toggle()}
            titleModal="Modal Confirm Company"
            clickOutside={false}
        >
            {dataCompany && (
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
                                        value={dataCompany.email}
                                    />
                                </div>
                            </div>
                            <div className="col c-6 m-6 l-6">
                                <div className="form-group">
                                    <label>Company Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={dataCompany.name}
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
                                        value={dataCompany.phonenumber}
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
                        <div className="row">
                            <div className="col c-12 m-12 l-12">
                                <div className="form-group">
                                    <label>Address:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={dataCompany.address}
                                        disabled={true}
                                    />
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

export default ModalConfirmCompany;
