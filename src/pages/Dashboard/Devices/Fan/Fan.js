import classNames from 'classnames/bind';
import { GiDew, GiNightSleep } from 'react-icons/gi';
import { SiTailwindcss } from 'react-icons/si';

import { FanIcon } from '~/components/Icons';
import ToggleButton from '~/components/ToggleButton';
import styles from './Fan.module.scss';

const cx = classNames.bind(styles);

function Fan({ name }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('header')}>
                <FanIcon className={cx('header-icon')} />
                <h2 className={cx('device-name')}>{name}</h2>
            </span>
            <div className={cx('menu-control')}>
                <span className={cx('icon')}>
                    <GiDew />
                </span>
                <span className={cx('icon')}>
                    <SiTailwindcss />
                </span>
                <span className={cx('icon')}>
                    <GiNightSleep />
                </span>
            </div>
            <div className={cx('set-speed')}>
                <label className={cx('text')}> Speed: </label>
                <div className={cx('select')}>
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </div>
            <div className={cx('btn-on-off')}>
                <ToggleButton />
            </div>
        </div>
    );
}

export default Fan;
