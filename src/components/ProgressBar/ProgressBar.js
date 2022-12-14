import classNames from 'classnames/bind';
import styles from './ProgressBar.module.scss';

const cx = classNames.bind(styles);

export default function RangeSlider({ value = 5 }) {
    const valuePercent = value * 2.5;
    const deg = (360 * valuePercent) / 100;
    const styledeg = {
        transform: 'rotate(' + deg + 'deg)',
    };
    return (
        <div className={cx('progress-pie-chart', valuePercent > 50 ? 'gt-50' : '')}>
            <div className={cx('ppc-progress')}>
                <div className={cx('ppc-progress-fill')} style={styledeg}></div>
            </div>
            <div className={cx('ppc-percents')}>
                <div className={cx('pcc-percents-wrapper')}>
                    <span>{value}</span>
                </div>
            </div>
        </div>
    );
}
