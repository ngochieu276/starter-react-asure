import { Button, ColorPicker, Flex, Form, Typography } from "antd";
import { Select } from "asure-ui-libs";
import { useSettingThemeStore, themeList } from "../../store/setting.store";

const Setting = () => {
  const { tokens, selectTheme, setToken, saveToken, changeTheme } =
    useSettingThemeStore((state) => state);
  return (
    <div>
      <Flex vertical gap={4}>
        <Flex align="flex-start" gap={4} justify="flex-end">
          <Button type="primary" onClick={() => saveToken()}>
            Save
          </Button>
        </Flex>
        <Typography.Title level={3}>Pre-define Theme</Typography.Title>
        <Form>
          <Form.Item>
            <Select
              value={selectTheme}
              options={[
                {
                  label: <span>Light Mode</span>,
                  title: "Light Mode",
                  options: Object.entries(themeList)
                    .filter(([, value]) => value.preferMode === "light")
                    .map(([key, value]) => {
                      return { value: key, label: value.label };
                    }),
                },
                {
                  label: <span>Dark Mode</span>,
                  title: "Dark Mode",
                  options: Object.entries(themeList)
                    .filter(([, value]) => value.preferMode === "dark")
                    .map(([key, value]) => {
                      return { value: key, label: value.label };
                    }),
                },
              ]}
              onChange={changeTheme}
              placeholder="Select"
            />
          </Form.Item>
        </Form>
        <Typography.Title level={3}>General Config</Typography.Title>
        <Flex align="flex-end" gap={4} justify="space-between">
          <Typography.Title level={5}>Primary Color</Typography.Title>
          <ColorPicker
            value={tokens.colorPrimary}
            size="large"
            onChangeComplete={(color) =>
              setToken("colorPrimary", color.toHexString())
            }
          />
        </Flex>
        <Flex align="flex-end" gap={4} justify="space-between">
          <Typography.Title level={5}>Secondary Color</Typography.Title>
          <ColorPicker
            value={tokens.colorSecondary}
            size="large"
            onChangeComplete={(color) =>
              setToken("colorSecondary", color.toHexString())
            }
          />
        </Flex>
        <Flex align="flex-end" gap={4} justify="space-between">
          <Typography.Title level={5}>Bg Layout Color</Typography.Title>
          <ColorPicker
            value={tokens.colorBgLayout}
            size="large"
            onChangeComplete={(color) =>
              setToken("colorBgLayout", color.toHexString())
            }
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default Setting;
