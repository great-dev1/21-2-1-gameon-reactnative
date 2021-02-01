import {Easing, Animated} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './screens/Home';
// import EventCard from './screens/EventCard';
// import TrialCard from './screens/TrialCard';
// import TeamCard from './screens/TeamCard';
// import TrainingCard from './screens/TrainingCard';
import Settings from './screens/Settings';
import TrainingAccept from './screens/TrainingAccept';
import EventAccept from './screens/EventAccept';
import TrialAccept from './screens/TrialAccept';
import OutOfCards from './screens/OutOfCards';
import TeamsView from './screens/TeamsView';
import TimeEdit from './screens/TimeEdit';
import AbilityEdit from './screens/AbilityEdit';
import BioEdit from './screens/BioEdit';
import SportsEdit from './screens/SportsEdit';
import AvailabilityEdit from './screens/AvailabilityEdit';
import Signin from './screens/auth/Signin';
import LocationSwitch from './screens/LocationSwitch';
import EditGender from './screens/EditGender';
import EditProfile from './screens/EditProfile';
import Messages from './screens/Messages';
import Chat from './screens/Chat';
import PrivacyPolicy from './screens/PrivacyPolicy';
import Terms from './screens/Terms';

import AuthLoadingScreen from './screens/auth/AuthLoading';
import SetPhone from './screens/auth/SetPhone';
import SetSmsCode from './screens/auth/SetSmsCode';
import SetDetail from './screens/auth/SetDetail';
import SetDetailOAuth from './screens/auth/SetDetailOAuth';
import SetPersonalInfo from './screens/auth/SetPersonalInfo';
import ChooseSports from './screens/auth/ChooseSports';
import ChooseAbility from './screens/auth/ChooseAbility';
import SetBioUniversity from './screens/auth/SetBioUniversity';
import SetAvailability from './screens/auth/SetAvailability';
import Permission from './screens/auth/Permission';
import Eula from './screens/auth/Eula';

const navigationOptions = () => ({header: null});

const HomeNavigator = createStackNavigator(
  {
    Home: {screen: Home, navigationOptions},
    TimeEdit: {screen: TimeEdit, navigationOptions},
    TeamsView: {screen: TeamsView, navigationOptions},
    OutOfCards: {screen: OutOfCards, navigationOptions},
    // TrialCard: { screen: TrialCard, navigationOptions },
    // TeamCard: { screen: TeamCard, navigationOptions },
    // EventCard: { screen: EventCard, navigationOptions },
    // TrainingCard : { screen: TrainingCard, navigationOptions },
    TrainingAccept: {screen: TrainingAccept, navigationOptions},
    EventAccept: {screen: EventAccept, navigationOptions},
    TrialAccept: {screen: TrialAccept, navigationOptions},
    LocationSwitch: {screen: LocationSwitch, navigationOptions},
    EditGender: {screen: EditGender, navigationOptions},
    EditProfile: {screen: EditProfile, navigationOptions},
    SportsEdit: {screen: SportsEdit, navigationOptions},
    AvailabilityEdit: {screen: AvailabilityEdit, navigationOptions},
    Messages: {screen: Messages, navigationOptions},
    Chat: {screen: Chat, navigationOptions},
    Settings: {screen: Settings, navigationOptions},
    AbilityEdit: {screen: AbilityEdit, navigationOptions},
    BioEdit: {screen: BioEdit, navigationOptions},
    PrivacyPolicy: {screen: PrivacyPolicy, navigationOptions},
    Terms: {screen: Terms, navigationOptions},
  },
  {
    initialRouteName: 'Home',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: (sceneProps) => {
        const {layout, position, scene} = sceneProps;
        const {index} = scene;

        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return {opacity, transform: [{translateX: translateX}]};
      },
    }),
  },
);
const AuthStack = createStackNavigator({
  Signin: {screen: Signin, navigationOptions},
  SetPhone: {screen: SetPhone, navigationOptions},
  SetSmsCode: {screen: SetSmsCode, navigationOptions},
  SetDetail: {screen: SetDetail, navigationOptions},
  SetDetailOAuth: {screen: SetDetailOAuth, navigationOptions},
  SetPersonalInfo: {screen: SetPersonalInfo, navigationOptions},
  ChooseSports: {screen: ChooseSports, navigationOptions},
  ChooseAbility: {screen: ChooseAbility, navigationOptions},
  SetBioUniversity: {screen: SetBioUniversity, navigationOptions},
  SetAvailability: {screen: SetAvailability, navigationOptions},
  Permission: {screen: Permission, navigationOptions},
  Eula: {screen: Eula, navigationOptions},
});

export const Routers = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Home: HomeNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
