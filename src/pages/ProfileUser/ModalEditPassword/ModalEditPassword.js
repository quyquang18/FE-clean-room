import { useReducer } from 'react';
import { toast } from 'react-toastify';
import Modal from '~/components/Modal';
import { editUserService } from '~/services/userService';

function ModalEditPassword({ ...props }) {
    const initialState = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        inputError: '',
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const toggle = () => {
        props.toggeModalEditPassword();
    };
    function reducer(state, action) {
        let coppyState = { ...state };
        coppyState[action.type] = action.payload;
        return { ...coppyState };
    }
    const handleChangeInput = (event, key) => {
        dispatch({ type: key, payload: event.target.value });
    };
    const checkEmptyInput = () => {
        let valid = true;
        let arrCheck = ['oldPassword', 'newPassword', 'confirmNewPassword'];
        let coppyState = { ...state };
        for (let i = 0; i < arrCheck.length; i++) {
            if (coppyState[arrCheck[i]] && coppyState[arrCheck[i]].length > 0) {
                valid = true;
                dispatch({ type: 'inputError', payload: '' });
            } else {
                toast.error(`Input cannot be empty`);
                dispatch({ type: 'inputError', payload: arrCheck[i] });
                valid = false;
                break;
            }
        }

        return valid;
    };
    const checkConfirmPassword = () => {
        let coppyState = { ...state };
        if (coppyState.newPassword === coppyState.confirmNewPassword) {
            return true;
        } else {
            toast.error(`Confirm new password is not valid`);
            dispatch({ type: 'inputError', payload: 'confirmNewPassword' });
            return false;
        }
    };
    const checkNewpassword = () => {
        let coppyState = { ...state };
        if (coppyState.newPassword !== coppyState.oldPassword) {
            return true;
        } else {
            toast.error(`The new password cannot be the same as the old password`);
            dispatch({ type: 'inputError', payload: 'newPassword' });
            return false;
        }
    };
    const handleSaveNewPassWord = async () => {
        let data = { ...state };
        data.type = 'password';
        data.id = props.userId;
        delete data.inputError;
        delete data.confirmNewPassword;
        if (checkEmptyInput()) {
            if (checkNewpassword()) {
                if (checkConfirmPassword()) {
                    let res = await editUserService(data);
                    if (res && res.errCode === 0) {
                        toast.success(res.message);
                        dispatch({ type: 'inputError', payload: '' });
                        props.toggeModalEditPassword();
                    }
                    if (res && res.errCode === 1) {
                        toast.error(res.message);
                        dispatch({ type: 'inputError', payload: 'oldPassword' });
                    }
                }
            }
        }
    };
    return (
        <Modal
            isOpen={props.isOpen}
            size="sm"
            toggle={() => toggle()}
            titleModal="Change the password"
            clickOutside={false}
        >
            <form>
                <div className="row">
                    <div className="col c-12 m-12 l-12">
                        <div className="form-group">
                            <label className="lable-input">Mật khẩu cũ:</label>
                            <input
                                className={`form-control  ${state.inputError === 'oldPassword' ? 'active' : ''}`}
                                type="text"
                                value={state.oldPassword}
                                onChange={(event) => handleChangeInput(event, 'oldPassword')}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col c-12 m-12 l-12">
                        <div className="form-group">
                            <label className="lable-input">Mật khẩu mới:</label>
                            <input
                                className={`form-control  ${state.inputError === 'newPassword' ? 'active' : ''}`}
                                type="text"
                                value={state.newPassword}
                                onChange={(event) => handleChangeInput(event, 'newPassword')}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col c-12 m-12 l-12">
                        <div className="form-group">
                            <label className="lable-input">Nhập lại mật khẩu mới:</label>
                            <input
                                className={`form-control  ${state.inputError === 'confirmNewPassword' ? 'active' : ''}`}
                                type="text"
                                value={state.confirmNewPassword}
                                onChange={(event) => handleChangeInput(event, 'confirmNewPassword')}
                            />
                        </div>
                    </div>
                </div>
            </form>
            <div className={'btn'}>
                <button className="btn-left" onClick={() => handleSaveNewPassWord()}>
                    Save Changes
                </button>
                <button className="btn-right" onClick={() => toggle()}>
                    Cancel
                </button>
            </div>
        </Modal>
    );
}

export default ModalEditPassword;
