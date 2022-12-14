import classNames from 'classnames/bind';
import { BsFillSunFill, BsDropletHalf, BsWind } from 'react-icons/bs';
import { IoMdSnow } from 'react-icons/io';
import { DashedCircleIcon, MinusIcon, PlusIcon, AirConditionerIcon } from '~/components/Icons';
import ProgressBar from '~/components/ProgressBar';
import ToggleButton from '~/components/ToggleButton';
import styles from './AriConditioner.module.scss';

const cx = classNames.bind(styles);

function AirConditioner({ name }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('header')}>
                <AirConditionerIcon className={cx('header-icon')} />
                <h2 className={cx('device-name')}>{name}</h2>
            </span>
            <div className={cx('control-devices')}>
                <div className={cx('temperature-control')}>
                    <span className={cx('control-value')}>
                        <MinusIcon className={cx('icon-btn')} />
                        <p className={cx('text-value')}>05°C</p>
                    </span>
                    <span className={cx('slider-value')}>
                        <p className={cx('text-value')}>15°C</p>
                        <DashedCircleIcon width="160" height="160" />
                        <div className={cx('range-slider')}>
                            <ProgressBar value={30} />
                        </div>
                    </span>
                    <span className={cx('control-value')}>
                        <p className={cx('text-value')}>25°C</p>
                        <PlusIcon className={cx('icon-btn')} />
                    </span>
                </div>
                <div className={cx('device-control')}>
                    <div className={cx('menu-control')}>
                        <ToggleButton />
                        <span className={cx('icon-menu')}>
                            <BsFillSunFill />
                        </span>
                        <span className={cx('icon-menu')}>
                            <IoMdSnow />
                        </span>
                        <span className={cx('icon-menu')}>
                            <BsDropletHalf />
                        </span>
                        <span className={cx('icon-menu')}>
                            <BsWind />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AirConditioner;
