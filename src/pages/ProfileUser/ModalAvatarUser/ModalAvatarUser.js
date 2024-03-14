import Modal from '~/components/Modal';
import { useState } from 'react';
import Avatar from 'react-avatar-edit';
import { handleUpdateImageAvatar } from '~/services/userService';
import { toast } from 'react-toastify';
function ModalAvatarUser({ ...props }) {
    const toggle = () => {
        props.toggeAvatarUserModal();
    };
    const [previewAvatar, setPreviewAvatar] = useState('');
    const onClose = () => {
        setPreviewAvatar(null);
    };

    const onCrop = (preview) => {
        setPreviewAvatar(preview);
    };
    const onBeforeFileLoad = (elem) => {
        if (elem.target.files[0].size > 7168000) {
            alert('File is too big!');
            elem.target.value = '';
        }
    };
    const handleSaveAvatar = async () => {
        let res = await handleUpdateImageAvatar({ id: props.userId, avatar: previewAvatar });
        if (res && res.errCode === 0) {
            toast.success('Update Avatar Succeed');
            props.toggeAvatarUserModal();
        } else {
            toast.error('Update Avatar Failed');
        }
    };

    return (
        <Modal
            isOpen={props.isOpen}
            size="custom"
            toggle={() => toggle()}
            titleModal="Cập nhật ảnh đại diện"
            clickOutside={false}
        >
            <Avatar
                className={'chosse-image'}
                width={380}
                height={300}
                imageWidth={380}
                minCropRadius={20}
                // cropRadius={Math.round(1000)}
                onCrop={onCrop}
                onClose={onClose}
                onBeforeFileLoad={onBeforeFileLoad}
            />
            <div className="btn">
                <button className="btn-left" onClick={() => handleSaveAvatar()}>
                    Save
                </button>
            </div>
        </Modal>
    );
}

export default ModalAvatarUser;
