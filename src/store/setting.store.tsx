import { create } from "zustand";
import { produce } from "immer";

interface TokensDto {
  colorPrimary: string;
  colorSecondary: string;
  colorBgLayout: string;
}

interface ThemeDto {
  key: string;
  label: string;
  tokens: TokensDto;
  preferMode: "light" | "dark";
}

interface ThemeListDto {
  default: ThemeDto;
  pink: ThemeDto;
  cyan: ThemeDto;
  black: ThemeDto;
  lightpurple: ThemeDto;
  darkPurple: ThemeDto;
}

interface SettingThemeState {
  tokens: TokensDto;
  selectTheme?: string;
  setToken: (token: string, value: string) => void;
  saveToken: () => void;
  changeTheme: (themeKey: string) => void;
  isDarkMode: boolean;
}

const defaultTokens = {
  colorPrimary: "#33A7D8",

  colorSecondary: "#85CAE8",
  colorBgLayout: "#C2E5F3",
};

const pinkTokens = {
  colorPrimary: "#EC7B96",

  colorSecondary: "#F7E0E5",
  colorBgLayout: "#FDF7F8",
};

const blackTokens = {
  colorPrimary: "#8c8c8c",

  colorSecondary: "#434343",
  colorBgLayout: "#000000",
};

const cyanTokens = {
  colorPrimary: "#006d75",

  colorSecondary: "#87e8de",
  colorBgLayout: "#e6fffb",
};

const lightPurpleTokens = {
  colorPrimary: "#b37feb",

  colorSecondary: "#efdbff",
  colorBgLayout: "#f9f0ff",
};

const darkPurpleTokens = {
  colorPrimary: "#c2a0e6",

  colorSecondary: "#390961",
  colorBgLayout: "#11011b",
};

export const themeList: ThemeListDto = {
  default: {
    key: "default",
    label: "Default",
    tokens: defaultTokens,
    preferMode: "light",
  },
  pink: {
    key: "pink",
    label: "Pink",
    tokens: pinkTokens,
    preferMode: "light",
  },
  cyan: {
    key: "cyan",
    label: "Cyan",
    tokens: cyanTokens,
    preferMode: "light",
  },
  black: {
    key: "black",
    label: "Black",
    tokens: blackTokens,
    preferMode: "dark",
  },
  lightpurple: {
    key: "light purple",
    label: "Light Purple",
    tokens: lightPurpleTokens,
    preferMode: "light",
  },
  darkPurple: {
    key: "dark purple",
    label: "Dark Purple",
    tokens: darkPurpleTokens,
    preferMode: "dark",
  },
};

const savedTokens = localStorage.getItem("samplePage");
const savedIsDarkMode = localStorage.getItem("isDarkMode");

export const useSettingThemeStore = create<SettingThemeState>((set, get) => {
  return {
    tokens: savedTokens ? JSON.parse(savedTokens) : defaultTokens,
    selectTheme: undefined,
    isDarkMode: savedIsDarkMode === "true" ? true : false,
    setToken: (token: string, value: string) => {
      set(
        produce((state: SettingThemeState) => {
          state.tokens[token as keyof TokensDto] = value;
        })
      );
    },
    saveToken: () => {
      const tokens = get().tokens;
      localStorage.setItem("samplePage", JSON.stringify(tokens));
      const isDarkMode = get().isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    },
    changeTheme: (themeKey: string) => {
      const isDarkMode =
        themeList[themeKey as keyof ThemeListDto].preferMode === "dark";
      set({
        selectTheme: themeKey,
        tokens: themeList[themeKey as keyof ThemeListDto].tokens,
        isDarkMode,
      });
    },
  };
});
