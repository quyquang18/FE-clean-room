import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import AccList from '~/components/AccList';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ManageAccount() {
    document.title = 'LUXAS-ManageAccount';
    const user = useSelector((state) => state.user);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header-page')}>Quản lí tài khoản </h2>
            {user.userInfo.roleID === 'R1' && (
                <div className={cx('acc-list')}>
                    <AccList />
                </div>
            )}
        </div>
    );
}

export default ManageAccount;
