import "dotenv/config";

export default {
  "expo": {
    "extra": {
      "eas": {
        "projectId": "55ba4b56-c98c-4658-8042-8a6c58d27c93"
      }
    },
    name: "Gigachat",
    slug: "Gigachat",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    "android": {
      "package": "com.yourcompany.yourappname",
      "versionCode": 1
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
};