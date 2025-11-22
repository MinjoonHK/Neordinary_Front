App.js;

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { getMetroServerUrl } from "./getMetroServerUrl";

const WEB_URL = getMetroServerUrl();

export default function App() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: WEB_URL }} style={{ flex: 1 }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
