import config from '~/config';
import { FormattedMessage } from 'react-intl';
import { HomeIcon, DashboardIcon, SeeChartIcon, AcountsIcon, MonitorIcon, DeviceIcon } from '~/components/Icons';
export const adminSystemMenu = [
    {
        title: <FormattedMessage id="home-sidebar.home" />,
        to: config.routes.home,
        icon: <HomeIcon />,
    },
    {
        title: <FormattedMessage id="home-sidebar.manage-acc" />,
        to: config.routes.manage_account,
        icon: <AcountsIcon />,
    },
];
export const adminMenu = [
    {
        title: <FormattedMessage id="home-sidebar.home" />,
        to: config.routes.home,
        icon: <HomeIcon />,
    },
    {
        title: <FormattedMessage id="home-sidebar.monitor-room" />,
        to: config.routes.monitorRoom,
        icon: <SeeChartIcon />,
    },
    {
        title: <FormattedMessage id="home-sidebar.monitor-device" />,
        to: config.routes.devicemonitor,
        icon: <MonitorIcon />,
    },
    {
        title: <FormattedMessage id="home-sidebar.device-control" />,
        to: config.routes.monitorcontroler,
        icon: <DashboardIcon />,
    },
    {
        title: <FormattedMessage id="home-sidebar.device-manager" />,
        to: config.routes.devicemanager,
        icon: <DeviceIcon />,
    },
];
export const userMenu = [
    {
        title: <FormattedMessage id="home-sidebar.home" />,
        to: config.routes.home,
        icon: <HomeIcon />,
    },
    {
        title: <FormattedMessage id="home-sidebar.monitor-device" />,
        to: config.routes.monitorRoom,
        icon: <SeeChartIcon />,
    },
    {
        title: <FormattedMessage id="home-sidebar.device-control" />,
        to: config.routes.devicemonitor,
        icon: <MonitorIcon />,
    },
];
