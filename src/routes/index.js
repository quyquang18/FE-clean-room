import config from '~/config';

import { HeaderOnly } from '~/layouts';
import Home from '~/pages/Home';
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
import RegisterCompany from '~/pages/Register/RegisterCompany';
import ManageCompany from '~/pages/ManageCompany';
import ManageRoom from '~/pages/ManageRoom';

const adminSystemMenu = [
    { path: config.routes.home, component: Home },
    { path: config.routes.homepage, component: Home },
    { path: config.routes.profileUser, component: ProfileUser },
    { path: config.routes.manage_account, component: ManageAccount },
    { path: config.routes.manage_company, component: ManageCompany },
    { path: config.routes.verifyemail, component: VerifyEmail, layout: null },
    { path: config.routes.other, component: NotFoundPage, layout: HeaderOnly },
];

const adminRouter = [
    { path: config.routes.home, component: Home },
    { path: config.routes.homepage, component: Home },
    { path: config.routes.profileUser, component: ProfileUser },
    { path: config.routes.monitorRoom, component: MonitorRoom },
    { path: config.routes.devicemonitor, component: DeviceMonitor },
    { path: config.routes.monitorcontroler, component: MonitorControler },
    { path: config.routes.addDevice, component: AddDevice },
    { path: config.routes.settings_controler, component: SettingsControler },
    { path: config.routes.devicemanager, component: DeviceManager },
    { path: config.routes.verifyemail, component: VerifyEmail, layout: null },
    { path: config.routes.other, component: NotFoundPage, layout: HeaderOnly },
    { path: config.routes.manage_account, component: ManageAccount },
    { path: config.routes.manage_room, component: ManageRoom },
];

const userRouter = [
    { path: config.routes.home, component: Home },
    { path: config.routes.homepage, component: Home },
    { path: config.routes.profileUser, component: ProfileUser },
    { path: config.routes.monitorRoom, component: MonitorRoom },
    { path: config.routes.devicemonitor, component: DeviceMonitor },
    { path: config.routes.monitorcontroler, component: MonitorControler },
    { path: config.routes.devicemanager, component: DeviceManager },
    { path: config.routes.verifyemail, component: VerifyEmail, layout: null },
    { path: config.routes.other, component: NotFoundPage, layout: HeaderOnly },
    { path: config.routes.home, component: Home },
];
const notLogged = [
    { path: config.routes.home, component: Home },
    { path: config.routes.homepage, component: Home },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.register_company, component: RegisterCompany, layout: HeaderOnly },
    { path: config.routes.verifyemail, component: VerifyEmail, layout: null },
    { path: config.routes.other, component: NotFoundPage, layout: HeaderOnly },
];

export { adminSystemMenu, adminRouter, userRouter, notLogged };
