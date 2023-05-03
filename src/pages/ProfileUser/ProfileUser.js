import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { getDetailUserById, editUserService } from '~/services/userService';
import images from '~/assets/images';
import styles from './ProfileUser.module.scss';
import { EditIcon } from '~/components/Icons';
import Select from 'react-select';
import ModalAvatarUser from './ModalAvatarUser';
import * as actions from '~/store/actions';
import { useSelector, useDispatch } from 'react-redux';
import ModalEditPassword from './ModalEditPassword';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function ProfileUser() {
    document.title = 'LUXAS-ProfileUser';

    const [inforUser, setInforUser] = useState({});
    const [isOpenModalAvatarUser, setIsOpenModalAvatarUser] = useState(false);
    const [isOpenModalEditPassword, setIsOpenModalEditPassword] = useState(false);
    const [isEditInfo, setIsEditInfo] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const params = useParams();
    const dispatch = useDispatch();
    let getInforUser = async () => {
        let res = await getDetailUserById(params.id);
        if (res && res.errCode === 0) {
            let data = res.data;
            data.valueGender = {};
            data.valueGender.value = data.gender;
            data.valueGender.label = data.genderData.valueVi;
            setInforUser(data);
            setSelectedGender(data.valueGender);
            setEmail(data.email);
            setPhonenumber(data.phonenumber);
        } else {
            setInforUser({});
        }
    };
    const handleChangeGender = (value) => {
        setSelectedGender(value);
    };
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
    useEffect(() => {
        getInforUser();
        dispatch(actions.fetchGender());
    }, []);
    let listGender = useSelector((state) => state.admin.genders);
    listGender = buildDataInputSelect(listGender);
    const getUrlAvatar = () => {
        let urlAvatar = '';
        if (inforUser && inforUser.image) {
            urlAvatar = inforUser.image;
        } else {
            urlAvatar = images.noAvatar;
        }
        return urlAvatar;
    };

    const toggeAvatarUserModal = () => {
        setIsOpenModalAvatarUser(!isOpenModalAvatarUser);
        getInforUser();
    };
    const handleChangeImage = () => {
        setIsOpenModalAvatarUser(true);
    };
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleChangePhonenumber = (event) => {
        setPhonenumber(event.target.value);
    };
    const saveInfoUser = async () => {
        let data = {};
        data.type = 'info';
        data.id = inforUser.id;
        data.email = email;
        data.phonenumber = phonenumber;
        data.gender = selectedGender.value;
        let res = await editUserService(data);
        if (res && res.errCode === 0) {
            toast.success(res.message);
            setIsEditInfo(false);
            getInforUser();
        } else {
            toast.error(res.message);
        }
    };
    const handleEditPassword = () => {
        setIsOpenModalEditPassword(true);
    };
    const toggeModalEditPassword = () => {
        setIsOpenModalEditPassword(!isOpenModalEditPassword);
        getInforUser();
    };
    return (
        <div className={cx('profile-user-container')}>
            <h2 className={cx('title-page')}>You Profile</h2>
            <div className={cx('avatar-user')}>
                {isOpenModalAvatarUser && (
                    <ModalAvatarUser
                        isOpen={isOpenModalAvatarUser}
                        toggeAvatarUserModal={toggeAvatarUserModal}
                        userId={params.id}
                    />
                )}
                {isOpenModalEditPassword && (
                    <ModalEditPassword
                        isOpen={isOpenModalEditPassword}
                        toggeModalEditPassword={toggeModalEditPassword}
                        userId={params.id}
                    />
                )}
                <div className={cx('image')} style={{ backgroundImage: `url(${getUrlAvatar()}` }}></div>
                <div className={cx('btn-load-image')} onClick={handleChangeImage}>
                    <span className={cx('load-image-label')}>
                        <EditIcon width="2.0rem" height="2.0rem" />
                        <span>Upload Image</span>
                    </span>
                </div>
            </div>
            <div className={cx('you-infor')}>
                <div className="row">
                    <div className="col-11">
                        <div className={cx('form-group')}>
                            <label className={cx('lable-input')}>Email:</label>
                            <input
                                className="form-control"
                                type="text"
                                disabled={!isEditInfo}
                                value={email}
                                onChange={(event) => handleChangeEmail(event)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-11">
                        <div className={cx('form-group')}>
                            <label className={cx('lable-input')}>User Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                disabled={true}
                                defaultValue={inforUser.username}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-11">
                        <div className={cx('form-group')}>
                            <label className={cx('lable-input')}>Phone Number:</label>
                            <input
                                className="form-control"
                                type="text"
                                disabled={!isEditInfo}
                                value={phonenumber}
                                onChange={(event) => handleChangePhonenumber(event)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-11">
                        <div className={cx('form-group')}>
                            <label className={cx('lable-input')}>Gender:</label>
                            {!isEditInfo ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    disabled={true}
                                    defaultValue={inforUser.valueGender && inforUser.valueGender.label}
                                />
                            ) : (
                                <Select
                                    value={selectedGender}
                                    onChange={(event) => handleChangeGender(event)}
                                    options={listGender}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-11">
                        <div className={cx('form-group')}>
                            <label className={cx('lable-input')}>Password:</label>
                            <input type="password" className="form-control" disabled={true} value={'1111111111'} />
                        </div>
                    </div>
                    <div className="sub-icon" onClick={() => handleEditPassword()}>
                        <EditIcon width="2.0rem" height="2.0rem" />
                    </div>
                </div>
                <div className={cx('btn-edit-infor')}>
                    {!isEditInfo ? (
                        <button onClick={() => setIsEditInfo(true)}>Chỉnh sửa thông tin</button>
                    ) : (
                        <button onClick={() => saveInfoUser()}>Lưu</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;
