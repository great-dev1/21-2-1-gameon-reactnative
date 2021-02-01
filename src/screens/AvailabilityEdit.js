/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {LongHeader} from '../components/longHeader';
import {colors} from '../common/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import APIKit from '../services/api';

function DateView(props) {
  return (
    <View style={styles.item}>
      <View style={styles.btn}>
        <Text style={styles.text3}>{props.data}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            var key = props.data.toString();
            props.object.setState((prevState) => ({
              [key]: {
                // object that we want to update
                ...prevState[key], // keep all other key-value pairs
                am: !prevState[key].am, // update the value of specific key
              },
            }));
          }}>
          <View
            style={[
              styles.circle,
              {backgroundColor: props.value.am ? colors.green : colors.red},
            ]}>
            <Text style={styles.text4}>AM</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            var key = props.data.toString();
            props.object.setState((prevState) => ({
              [key]: {
                // object that we want to update
                ...prevState[key], // keep all other key-value pairs
                pm: !prevState[key].pm, // update the value of specific key
              },
            }));
          }}>
          <View
            style={[
              styles.circle,
              {backgroundColor: props.value.pm ? colors.green : colors.red},
            ]}>
            <Text style={styles.text4}>PM</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            var key = props.data.toString();
            props.object.setState((prevState) => ({
              [key]: {
                // object that we want to update
                ...prevState[key], // keep all other key-value pairs
                eve: !prevState[key].eve, // update the value of specific key
              },
            }));
          }}>
          <View
            style={[
              styles.circle,
              {backgroundColor: props.value.eve ? colors.green : colors.red},
            ]}>
            <Text style={styles.text4}>EVE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default class SetAvailability extends Component {
  state = null;

  constructor(props) {
    super(props);
    this.state = {
      Sunday: {
        am: 1,
        pm: 1,
        eve: 1,
      },
      Monday: {
        am: 1,
        pm: 1,
        eve: 1,
      },
      Tuesday: {
        am: 1,
        pm: 1,
        eve: 1,
      },
      Wednesday: {
        am: 1,
        pm: 1,
        eve: 1,
      },
      Thursday: {
        am: 1,
        pm: 1,
        eve: 1,
      },
      Friday: {
        am: 1,
        pm: 1,
        eve: 1,
      },
      Saturday: {
        am: 1,
        pm: 1,
        eve: 1,
      },
    };
  }
  componentDidMount() {
    APIKit.getavaliablity().then(
      (response) => {
        let availability = response.data;
        this.setState({
          Sunday: {
            am: availability.sun[0],
            pm: availability.sun[1],
            eve: availability.sun[2],
          },
          Monday: {
            am: availability.mon[0],
            pm: availability.mon[1],
            eve: availability.mon[2],
          },
          Tuesday: {
            am: availability.tue[0],
            pm: availability.tue[1],
            eve: availability.tue[2],
          },
          Wednesday: {
            am: availability.wed[0],
            pm: availability.wed[1],
            eve: availability.wed[2],
          },
          Thursday: {
            am: availability.thu[0],
            pm: availability.thu[1],
            eve: availability.thu[2],
          },
          Friday: {
            am: availability.fri[0],
            pm: availability.fri[1],
            eve: availability.fri[2],
          },
          Saturday: {
            am: availability.sat[0],
            pm: availability.sat[1],
            eve: availability.sat[2],
          },
        });
        console.log(this.state);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  next(navigate) {
    const payload = {
      availability: {
        sun: [
          this.state.Sunday.am,
          this.state.Sunday.pm,
          this.state.Sunday.eve,
        ],
        mon: [
          this.state.Monday.am,
          this.state.Monday.pm,
          this.state.Monday.eve,
        ],
        tue: [
          this.state.Tuesday.am,
          this.state.Tuesday.pm,
          this.state.Tuesday.eve,
        ],
        wed: [
          this.state.Wednesday.am,
          this.state.Wednesday.pm,
          this.state.Wednesday.eve,
        ],
        thu: [
          this.state.Thursday.am,
          this.state.Thursday.pm,
          this.state.Thursday.eve,
        ],
        fri: [
          this.state.Friday.am,
          this.state.Friday.pm,
          this.state.Friday.eve,
        ],
        sat: [
          this.state.Saturday.am,
          this.state.Saturday.pm,
          this.state.Saturday.eve,
        ],
      },
    };
    APIKit.setavaliablity(payload).then(
      (response) => {
        console.log(response);
        navigate('EditProfile');
      },
      (error) => {
        console.log(error);
      },
    );
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <>
        <AppStatusBar
          backgroundColor={colors.lightpurple}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <View style={styles.container}>
          <LongHeader
            title={'Time Edit'}
            color={colors.lightpurple}
            bcolor={colors.lightpurple}
            route={'EditProfile'}
            navigate={navigate}
            removeRightIcon
          />
          <View style={styles.main}>
            <View style={styles.sectionTop}>
              <Text style={styles.tlabel}>
                {
                  'Tap the relevant time and day to update availability. Please put times you are NOT available - you can update later'
                }
              </Text>
            </View>
            <View style={styles.sectionMiddle}>
              <View style={{marginRight: 0, alignSelf: 'flex-end'}}>
                <Text style={styles.text2}>
                  {'06:00-12:00    12.00-18.00    18.00-23.00'}
                </Text>
              </View>

              <DateView
                data={'Monday'}
                value={this.state.Monday}
                object={this}
              />
              <DateView
                data={'Tuesday'}
                value={this.state.Tuesday}
                object={this}
              />
              <DateView
                data={'Wednesday'}
                value={this.state.Wednesday}
                object={this}
              />
              <DateView
                data={'Thursday'}
                value={this.state.Thursday}
                object={this}
              />
              <DateView
                data={'Friday'}
                value={this.state.Friday}
                object={this}
              />
              <DateView
                data={'Saturday'}
                value={this.state.Saturday}
                object={this}
              />
              <DateView
                data={'Sunday'}
                value={this.state.Sunday}
                object={this}
              />

              <View style={styles.largeBtn}>
                <Text
                  style={{color: 'white', fontFamily: 'ProximaNova-Regular'}}>
                  Save
                </Text>
              </View>
            </View>
            <View style={styles.sectionBottom}>
              <View style={{width: '100%', borderRadius: 20}}>
                <TouchableOpacity
                  style={styles.btn_circle}
                  onPress={() => this.next(navigate)}>
                  <Text style={{color: '#fff', fontSize: 18}}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    marginTop: 8,
  },
  sectionTop: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  sectionMiddle: {
    flex: 4,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  sectionBottom: {
    // flex : 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logo: {
    flex: 1,
    width: 250,
    height: 50,
    resizeMode: 'contain',
  },
  tlabel: {
    color: 'grey',
    textAlign: 'center',
    fontSize: RFValue(12, 580),
    fontWeight: '600',
    fontFamily: 'ProximaNova-Regular',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label1: {
    flex: 1,
    color: 'grey',
    fontSize: RFValue(13, 580),
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'ProximaNova-Regular',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  sublabel: {
    // flex: 1,
    color: 'grey',
    fontSize: RFValue(12, 580),
    fontWeight: '600',
    fontFamily: 'ProximaNova-Regular',
  },
  input: {
    width: '100%',
  },
  navBtn_prev: {
    width: 80,
    height: 80,
    backgroundColor: colors.red,
    borderRadius: 50,
  },
  navBtn_next: {
    width: 80,
    height: 80,
    backgroundColor: colors.lightgreen,
    borderRadius: 50,
  },
  mlabel: {
    alignItems: 'center',
    fontSize: 18,
    left: 10,
  },
  racket: {
    width: 40,
    height: 40,
  },
  textCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    alignItems: 'center',
    fontSize: 15,
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#34495E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
  },
  item: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: colors.green,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 1,
  },
  text2: {
    color: 'grey',
    fontSize: 11,
    marginLeft: 10,
    fontWeight: '600',
    fontFamily: 'ProximaNova-Regular',
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '700',
  },
  text4: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
  },
  btn_circle: {
    backgroundColor: colors.orange,
    width: '100%',
    height: 50,

    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
  },
});
