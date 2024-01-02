import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigation } from "./src/navigations/RootNavigation";
import { RecoilRoot } from "recoil";
import { RecoilCustomPersist } from './src/components/RecoilCustomPersist';

export default function App() {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <RecoilCustomPersist>
          <NavigationContainer>
            <RootNavigation/>
          </NavigationContainer>
        </RecoilCustomPersist>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}