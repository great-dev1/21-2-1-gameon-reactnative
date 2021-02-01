/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {LongHeader} from '../components/longHeader';
import {colors} from '../common/colors';
import {Slider} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import AppStatusBar from '../components/AppStatusBar';
import APIKit from '../services/api';

export default class AbilityEdit extends Component {
  state = null;
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      min: 0,
      max: 3,
      ability: [], //edit ability
    };
  }

  componentDidMount() {
    // get sports ability
    console.log('choose ability');
    APIKit.getability().then(
      (response) => {
        console.log('getting sports ability list');
        const sports = response.data;
        this.setState({ability: sports});
        console.log(this.state.ability);
      },
      (error) => {
        console.log(error);
      },
    );
  }
  next(navigate) {
    // set sports ability
    const payload = {ability: this.state.ability};
    APIKit.setability(payload).then(
      (response) => {
        console.log(response.data);
        navigate('EditProfile');
      },
      (error) => {
        console.log(error);
      },
    );
  }
  render() {
    const {navigate} = this.props.navigation;
    // const found = this.state.ablity.filter(item => item.sportId == prop.id);
    // if(found.length == 0){
    //   this.state.ablity.push({sportId: prop.id, level: 'beginner'});
    // }
    return (
      <>
        <AppStatusBar
          backgroundColor={colors.red}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <View style={styles.container}>
          <LongHeader
            title={'Ability'}
            color={colors.red}
            bcolor={colors.red}
            route={'EditProfile'}
            navigate={navigate}
          />
          <View style={styles.main}>
            <View style={styles.sectionTop}>
              <Text style={styles.tlabel}>{'Choose Ability'}</Text>
              <Text style={styles.tlabel}>{'_'}</Text>
              <Text style={styles.sublabel}>
                {
                  'We’ll match you with players of a similar skill level. Select your rough ability.'
                }
              </Text>
            </View>
            <View style={styles.sectionMiddle}>
              {this.state.ability.map((prop, index) => {
                let _value = 0;
                switch (prop.level) {
                  case 'beginner': {
                    _value = 0;
                    break;
                  }
                  case 'intermediate': {
                    _value = 1;
                    break;
                  }
                  case 'advanced': {
                    _value = 2;
                    break;
                  }
                  case 'team': {
                    _value = 3;
                    break;
                  }
                }

                return (
                  <View key={prop._id} style={{marginVertical: 5}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={{uri: prop.sport.imageUrl}}
                        style={styles.racket}
                      />
                      <Text style={styles.mlabel}>{prop.sport.name}</Text>
                    </View>
                    <Slider
                      step={1}
                      minimumValue={this.state.min}
                      maximumValue={this.state.max}
                      value={_value}
                      thumbTintColor="#2ecc71"
                      onValueChange={(val) => {
                        console.log(this.state.ability);
                        let newArray = [...this.state.ability];
                        const elementIdx = index;

                        let _level = 'beginner';
                        switch (val) {
                          case 0:
                            _level = 'beginner';
                            break;
                          case 1:
                            _level = 'intermediate';
                            break;
                          case 2:
                            _level = 'advanced';
                            break;
                          case 3:
                            _level = 'team';
                            break;
                          default:
                            break;
                        }
                        newArray[elementIdx] = {
                          ...newArray[elementIdx],
                          level: _level,
                        };
                        this.setState({ability: newArray});
                        console.log(this.state.ability);
                      }}
                    />
                    <View style={styles.textCon}>
                      <Text style={styles.label}>Beginner</Text>
                      <Text style={styles.label}>Intermediate</Text>
                      <Text style={styles.label}>Advanced</Text>
                      <Text style={styles.label}>Team</Text>
                    </View>
                  </View>
                );
              })}
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
    marginHorizontal: 50,
    marginVertical: 50,
  },
  sectionMiddle: {
    flex: 3,
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  sectionBottom: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logo: {
    flex: 3,
    width: 250,
    height: 50,
    resizeMode: 'contain',
  },
  tlabel: {
    flex: 1,
    color: 'grey',
    fontSize: RFValue(14, 580),
    fontWeight: '600',
    fontFamily: 'ProximaNova-Regular',
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
    borderRadius: 20,
  },
  textCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    alignItems: 'center',
    fontSize: 15,
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
