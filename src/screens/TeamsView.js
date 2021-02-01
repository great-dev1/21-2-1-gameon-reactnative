/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {LongHeader} from '../components/longHeader';
import {images} from '../common/images';
import AppStatusBar from '../components/AppStatusBar';
import {useDispatch, useSelector} from 'react-redux';
import APIKit from '../services/api';
import * as Actions from '../store/actions';

export default (props) => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.main.data.teams);
  const sports = useSelector((state) => state.main.data.sports);
  const userId = useSelector((state) => state.main.data.setting.userId);
  const rejectTeam = (team) => {
    console.log(team);
    APIKit.rejectTeam(
      {
        player: userId,
      },
      team.chief,
    ).then((resp) => {
      console.log(resp);
      APIKit.getTeams().then((re) => {
        dispatch(Actions.setTeams(re.data.docs));
      });
    });
  };
  const render = () => {
    const {navigate} = props.navigation;
    return (
      <>
        <AppStatusBar
          backgroundColor={'#e67e22'}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <View style={styles.container}>
          <LongHeader
            title={'Teams'}
            color={'#e67e22'}
            bcolor={'#e67e22'}
            route={'EditProfile'}
            navigate={navigate}
            removeRightIcon
          />
          <View style={styles.main}>
            <Text style={styles.text}>
              {'Here are the teams you have joined training with:'}
            </Text>
            <View style={styles.teams}>
              {teams.map((team, index) => (
                <View key={index} style={styles.item}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{
                        uri: sports.find((sp) => sp._id === team.sport)
                          .imageUrl,
                      }}
                      style={styles.racket}
                    />
                    <Text style={styles.text2}>
                      {sports.find((sp) => sp._id === team.sport).name} -{' '}
                      {team.name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      rejectTeam(team);
                    }}>
                    <Image source={images.remove} style={styles.remove} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      </>
    );
  };
  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  text: {
    color: 'grey',
    fontSize: 17,
    fontFamily: 'ProximaNova-Bold',
  },
  text2: {
    color: 'grey',
    fontSize: 17,
    marginLeft: 10,
    fontFamily: 'ProximaNova-Regular',
  },
  teams: {
    flexDirection: 'column',
  },
  item: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  racket: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  remove: {
    width: 40,
    height: 40,
  },
});
