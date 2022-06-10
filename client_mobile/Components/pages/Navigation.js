import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import AddRoutine from './AddRoutine'
import EditRoutine from './EditRoutine'
import Routine from './Routine'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Profile from './Profile'
import Home from './Home'

const MyStackNavigator = createStackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            headerLeft: () => null
        }
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            headerLeft: () => null
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerLeft: () => null
        }
    },
    AddRoutine: {
        screen: AddRoutine,
        navigationOptions: {
            title: "Add a routine",
        }
    },
    EditRoutine: {
        screen: EditRoutine,
        navigationOptions: {
            title: "Edit a routine"
        }
    },
    Routine: {
        screen: Routine,
        navigationOptions: {
            title: "My routines"
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: "Profile"
        }
    }
})

export default createAppContainer(MyStackNavigator)