import { Layout1 } from "asure-ui-libs";
import { type MenuProps } from "antd";
import {
  SettingOutlined,
  BorderOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { useSettingThemeStore } from "../store/setting.store";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const dumpSidebarItems: MenuItem[] = [
  getItem("Home", "home", <HomeOutlined />),
  getItem("Settings", "settings", <SettingOutlined />),
  getItem("Buttons", "buttons", <BorderOutlined />),
];

const RootLayout = () => {
  const { isDarkMode } = useSettingThemeStore((state) => state);
  return (
    <Layout1 isDarkMode={isDarkMode} logo="" items={dumpSidebarItems}>
      <>
        <Outlet />
      </>
    </Layout1>
  );
};

export default RootLayout;
