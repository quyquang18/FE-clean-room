import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { useEffect, useState } from 'react';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = className.bind(styles);

function DefaultLayout({ children }) {
    const [isShowNavBar, setIsShowNavBar] = useState(false);
    const [isShowOverLay, setIsShowOverLay] = useState(false);
    const elementApp = document.querySelector('.App');
    let appWidth = elementApp.clientWidth;
    useEffect(() => {
        if (appWidth && appWidth > 1023) {
            setIsShowNavBar(true);
        }
    }, [appWidth]);
    const toggleNavBar = () => {
        setIsShowNavBar(!isShowNavBar);
        setIsShowOverLay(!isShowOverLay);
    };
    const handleClickOverLay = () => {
        setIsShowNavBar(false);
        setIsShowOverLay(false);
    };
    return (
        <div className={cx('wrapper ', 'grid wide')}>
            <Header toggleNavBar={toggleNavBar} />
            <div className={cx('container', 'row')}>
                {isShowNavBar && (
                    <div className={cx('nav-bar', 'col l-3')}>
                        <Sidebar />
                    </div>
                )}
                {isShowOverLay && <div className={cx('nav-overlay')} onClick={() => handleClickOverLay()}></div>}
                <div id="content-app" className={cx('content', 'col l-9 m-12 c-12')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
