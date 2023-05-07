import config from '~/config';

import { HeaderOnly } from '~/layouts';
import Home from '~/pages/Home';
import Dashboard from '~/pages/Dashboard';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import ProfileUser from '~/pages/ProfileUser';
import MonitorRoom from '~/pages/MonitorRoom';
import DeviceMonitor from '~/pages/DeviceMonitor';
import MonitorControler from '~/pages/MonitorControler';
import ManageAccount from '~/pages/ManageAccount';
import DeviceManager from '~/pages/DeviceManager';
import AddDevice from '~/pages/DeviceManager/AddDevice';
import VerifyEmail from '~/pages/EmailVerify';
import NotFoundPage from '~/pages/NotFoundPage/NotFoundPage';
import SettingsControler from '~/pages/MonitorControler/SettingsControler';
const adminRouter = [
    { path: config.routes.home, component: Home },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.profileUser, component: ProfileUser },
    { path: config.routes.monitorRoom, component: MonitorRoom },
    { path: config.routes.devicemonitor, component: DeviceMonitor },
    { path: config.routes.monitorcontroler, component: MonitorControler },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.manage_account, component: ManageAccount },
    { path: config.routes.addDevice, component: AddDevice },
    { path: config.routes.settings_controler, component: SettingsControler },
    { path: config.routes.devicemanager, component: DeviceManager },
    { path: config.routes.verifyemail, component: VerifyEmail, layout: null },
    { path: config.routes.other, component: NotFoundPage, layout: HeaderOnly },
    { path: config.routes.home, component: Home },
];

const userRouter = [
    { path: config.routes.home, component: Home },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.profileUser, component: ProfileUser },
    { path: config.routes.monitorRoom, component: MonitorRoom },
    { path: config.routes.devicemonitor, component: DeviceMonitor },
    { path: config.routes.monitorcontroler, component: MonitorControler },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    // { path: config.routes.settings, component: Settings },
    { path: config.routes.addDevice, component: AddDevice },
    { path: config.routes.settings_controler, component: SettingsControler },
    { path: config.routes.devicemanager, component: DeviceManager },
    { path: config.routes.verifyemail, component: VerifyEmail, layout: null },
    { path: config.routes.other, component: NotFoundPage, layout: HeaderOnly },
    { path: config.routes.home, component: Home },
];
const notLogged = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.verifyemail, component: VerifyEmail, layout: null },
    { path: config.routes.other, component: NotFoundPage, layout: HeaderOnly },
    { path: config.routes.home, component: Home },
];

export { adminRouter, userRouter, notLogged };
