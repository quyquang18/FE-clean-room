import classNames from 'classnames/bind';
import styles from './ToggleButton.module.scss';

const cx = classNames.bind(styles);

function ToggleButton({ children }) {
    return (
        <div className={cx('toggle-button-cover')}>
            <div className={cx('button')}>
                <input type="checkbox" className={cx('switch-toggle')} />
                <div className={cx('knobs')}></div>
                <div className={cx('layer')}></div>
            </div>
        </div>
    );
}

export default ToggleButton;
