import { ReactNode } from "react";
import classNames from "classnames";
import { theme } from "antd";

interface RightSideBarProps {
  children: ReactNode;
  isOpen: boolean;
}

const RightSideBar = ({ children, isOpen }: RightSideBarProps) => {
  const {
    token: { colorBgBase },
  } = theme.useToken();
  return (
    <div
      className={classNames(
        "fixed top-4 p-4 rounded-lg overflow-hidden transition-all duration-500",
        {
          "right-4": isOpen,
          "-right-full": !isOpen,
        }
      )}
      style={{
        background: colorBgBase,
      }}
    >
      {children}
    </div>
  );
};

export default RightSideBar;
