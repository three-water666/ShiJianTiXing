export default defineAppConfig({
  pages: ["pages/calendar/index", "pages/index/index", "pages/me/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#FFFFFF",
    backgroundColor: "#0000FF",
    list: [
      {
        pagePath: "pages/calendar/index",
        text: "日历",
      },
      {
        pagePath: "pages/index/index",
        text: "基础组件",
      },
      {
        pagePath: "pages/me/index",
        text: "我",
      },
    ],
  },
});
