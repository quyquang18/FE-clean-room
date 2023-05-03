import { useState } from 'react';
import './Modal.scss';
import { CloseIcon } from '../Icons';
import Button from '../Button';

function Modal({ ...props }) {
    if (props.isOpen) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }
    const handleClickOutside = () => {
        if (props.clickOutside) {
            props.toggle();
        }
    };
    return (
        <>
            {props && props.isOpen && (
                <div className="modal">
                    <div className="overlay" onClick={handleClickOutside}></div>
                    <div className={`modal-container ${props.size}`}>
                        <div className="modal-header">
                            <h5 className="modal-title">{props.titleModal}</h5>
                            <button className="btn-close" onClick={props.toggle}>
                                <CloseIcon width="2.2rem" height="2.2rem" />
                            </button>
                        </div>
                        <div className="modal-body">{props.children}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
