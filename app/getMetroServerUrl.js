import Constants from "expo-constants";

export function getMetroServerUrl() {
  const manifest = Constants.expoConfig;
  const originalDebuggerHost = manifest?.hostUri;

  const webviewDebuggerUri = originalDebuggerHost
    ? "http://" + originalDebuggerHost?.replace(/:\d+$/, ":5173/")
    : "http://127.0.0.1:5173/";

  return webviewDebuggerUri;
}
