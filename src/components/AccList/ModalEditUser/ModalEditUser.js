import { useEffect, useState } from 'react';
import className from 'classnames/bind';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '~/store/actions';
import Modal from '~/components/Modal';
import style from './ModalEditUser.module.scss';

const cx = className.bind(style);

function ModalEditUser({ ...props }) {
    const [selectedRole, setSelectedRole] = useState('');

    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.value = item.keyMap;
                object.label = item.valueVI;
                result.push(object);
                return true;
            });
            return result;
        }
    };

    let listRole = useSelector((state) => state.admin.roles);
    listRole = buildDataInputSelect(listRole);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchRole());
    }, [dispatch]);
    const toggle = () => {
        props.toggleEditUserModal();
    };

    let { dataUserEdit } = props;
    useEffect(() => {
        setSelectedRole(dataUserEdit.role);
    }, [dataUserEdit]);
    const handleEditUser = () => {
        props.editUser(selectedRole);
    };
    const handleChangeRole = (value) => {
        setSelectedRole(value);
    };
    return (
        <Modal
            isOpen={props.isOpen}
            size="xl"
            toggle={() => toggle()}
            titleModal="Modal Edit User"
            clickOutside={false}
        >
            {dataUserEdit && (
                <>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className={cx('form-group')}>
                                    <label className={cx('lable-input')}>Email:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        disabled={true}
                                        value={dataUserEdit.email}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className={cx('form-group')}>
                                    <label className={cx('lable-input')}>User Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={dataUserEdit.username}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <div className={cx('form-group')}>
                                    <label className={cx('lable-input')}>Phonenumber:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={dataUserEdit.phonenumber}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className={cx('form-group')}>
                                    <label className={cx('lable-input')}>Role:</label>
                                    <Select
                                        value={selectedRole}
                                        onChange={(event) => handleChangeRole(event)}
                                        options={listRole}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className={cx('btn')}>
                        <button className={cx('btn-save')} onClick={() => handleEditUser()}>
                            Save Changes
                        </button>
                        <button className={cx('btn-cancel')} onClick={() => toggle()}>
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </Modal>
    );
}

export default ModalEditUser;
