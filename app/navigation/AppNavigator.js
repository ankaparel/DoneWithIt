import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getHeaderTitle } from '@react-navigation/elements';

import AccountNavigator from "./AccountNavigator";
// import AccountScreen from "../screens/AccountScreen";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
// import navigate from "./rootNavigation";
import useNotifications from "../hooks/useNotifications";
import NavHeader from "../components/NavHeader";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotifications();

  return (
    <Tab.Navigator
      screenOptions={{
        header: ({ route, options }) => {
          const title = getHeaderTitle(options, route.name);

          return <NavHeader title={title} shown={title !== 'MyAccount'}/>;
        }
    }}    
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ListingEdit"
        component={ListingEditScreen}
        options={( { navigation } ) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.LISTING_EDIT)}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="MyAccount"
        component={AccountNavigator}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
