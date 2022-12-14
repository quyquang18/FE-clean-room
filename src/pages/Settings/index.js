import classNames from 'classnames/bind';
import DeviceManager from '~/pages/DeviceManager';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Button from '~/components/Button';
import styles from './Settings.module.scss';
import AccList from '~/components/AccList';

const cx = classNames.bind(styles);

function Register() {
    document.title = 'LUXAS-Settings';
    const user = JSON.parse(localStorage.getItem('user')) || 0;
    console.log(user.userInfo.roleID);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Settings </h2>
            {(user.userInfo.roleID === 'R2') &
            (
                <div className={cx('device-list')}>
                    <DeviceManager />
                </div>
            )}
            {(user.userInfo.roleID === 'R3') &
            (
                <div className={cx('acc-list')}>
                    <AccList />
                </div>
            )}
        </div>
    );
}

export default Register;
