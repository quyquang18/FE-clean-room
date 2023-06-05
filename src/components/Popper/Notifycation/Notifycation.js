import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NotificationIcon } from '~/components/Icons';
import styles from './Notifycation.module.scss';
import NotifycationItem from './NotifycationItem';
import { getNotifycations } from '~/services/userService';

const cx = classNames.bind(styles);
function Notifycation() {
    const [listNotifycation, setListNotifycation] = useState([]);
    const [isShowTippy, setIsShowTippy] = useState(false);
    const handleHide = () => {
        setIsShowTippy(false);
    };
    const handleMouting = () => {
        setIsShowTippy(true);
    };
    const getNumNotifycation = () => {
        if (listNotifycation.length > 0) {
            let num = 0;
            listNotifycation.forEach((element) => {
                if (element.isRead === 0) {
                    num += 1;
                }
            });
            return num;
        } else {
            return 0;
        }
    };
    const renderItems = () => {
        if (listNotifycation.length > 0) {
            return listNotifycation.map((item, index) => {
                return <NotifycationItem key={index} data={item} />;
            });
        }
    };
    const companyId = useSelector((state) => state.user.userInfo.companyId);
    const userId = useSelector((state) => state.user.userInfo.id);
    const handleGetNotifycation = useCallback(async () => {
        if (companyId && userId) {
            let res = await getNotifycations({ companyId, userId });
            if (res && res.errCode === 0) {
                setListNotifycation(res.data);
            }
        }
    }, [companyId, userId]);
    useEffect(() => {
        handleGetNotifycation();
    }, [handleGetNotifycation]);
    return (
        <Tippy
            interactive={true}
            offset={[45, 8]}
            onMount={handleMouting}
            placement="bottom-end"
            trigger=" click"
            theme="light"
            render={(attrs) => (
                <div className={cx('notifycation-wrapper')}>
                    <div className={cx('notifycation-header')}> Notifications</div>
                    <div className={cx('notifycation-list')} tabIndex="-1" {...attrs}>
                        {renderItems()}
                    </div>
                </div>
            )}
            onHide={handleHide}
        >
            <button className={cx('action-btn')}>
                <NotificationIcon
                    width="2.8rem"
                    height="2.8rem"
                    className={cx('icon-notifycation', isShowTippy ? 'active' : '')}
                />
                <span className={cx('badge')}>{getNumNotifycation()}</span>
            </button>
        </Tippy>
    );
}

export default Notifycation;
