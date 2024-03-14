import classNames from 'classnames/bind';
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
import {
    DarkModeIcon,
    HelpIcon,
    LanguageIcon,
    LogoutIcon,
    MenuIcon,
    MessageIcon,
    SettingsIcon,
    ThreeDotsIcon,
    UserIcon,
} from '~/components/Icons';
import { path } from '~/utils';
import Notifycation from '~/components/Popper/Notifycation';
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
            icon: <LanguageIcon />,
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
            icon: <HelpIcon width="2.2rem" height="2.2rem" />,
            title: <FormattedMessage id="menu-user.help" />,
            to: '/feedback',
        },
        {
            icon: <MessageIcon />,
            title: <FormattedMessage id="menu-user.contribute" />,
        },
    ];

    const userMenu = [
        {
            icon: <UserIcon />,
            title: <FormattedMessage id="menu-user.profile" />,
            to: `/${userName}/${userId}`,
        },
        {
            icon: <SettingsIcon />,
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
            icon: <LogoutIcon />,
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
                            <Notifycation></Notifycation>
                        </>
                    ) : (
                        <>
                            <Button to={path.REGISTER} text>
                                <FormattedMessage id="header.sign-up" />
                            </Button>
                            <Button to={path.LOGIN} primary>
                                <FormattedMessage id="header.sign-in" />
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
