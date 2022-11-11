import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WelcomeScreen from '../screens/WelcomeScreen';
import Test from '../screens/Test';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
	return (
			<Stack.Navigator>
				<Stack.Screen
					name="WelcomeScreen"
					component={WelcomeScreen}
					options={{ title: 'Интересно' }}
				/>
			</Stack.Navigator>
	);
}


function MainDrawer() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="NASA api" component={MainStack} />
			<Drawer.Screen name="Test" component={Test} />
		</Drawer.Navigator>
	);
}

export default function MainNavigator() {
	return (
		<NavigationContainer>
			<MainDrawer />
		</NavigationContainer>
	);
}
