import "./App.css";
import { useEffect, useState } from "react";
import { ConfigProvider, Typography, theme } from "antd";
import { FloatButton } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import { Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { AuthLayout } from "asure-ui-libs";
import { useSettingThemeStore } from "./store/setting.store";
import { useModalStore } from "./store/modal.store";
import Setting from "./component/setting";
import RightSideBar from "./component/right-sidebar";

import Home from "./_pages/home";

function App() {
  const { tokens, isDarkMode } = useSettingThemeStore((state) => state);
  const { modals } = useModalStore((state) => state);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  useEffect(() => {
    getStyle();
  }, [tokens.colorPrimary, tokens.colorSecondary]);

  const getStyle = () => {
    const root = document.querySelector(":root") as HTMLElement;
    root.style.setProperty("--asure-color-primary", tokens.colorPrimary);
    root.style.setProperty("--asure-color-secondary", tokens.colorSecondary);
  };

  return (
    <ConfigProvider
      theme={{
        token: { ...tokens },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/auth">
            <Route
              path={`login`}
              element={
                <AuthLayout authType="auth" logo="/asure.png">
                  <Typography.Title>Login</Typography.Title>
                </AuthLayout>
              }
            />
          </Route>
        </Routes>
      </>
      <FloatButton
        shape="circle"
        style={{ insetInlineEnd: 94 }}
        icon={<SettingOutlined />}
        onClick={() => setOpenSidebar(!openSidebar)}
      />
      {modals}
      <RightSideBar isOpen={openSidebar}>
        <Setting />
      </RightSideBar>
    </ConfigProvider>
  );
}

export default App;
