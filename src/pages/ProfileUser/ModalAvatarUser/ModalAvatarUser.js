import Modal from '~/components/Modal';
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { editUserService } from '~/services/userService';
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
        let res = await editUserService({ type: 'image', id: props.userId, avatar: previewAvatar });
        if (res && res.errCode === 0) {
            toast.success('Update Avatar Succeed');
            props.toggeAvatarUserModal();
        } else {
            toast.error('Update Avatar Failed');
        }
    };
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [widthImage, setWidthImage] = useState();
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        if (windowWidth < 740) {
            setWidthImage(274);
        }
        if (windowWidth > 740) {
            setWidthImage(380);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

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
                width={widthImage}
                height={300}
                imageWidth={widthImage}
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
