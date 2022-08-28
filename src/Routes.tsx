import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./pages/Home";
import { useTheme } from "native-base";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Scroll, Timer } from "phosphor-react-native";

const Tab = createMaterialBottomTabNavigator();

export function Routes () {
  const { colors } = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
          barStyle={{
            backgroundColor: "#111827",
          }}
          activeColor={colors.green[500]}
          inactiveColor={colors.gray[600]}
      >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarLabel: "Timer",
            tabBarIcon: (color) => {
              return <Timer color={color.color} size={24} />
            },
          }}  
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
