import className from 'classnames/bind';

import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';
import { adminSystemMenu, adminMenu, userMenu } from './Menu/MenuApp';
import { useSelector } from 'react-redux';
import { USER_ROLE } from '~/utils';
const cx = className.bind(styles);
function Sidebar() {
    const user = useSelector((state) => state.user);
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                {user &&
                    user.userInfo &&
                    user.userInfo.roleID === USER_ROLE.MANAGE_SYSTEM &&
                    adminSystemMenu.map((item, index) => (
                        <MenuItem key={index} title={item.title} to={item.to} icon={item.icon} />
                    ))}
                {user &&
                    user.userInfo &&
                    user.userInfo.roleID === USER_ROLE.ADMIN &&
                    adminMenu.map((item, index) => (
                        <MenuItem key={index} title={item.title} to={item.to} icon={item.icon} />
                    ))}
                {user &&
                    user.userInfo &&
                    user.userInfo.roleID === USER_ROLE.USER &&
                    userMenu.map((item, index) => (
                        <MenuItem key={index} title={item.title} to={item.to} icon={item.icon} />
                    ))}
            </Menu>
        </aside>
    );
}

export default Sidebar;
