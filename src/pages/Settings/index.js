import classNames from 'classnames/bind';
import DeviceManager from '~/pages/DeviceManager';
import styles from './Settings.module.scss';
import AccList from '~/components/AccList';

const cx = classNames.bind(styles);

function Register() {
    document.title = 'LUXAS-Settings';
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.userInfo.roleID === 'R1');
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Settings </h2>
            {user.userInfo.roleID === 'R2' && (
                <div className={cx('device-list')}>
                    <DeviceManager />
                </div>
            )}
            {user.userInfo.roleID === 'R1' && (
                <div className={cx('acc-list')}>
                    <AccList />
                </div>
            )}
        </div>
    );
}

export default Register;
