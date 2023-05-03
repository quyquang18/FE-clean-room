import className from 'classnames/bind';

import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';
import { adminSystemMenu, adminMenu, userMenu } from './Menu/MenuApp';
import { useSelector } from 'react-redux';
const cx = className.bind(styles);
function Sidebar() {
    const user = useSelector((state) => state.user);
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                {user.userInfo.roleID === 'R1' &&
                    adminSystemMenu.map((item, index) => (
                        <MenuItem key={index} title={item.title} to={item.to} icon={item.icon} />
                    ))}
                {user.userInfo.roleID === 'R2' &&
                    adminMenu.map((item, index) => (
                        <MenuItem key={index} title={item.title} to={item.to} icon={item.icon} />
                    ))}
                {user.userInfo.roleID === 'R3' &&
                    userMenu.map((item, index) => (
                        <MenuItem key={index} title={item.title} to={item.to} icon={item.icon} />
                    ))}
            </Menu>
        </aside>
    );
}

export default Sidebar;
