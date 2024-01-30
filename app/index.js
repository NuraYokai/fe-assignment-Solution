import React from "react";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { SafeArea } from "./components/safe-area.component";

import { WindowSizeProvider } from "./services/window/window.context";
import AdvancedTitleSearchScreen from "./features/AdvancedTitleSearchScreen/AdvancedTitleSearchScreen";

export default function Page() {
  return (
    <>
      <WindowSizeProvider>
        <ExpoStatusBar />
        <AdvancedTitleSearchScreen />
      </WindowSizeProvider>
    </>
  );
}
