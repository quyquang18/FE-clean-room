import { onValue, ref, child, update } from 'firebase/database';
import { useReducer } from 'react';
import { toast } from 'react-toastify';

import Modal from '~/components/Modal';
import { handleUpdateValueThresholdInDb } from '~/services/deviceService';
import { database } from '~/firebase';
const dbRef = ref(database);

function ModalSettingsThreshold({ ...props }) {
    const initialState = {
        valueUp1: props.valueThreshold1.valueUp || '',
        valueDown1: props.valueThreshold1.valueDown || '',
        unit1: props.valueThreshold1.unit || '',
        valueUp2: props.valueThreshold2.valueUp || '',
        valueDown2: props.valueThreshold2.valueDown || '',
        unit2: props.valueThreshold2.unit || '',
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
            data.companyId = props.valueThreshold1.companyId;
            data.valueUp = state.valueUp1;
            data.valueDown = state.valueDown1;
            data.unit = state.unit1;
            let res = await handleUpdateValueThresholdInDb(data);
            await handleUpdateInFirebase(data);
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
            data.companyId = props.valueThreshold2.companyId;
            data.valueUp = state.valueUp2;
            data.valueDown = state.valueDown2;
            data.unit = state.unit2;
            let res = await handleUpdateValueThresholdInDb(data);
            await handleUpdateInFirebase(data);
            if (res && res.errCode === 0) {
                statusUpdate = true;
            } else {
                statusUpdate = false;
            }
        }
        if (statusUpdate) {
            toast.success('Update of Threshold value to database succeed !');
            props.toggleEditUserModal();
            props.updateSucceed(props.valueThreshold1.Type_sensor, props.valueThreshold2.Type_sensor);
        } else {
            toast.error('Update of Threshold value to database failed!');
        }
    };
    const handleUpdateInFirebase = (data) => {
        onValue(
            child(dbRef, `${data.companyId}/${data.roomId}/valueThreshold/${data.Type_sensor}`),
            (snapshot) => {
                var exists = snapshot.exists();
                let resData = snapshot.val();
                if (exists) {
                    if (
                        resData.companyId === data.companyId &&
                        resData.roomId === data.roomId &&
                        resData.typeDevice === data.typeDevice &&
                        resData.valueDown === data.valueDown &&
                        resData.valueUp === data.valueUp
                    ) {
                        return true;
                    } else {
                        const updates = {};
                        updates[`${data.companyId}/${data.roomId}/valueThreshold/${data.Type_sensor}`] = data;
                        update(dbRef, updates);
                    }
                } else {
                    const updates = {};
                    updates[`${data.companyId}/${data.roomId}/valueThreshold/${data.Type_sensor}`] = data;
                    update(dbRef, updates);
                }
            },
            {
                onlyOnce: true,
            },
        );
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
                            <span className="col c-12" style={{ fontWeight: 'bold' }}>
                                {props.valueThreshold1.Type_sensor}
                            </span>
                        </div>
                        <div className="row">
                            <div className="col c-6 m-4 l-4">
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
                            <div className="col c-6 m-4 l-4">
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
                            <div className="col c-12 m-4 l-4">
                                <div className="form-group">
                                    <label className="lable-input">Unit:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={state.unit1}
                                        onChange={(item) => handleChangeInput(item, 'unit1')}
                                    />
                                </div>
                            </div>
                        </div>
                        {props.valueThreshold2 && props.valueThreshold2.Type_sensor && (
                            <>
                                <div className="row">
                                    <span className="col c-12 m-12 l-12" style={{ fontWeight: 'bold' }}>
                                        {props.valueThreshold2.Type_sensor}
                                    </span>
                                </div>
                                <div className="row">
                                    <div className="col c-6 m-4 l-4">
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
                                    <div className="col c-6 m-4 l-4">
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
                                    <div className="col c-12 m-4 l-4">
                                        <div className="form-group">
                                            <label className="lable-input">Unit:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={state.unit2}
                                                onChange={(item) => handleChangeInput(item, 'unit2')}
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
