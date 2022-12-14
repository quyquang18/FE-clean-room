import { useState } from 'react';
import className from 'classnames/bind';
import style from './Modal.module.scss';
import { CloseIcon } from '../Icons';
import Button from '../Button';
const cx = className.bind(style);

function Modal({ child, childBtn, colorBtn, titleModal, toggleFromParent, item }) {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };
    const handleConfirm = (type) => {
        console.log(type);
        toggleFromParent(type, item);
    };
    const handleCancel = (type) => {
        toggleFromParent(type, item);
    };
    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }
    return (
        <>
            <button className={cx('btn-modal', colorBtn)} onClick={toggleModal}>
                {childBtn}
            </button>
            {modal && (
                <div className={cx('modal')}>
                    <div onClick={toggleModal} className={cx('overlay')}></div>
                    <div className={cx('modal-wrapper')}>
                        <h2 className={cx('modal-title')}>{titleModal}</h2>
                        <div className={cx('modal-content')}>{child}</div>
                        <button className={cx('close-modal')} onClick={toggleModal}>
                            <CloseIcon width="1.5rem" height="1.5rem" />
                        </button>
                        <div className={cx('btn')}>
                            <Button
                                onClick={function () {
                                    toggleModal();
                                    handleConfirm('confirm');
                                }}
                                className={cx('btn-confirm')}
                                primary
                                text
                                children="Confirm"
                                small
                            />
                            <Button
                                onClick={function () {
                                    toggleModal();
                                    handleCancel('cancel');
                                }}
                                className={cx('btn-cancel')}
                                primary
                                text
                                children="Cancel"
                                small
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
