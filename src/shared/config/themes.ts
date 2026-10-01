import { theme as antdTheme, type ThemeConfig } from 'antd';

export const lightTheme: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#722ed1',
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorTextBase: '#000000',
    colorBorder: '#d9d9d9',
    borderRadius: 8,
    fontFamily:
      "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  components: {
    Layout: {
      bodyBg: 'transparent',
      headerBg: 'transparent',
    },
    Menu: {
      itemSelectedBg: '#f9f0ff',
      itemSelectedColor: '#722ed1',
    },
    Card: {
      headerBg: 'transparent',
    },
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimary: '#531dab',
    colorBgBase: '#1f1f1f',
    colorBgContainer: '#1f1f1f',
    colorBgLayout: '#141414',
    colorTextBase: '#ffffff',
    colorBorder: '#434343',
    borderRadius: 8,
    fontFamily:
      "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  },
  components: {
    Layout: {
      bodyBg: 'transparent',
      headerBg: 'transparent',
    },
    Menu: {
      itemSelectedBg: '#2c2732',
      itemSelectedColor: '#b37feb',
    },
    Button: {
      defaultShadow: 'none',
      primaryShadow: 'none',
    },
  },
};