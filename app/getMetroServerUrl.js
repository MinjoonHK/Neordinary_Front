getMetroServerUrl;

import Constants from "expo-constants";

export function getMetroServerUrl() {
  const manifest = Constants.expoConfig;
  const originalDebuggerHost = manifest?.hostUri;

  const webviewDebuggerUri = originalDebuggerHost
    ? "http://" + originalDebuggerHost.replace(/:\d+$/, ":5173/")
    : "개인ip주소 추가";

  return webviewDebuggerUri;
}
