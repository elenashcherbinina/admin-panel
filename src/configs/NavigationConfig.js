import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const dashBoardNavTree = [
  {
    key: 'general',
    path: `${APP_PREFIX_PATH}`,
    title: 'sidenav.general',
    breadcrumb: false,
    isGroupTitle: true,
    submenu: [
      {
        key: 'home',
        path: `${APP_PREFIX_PATH}/home`,
        title: 'sidenav.home',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: 'clients',
        path: `${APP_PREFIX_PATH}/clients`,
        title: 'sidenav.clients',
        icon: UserOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'clients-list',
            path: `${APP_PREFIX_PATH}/clients/user-list`,
            title: 'sidenav.clients.userlist',
            breadcrumb: false,
            submenu: [],
          },
          {
            key: 'clients-group',
            path: `${APP_PREFIX_PATH}/clients/group`,
            title: 'sidenav.clients.grouplist',
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
