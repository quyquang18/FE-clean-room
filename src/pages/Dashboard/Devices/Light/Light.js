import classNames from 'classnames/bind';
import { GiDew, GiNightSleep } from 'react-icons/gi';
import { SiTailwindcss } from 'react-icons/si';

import { LightIcon } from '~/components/Icons';
import ToggleButton from '~/components/ToggleButton';
import styles from './Light.module.scss';

const cx = classNames.bind(styles);

function Lamp({ name }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('header')}>
                <LightIcon className={cx('header-icon')} />
                <h2 className={cx('device-name')}>{name}</h2>
            </span>
            {/* <div className={cx('menu-control')}>
                <span className={cx('icon')}>
                    <GiDew />
                </span>
                <span className={cx('icon')}>
                    <SiTailwindcss />
                </span>
                <span className={cx('icon')}>
                    <GiNightSleep />
                </span>
            </div> */}

            <div className={cx('btn-on-off')}>
                <ToggleButton />
            </div>
        </div>
    );
}

export default Lamp;
