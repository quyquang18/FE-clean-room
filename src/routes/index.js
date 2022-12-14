import config from '~/config';

import { HeaderOnly } from '~/layouts';
import Home from '~/pages/Home';
import Dashboard from '~/pages/Dashboard';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Profile from '~/pages/Profile';
import Seechart from '~/pages/Seechart';
import DeviceMonitor from '~/pages/DeviceMonitor';
import MonitorControl from '~/pages/MonitorControl';
import Settings from '~/pages/Settings';
import DeviceManager from '~/pages/DeviceManager';
import AddDevice from '~/pages/AddDevice';
import VerifyEmail from '~/pages/EmailVerify';
//Không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.seechart, component: Seechart },
    { path: config.routes.devicemonitor, component: DeviceMonitor },
    { path: config.routes.monitorcontrol, component: MonitorControl },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.settings, component: Settings },
    { path: config.routes.addDevice, component: AddDevice },
    { path: config.routes.devicemanager, component: DeviceManager },
    { path: config.routes.verifyemail, component: VerifyEmail, layout: null },
];

const privateRoutes = [];
//Phải đăng nhập mới xem được, và nó sẽ chuyển sang trang login

export { publicRoutes, privateRoutes };
