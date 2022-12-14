import classNames from 'classnames/bind';

import style from './AccItem.module.scss';

const cx = classNames.bind(style);

function AccItem() {
    return <div className={cx('wrapper')}></div>;
}

export default AccItem;
