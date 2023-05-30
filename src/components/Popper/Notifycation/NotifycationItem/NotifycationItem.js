import classNames from 'classnames/bind';
import { format } from 'date-fns';
import { SpeakerIcon, WarningIcon } from '~/components/Icons';
import styles from './NotifycationItem.module.scss';

const cx = classNames.bind(styles);
function NotifycationItem({ data }) {
    const renderTime = () => {
        if (data && data.time) {
            let timeString = format(+data.time, 'dd-MM-yyyy');
            return timeString;
        }
    };
    const handleClickNotifycation = () => {
        if (data.isRead !== 0) {
        }
    };
    return (
        <div>
            <ul className={cx('notifycation-item')}>
                <li
                    className={cx('item-wrapper', data.isRead ? 'read' : 'unread')}
                    onClick={() => {
                        handleClickNotifycation();
                    }}
                >
                    <div className={cx('item-image')}>
                        {data && data.type && data.type === 'NT0' && (
                            <span className={cx(data.type)}>
                                <SpeakerIcon width="3.8rem" height="3.8rem" />
                            </span>
                        )}
                        {data && data.type && data.type === 'NT1' && (
                            <span className={cx(data.type)}>
                                <WarningIcon width="3.8rem" height="3.8rem" />
                            </span>
                        )}
                    </div>
                    <div className={cx('content-wrapper')}>
                        <span className={cx('item-content')}>{data.content}</span>
                        <span className={cx('item-time')}>{renderTime()}</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default NotifycationItem;
