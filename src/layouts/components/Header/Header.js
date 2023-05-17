import classNames from 'classnames/bind';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { FiSettings, FiHelpCircle } from 'react-icons/fi';
import { BiMessageEdit } from 'react-icons/bi';
import { TbMessageLanguage } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '~/store/actions';
import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';
import { DarkModeIcon, MenuIcon, NotificationIcon, ThreeDotsIcon } from '~/components/Icons';
import { path } from '~/utils';

const cx = classNames.bind(styles);

function Header({ toggleNavBar }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(actions.processLogout());
    };
    let userName = '';
    let userId = '';
    let avatar = '';
    if (user) {
        let isLoggedIn = user.isLoggedIn;
        if (isLoggedIn) {
            userName = user.userInfo.username;
            userId = user.userInfo.id;
            avatar = user.userInfo.image;
        }
    }
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'Language':
                dispatch(actions.changeLanguage(menuItem.code));
                break;
            default:
        }
    };
    const MENU_ITEMS = [
        {
            icon: <TbMessageLanguage />,
            title: <FormattedMessage id="menu-user.current -value-language" />,
            children: {
                title: <FormattedMessage id="menu-user.language" />,
                data: [
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <FiHelpCircle width="2.2rem" height="2.2rem" />,
            title: <FormattedMessage id="menu-user.help" />,
            to: '/feedback',
        },
        {
            icon: <BiMessageEdit />,
            title: <FormattedMessage id="menu-user.contribute" />,
        },
    ];

    const userMenu = [
        {
            icon: <AiOutlineUser />,
            title: <FormattedMessage id="menu-user.profile" />,
            to: `/${userName}/${userId}`,
        },
        {
            icon: <FiSettings />,
            title: <FormattedMessage id="menu-user.settings" />,

            children: {
                title: <FormattedMessage id="menu-user.settings" />,
                data: [
                    {
                        type: 'Settings',
                        code: 'en',
                        title: 'Account Settings',
                        to: '/settingaccount',
                    },
                    {
                        type: 'Settings',
                        code: 'vi',
                        title: 'Connection settings',
                        to: '/settingconnect',
                    },
                ],
            },
        },
        ...MENU_ITEMS,
        {
            icon: <AiOutlineLogout />,
            title: <FormattedMessage id="menu-user.logout" />,
            to: path.LOGIN,
            separate: true,
            onclick: () => logout(),
        },
    ];
    const handleClickNavBar = () => {
        toggleNavBar();
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {user.isLoggedIn && (
                    <div onClick={() => handleClickNavBar()}>
                        <MenuIcon width="2.6rem" height="2.6rem" className={cx('nav-bars-btn')} />
                    </div>
                )}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img className={cx('img-logo')} src={images.logo} alt="Logo" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {user.isLoggedIn ? (
                        <>
                            <Tippy delay={[0, 20]} content="Dark mode" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <DarkModeIcon width="2.8rem" height="2.8rem" />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 20]} content="Notify" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <NotificationIcon width="2.8rem" height="2.8rem" />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button to={path.REGISTER} text>
                                Sign up
                            </Button>
                            <Button to={path.LOGIN} primary>
                                Sign in
                            </Button>
                        </>
                    )}

                    <Menu items={user.isLoggedIn ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {user.isLoggedIn ? (
                            <Image className={cx('user-avatar')} src={avatar || images.noAvatar} alt="Nguyen Van A" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <ThreeDotsIcon width="2.8rem" height="2.8rem" />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
