import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';

import Devices from './Devices';
const cx = classNames.bind(styles);
function Dashboard() {
    return (
        <div className={cx('wrapper')}>
            <Devices />
        </div>
    );
}

export default Dashboard;
