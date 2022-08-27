/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {
  Link,
  Text,
  HStack,
  Center,
  Heading,
  Button,
  Switch,
  useColorMode,
  NativeBaseProvider,
  VStack,
  extendTheme,
  Box,
} from "native-base";
//import NativeBaseIcon from "./src/components/NativeBaseIcon";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import store from "./store";

import Wolist from "./component/wolist";
import Item from "./component/item";
import Inventory from "./component/inventory";
import Login from "./component/login";
import Menu from "./component/menu";
import Wodetail from "./component/wodetail";
import Wodetailtask from "./component/wodetailtask";
import Wodetailinspection from "./component/wodetailinspection";
import Wodetailinspectionform from "./component/wodetailinspectionform";
import Wodetaillabtrans from "./component/wodetaillabtrans"
import { Wodetaillabtransform } from "./component/wodetaillabtransform";
import { Labor } from "./component/labor";
import { Camerapage } from "./component/camera";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Login}
              options={{ headerShown: false  }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{ headerShown: false  }}
            />
            <Stack.Screen
              name="Item"
              component={Item}
              options={{ headerShown: false  }}
            />
            <Stack.Screen
              name="Inventory"
              component={Inventory}
              options={{ headerShown: false  }}
            />
            <Stack.Screen
              name="Wolist"
              component={Wolist}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Wodetail"
              component={Wodetail}
              options={{ headerShown: false  }}
            />
            <Stack.Screen
              name="Wodetailtask"
              component={Wodetailtask}
              options={{ headerShown: false  }}
            />
            <Stack.Screen
              name="Wodetailinspection"
              component={Wodetailinspection}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Wodetailinspectionform"
              component={Wodetailinspectionform}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Wodetaillabtrans"
              component={Wodetaillabtrans}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Wodetaillabtransform"
              component={Wodetaillabtransform}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Labor"
              component={Labor}
              options={{ title: "" }}
            />
            
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
