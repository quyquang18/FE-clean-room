import { useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '~/components/Modal';
import { handleUpdateValueThreshold } from '~/services/deviceService';

function ModalSettingsThreshold({ ...props }) {
    const initialState = {
        valueUp1: props.valueThreshold1.valueUp,
        valueDown1: props.valueThreshold1.valueDown,
        init1: props.valueThreshold1.init,
        valueUp2: props.valueThreshold2.valueUp,
        valueDown2: props.valueThreshold2.valueDown,
        init2: props.valueThreshold2.init,
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    function reducer(state, action) {
        let coppyState = { ...state };
        coppyState[action.type] = action.payload;
        return { ...coppyState };
    }
    const handleChangeInput = (event, key) => {
        dispatch({ type: key, payload: event.target.value });
    };
    const toggle = () => {
        props.toggleEditUserModal();
    };

    const handleEditValueThreshold = async () => {
        let statusUpdate = true;
        if (state.valueUp1 && state.valueDown1) {
            let data = {};
            data.Type_sensor = props.valueThreshold1.Type_sensor;
            data.roomId = props.valueThreshold1.roomId;
            data.userId = props.valueThreshold1.userId;
            data.valueUp = state.valueUp1;
            data.valueDown = state.valueDown1;
            data.init = state.init1;
            let res = await handleUpdateValueThreshold(data);
            if (res && res.errCode === 0) {
                statusUpdate = true;
            } else {
                statusUpdate = false;
            }
        }
        if (state.valueUp2 && state.valueDown2) {
            let data = {};
            data.Type_sensor = props.valueThreshold2.Type_sensor;
            data.roomId = props.valueThreshold2.roomId;
            data.userId = props.valueThreshold2.userId;
            data.valueUp = state.valueUp2;
            data.valueDown = state.valueDown2;
            data.init = state.init2;
            let res = await handleUpdateValueThreshold(data);
            if (res && res.errCode === 0) {
                statusUpdate = true;
            } else {
                statusUpdate = false;
            }
        }
        if (statusUpdate) {
            toast.success('Update value Threshold succeed !');
            props.toggleEditUserModal();
        } else {
            toast.error('Update value Threshold failed !');
        }
    };
    return (
        <Modal
            isOpen={props.isOpen}
            size="lg"
            toggle={() => toggle()}
            titleModal="Modal Settings value Threshold"
            clickOutside={false}
        >
            {props.valueThreshold1 && (
                <>
                    <form>
                        <div className="row">
                            <span className="col-12" style={{ fontWeight: 'bold' }}>
                                {props.valueThreshold1.Type_sensor}
                            </span>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="lable-input">Value Up:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.valueUp1}
                                        onChange={(item) => handleChangeInput(item, 'valueUp1')}
                                    />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="lable-input">Value Down:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={state.valueDown1}
                                        onChange={(item) => handleChangeInput(item, 'valueDown1')}
                                    />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="lable-input">Init:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={state.init1}
                                        onChange={(item) => handleChangeInput(item, 'init1')}
                                    />
                                </div>
                            </div>
                        </div>
                        {props.valueThreshold2 && props.valueThreshold2.Type_sensor && (
                            <>
                                <div className="row">
                                    <span className="col-12" style={{ fontWeight: 'bold' }}>
                                        {props.valueThreshold2.Type_sensor}
                                    </span>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label className="lable-input">Value Up:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={state.valueUp2}
                                                onChange={(item) => handleChangeInput(item, 'valueUp2')}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label className="lable-input">Value Down:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={state.valueDown2}
                                                onChange={(item) => handleChangeInput(item, 'valueDown2')}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label className="lable-input">Value Down:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={state.init2}
                                                onChange={(item) => handleChangeInput(item, 'init2')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </form>
                    <div className="btn">
                        <button className="btn-left" onClick={() => handleEditValueThreshold()}>
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

export default ModalSettingsThreshold;
