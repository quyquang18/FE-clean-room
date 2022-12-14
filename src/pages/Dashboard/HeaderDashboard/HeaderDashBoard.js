import classNames from 'classnames/bind';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import Button from '~/components/Button';
import Selects from '~/components/SelectLocation';
import styles from './HeaderDashboard.module.scss';

const cx = classNames.bind(styles);
function Header({ location, change = () => {} }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('greeting')}>
                <h2 className={cx('greeting-main')}>GoodMorning ,Quang</h2>
                <span className={cx('greeting-sub')}>Have a nice day</span>
            </div>
            <Button to="./adddevice" primary leftIcon={<AiOutlinePlusCircle />}>
                New Devices
            </Button>
            <div className={cx('select-location')}>
                <Selects change={change} />
            </div>
        </div>
    );
}

export default Header;
