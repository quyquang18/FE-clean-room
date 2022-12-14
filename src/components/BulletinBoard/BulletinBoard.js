import classNames from 'classnames/bind';
import { AiOutlineWarning } from 'react-icons/ai';

import styles from './BulletinBoard.module.scss';

const cx = classNames.bind(styles);

function BulletinBoard({ ...props }) {
    const setValueClick = (value) => {
        props.handleClick(value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <AiOutlineWarning className={cx('icon')} />
                <h3 className={cx('title')}>Thông báo</h3>
            </div>
            <p className={cx('message')}>{props.mess}</p>
            <span className={cx('wrapper-button')}>
                <button onClick={setValueClick(1)} className={cx('button', 'ok')}>
                    OK
                </button>

                <button className={cx('button', 'cancel')}>Cancel</button>
            </span>
        </div>
    );
}

export default BulletinBoard;
