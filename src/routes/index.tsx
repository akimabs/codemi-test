import 'react-native-gesture-handler';

import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';

// Splash screen
import SplashScreen from '../screens/auth/splash-screen';

// Onboarding screen
import StartedScreen from '../screens/auth/started-screen';

// Login screen
import Login from '../screens/auth/login';

// Stack screen
import Home from '../screens/home';
import Scanner from '../screens/qr-scan/';
import DataScan from '../screens/qr-scan/data-scan';

function Private({auth, apps}: any) {
  const SplashStack: any = createStackNavigator();
  const OnboardingStack: any = createStackNavigator();
  const AuthStack: any = createStackNavigator();
  const StackNav: any = createStackNavigator();

  if (apps.isFirst) {
    return (
      <NavigationContainer>
        <SplashStack.Navigator
          initialRouteName="SplashScreen"
          headerMode="none">
          <SplashStack.Screen name="SplashScreen" component={SplashScreen} />
        </SplashStack.Navigator>
      </NavigationContainer>
    );
  }

  if (!auth.isDoneOnboarding) {
    return (
      <NavigationContainer>
        <OnboardingStack.Navigator
          screenOptions={TransitionPresets.ModalSlideFromBottomIOS}
          initialRouteName="SplashScreen"
          headerMode="none">
          <OnboardingStack.Screen
            name="StartedScreen"
            options={{
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
            component={StartedScreen}
          />
        </OnboardingStack.Navigator>
      </NavigationContainer>
    );
  }

  if (!auth.token) {
    return (
      <NavigationContainer>
        <AuthStack.Navigator
          screenOptions={TransitionPresets.ScaleFromCenterAndroid}
          initialRouteName="SplashScreen"
          headerMode="none">
          <AuthStack.Screen name="Login" component={Login} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <StackNav.Navigator
        screenOptions={TransitionPresets.SlideFromRightIOS}
        initialRouteName="Home"
        headerMode="none">
        <StackNav.Screen name="Home" component={Home} />
        <StackNav.Screen name="Scanner" component={Scanner} />
        <StackNav.Screen
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
          name="DataScan"
          component={DataScan}
        />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  apps: state.apps,
});

export default connect(mapStateToProps)(Private);
