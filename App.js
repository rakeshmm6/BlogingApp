import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign,Foundation,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import HomeScreen from './screens/Homescreen';
import BlogScreen from './screens/BlogScreen'; // Create additional screens
import NewsScreen from './screens/NewsScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import insightScreen from './screens/InsightScreen';
import Icon from 'react-native-fontawesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebaseConfig';
import InsightScreen from './screens/InsightScreen';
import AddBlogScreen from './screens/AddBlogs';
import BlogDetailed from './screens/BlogDetailed';
//import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName;
        let IconComponent;

        if (route.name === 'Home') {
          IconComponent= MaterialCommunityIcons;
          iconName = 'home-outline';
        } else if (route.name === 'Blogs') {
          IconComponent= FontAwesome;
          iconName = 'bars';
        } else if (route.name === 'News') {
          IconComponent= AntDesign;
          iconName = 'barschart';
        } else if (route.name === 'Insight') {
          IconComponent = AntDesign
          iconName = 'linechart';
        }

        return <IconComponent name={iconName} size={25} color={color} />;
      },
      tabBarActiveTintColor: '#6c5dd3',
      tabBarInactiveTintColor: 'gray',
      tabBarLabel: () => null,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
    <Tab.Screen name="Blogs" component={BlogScreen} options={{headerShown:false}}/>
    <Tab.Screen name="News" component={NewsScreen} options={{headerShown:false}}/>
    <Tab.Screen name="Insight" component={InsightScreen} options={{headerShown:false}}/>
  </Tab.Navigator>
);

const AuthNavigator = ()=>{
  return(
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Login" component={LoginScreen}/>
    <Stack.Screen name="Signup" component={SignupScreen}/>
  </Stack.Navigator>
);};

const MainNavigator = ()=>{
  return(<Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="TabNavigator" component={TabNavigator}/>
    <Stack.Screen name="AddBlogs" component={AddBlogScreen}/>
    <Stack.Screen name="BlogDetailed" component={BlogDetailed}/>
  </Stack.Navigator>)
  
}
const App = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthNavigator} />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
