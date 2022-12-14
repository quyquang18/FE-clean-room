import config from '~/config';
import { HomeIcon, DashboardIcon, SeeChartIcon, SettingsIcon, MonitorIcon, DeviceIcon } from '~/components/Icons';
export const adminSystemMenu = [
    {
        title: 'Home',
        to: config.routes.home,
        icon: <HomeIcon />,
    },
    {
        title: 'Monnitor Room',
        to: config.routes.seechart,
        icon: <SeeChartIcon />,
    },
    {
        title: 'Device Monitor',
        to: config.routes.devicemonitor,
        icon: <MonitorIcon />,
    },
    {
        title: 'Monitor Control',
        to: config.routes.monitorcontrol,
        icon: <DashboardIcon />,
    },
    {
        title: 'Settings',
        to: config.routes.settings,
        icon: <SettingsIcon/>,
    },
];
export const adminMenu = [
    {
        title: 'Home',
        to: config.routes.home,
        icon: <HomeIcon/>,
    },
    {
        title: 'Monnitor Room',
        to: config.routes.seechart,
        icon: <SeeChartIcon />,
    },
    {
        title: 'Device Monitor',
        to: config.routes.devicemonitor,
        icon: <MonitorIcon />,
    },
    {
        title: 'Monitor Control',
        to: config.routes.monitorcontrol,
        icon: <DashboardIcon />,
    },
    {
        title: 'Device Manager',
        to: config.routes.devicemanager,
        icon: <DeviceIcon />,
    },
];
export const userMenu = [
    {
        title: 'Home',
        to: config.routes.home,
        icon: <HomeIcon />,
    },
    {
        title: 'Monnitor Room',
        to: config.routes.seechart,
        icon: <SeeChartIcon />,
    },
    {
        title: 'Device Monitor',
        to: config.routes.devicemonitor,
        icon: <MonitorIcon />,
    },
];
