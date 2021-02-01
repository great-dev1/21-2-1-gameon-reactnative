/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import {colors} from '../common/colors';
import {images} from '../common/images';
import {BlurView} from '@react-native-community/blur';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import TrialCard from './TrialCard';
import TeamCard from './TeamCard';
import TrainingCard from './TrainingCard';
import EventCard from './EventCard';
import UserCard from './UserCard';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import OutOfCards from './OutOfCards';
import AntDesign from 'react-native-vector-icons/AntDesign';
import APIKit, {clearClientToken} from '../services/api';

import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

export const {width, height} = Dimensions.get('window');
function DateView(props) {
  console.log('props', props);
  return (
    <View style={styles.item}>
      <View style={styles.btn_date}>
        <Text style={styles.text3}>{props.data}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.circle_date,
            {
              backgroundColor: props.value[0] ? colors.green : colors.red,
            },
          ]}>
          <Text style={styles.text_date}>AM</Text>
        </View>
        <View
          style={[
            styles.circle_date,
            {
              backgroundColor: props.value[1] ? colors.green : colors.red,
            },
          ]}>
          <Text style={styles.text_date}>PM</Text>
        </View>
        <View
          style={[
            styles.circle_date,
            {
              backgroundColor: props.value[2] ? colors.green : colors.red,
            },
          ]}>
          <Text style={styles.text_date}>EVE</Text>
        </View>
      </View>
    </View>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.swiper = null;
    this.state = {
      userId: '',
      modalVisible: false,
      matchModal: false,
      toggleMatchingPanel: false,
      toggleMatchingFollowPanel: false,
      toggleTeamPanel: false,
      allcards: [],
      universities: [],
      currentUser: {},
      latitude: null,
      longitude: null,
      address: '',
      matchUser: {},
      matchUserId: null,
    };
  }

  componentDidMount() {
    console.log('svg', images.chat);
    AsyncStorage.getItem('usedBefore', (err, result) => {
      if (err) {
      } else {
        if (result == null) {
          console.log('null value recieved', result);
          this.setState({modalVisible: true});
        } else {
          console.log('result', result);
        }
      }
    });
    AsyncStorage.setItem(
      'usedBefore',
      JSON.stringify({value: 'true'}),
      (err, result) => {
        console.log('error', err, 'result', result);
      },
    );
    APIKit.getCards()
      .then((resp) => {
        this.setState({allcards: resp.data});
      })
      .catch(this.onAxiosError);
    APIKit.getuniversities()
      .then((resp) => {
        this.setState({universities: resp.data});
      })
      .catch(this.onAxiosError);
    APIKit.getSetting()
      .then((resp) => {
        console.log('setting', resp.data);
        this.props.setSetting(resp.data);
        this.setState({userId: resp.data.userId});
        console.log('userId', resp.data.userId);
        this.props.socket.emit('User:Joined', resp.data.userId);
      })
      .catch(this.onAxiosError);
    APIKit.getContacts()
      .then((resp1) => {
        this.props.setContacts(resp1.data);
      })
      .catch(this.onAxiosError);
    APIKit.getTeams()
      .then((resp) => {
        console.log(resp.data.docs);
        this.props.setTeams(resp.data.docs);
      })
      .catch(this.onAxiosError);
    APIKit.getsports()
      .then((resp) => {
        this.props.setSports(resp.data);
      })
      .catch(this.onAxiosError);
    APIKit.getprofile()
      .then((resp) => {
        if (this.state.latitude) {
          APIKit.profile({
            ...resp.data,
            location: {
              lat: this.latitude,
              lng: this.longitude,
              address: this.address,
            },
          }).then((resp1) => {
            this.props.setProfile(resp1.data);
          });
        } else {
          this.props.setProfile(resp.data);
        }
      })
      .catch(this.onAxiosError);
    this.props.socket.on('Online:Users', (onlineUsers) => {
      console.log('Online:Users', onlineUsers);
    });
    this.props.socket.on('History', (history) => {
      console.log('Home History', history);
      if (
        history.from === this.state.userId &&
        history.to === this.props.curUser.userId
      ) {
        this.props.clearHistory();
        this.props.addHistory(history.msgs);
      }
    });
    this.props.socket.on('Message', (msg) => {
      console.log(msg);
      console.log(this.props.curUser);
      if (
        this.props.curUser.userId === msg.from ||
        this.props.curUser.userId === msg.to
      ) {
        this.props.addHistory([msg.msg]);
        this.props.socket.emit('Chat:Read', {
          from: this.state.userId,
          to: this.props.curUser.userId,
        });
      }
      this.props.setContacts(
        this.props.contacts.map((co) => {
          if (co.userId === msg.from) {
            return {
              ...co,
              count: co.count + 1,
              unread:
                this.props.curUser.userId === msg.from ||
                this.props.curUser.userId === msg.to
                  ? 0
                  : co.unread + 1,
              latest: msg.msg.msg,
              datetime: msg.msg.createdAt,
            };
          }
          if (co.userId === msg.to) {
            return {
              ...co,
              count: co.count + 1,
              unread: 0,
              latest: msg.msg.msg,
              datetime: msg.msg.createdAt,
            };
          }
          return co;
        }),
      );
    });
    this.props.socket.on('Game:Matched', (matchUserData) => {
      console.log(matchUserData);
      console.log(this.props.profile);
      if (matchUserData.userId === this.state.userId) {
        this.setState({
          matchUser: matchUserData.partnerProfile,
          matchUserId: matchUserData.partnerId,
          matchModal: true,
        });
      } else if (matchUserData.partnerId === this.state.userId) {
        this.setState({
          matchUser: matchUserData.userProfile,
          matchUserId: matchUserData.userId,
          matchModal: true,
        });
      }
    });
    this.props.socket.on('Chat:Read', (data) => {
      console.log('Chat:Read', data);
    });
  }
  onAxiosError = (err) => {
    console.log('HOME', err);
    if (this.removeItemValue()) {
      this.props.navigation.navigate('Signin');
    }
  };
  removeItemValue = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      clearClientToken();
      return true;
    } catch (exception) {
      return false;
    }
  };

  onModal1 = () => {
    this.setState({matchModal: false});
  };

  onToChat = () => {
    APIKit.getContacts().then((resp1) => {
      this.props.setContacts(resp1.data);
      this.setState({matchModal: false});
      this.props.clearHistory();
      const prop = resp1.data.find(
        (usr) => usr.userId === this.state.matchUserId,
      );
      if (prop) {
        this.props.setCurUser(prop);
        this.props.socket.emit('History', {
          from: this.state.userId,
          to: prop.userId,
        });
        this.props.socket.emit('Chat:Read', {
          from: this.state.userId,
          to: prop.userId,
        });
        this.props.navigation.navigate('Chat', {
          user: prop,
        });
      }
    });
  };

  onModal2 = () => {
    this.setState({modalVisible: false});
  };

  callLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        this.setState({latitude: currentLatitude, longitude: currentLongitude});
        //Setting state Longitude to re re-render the Longitude Text
        Geocoder.init('AIzaSyAeKw1f7h01OyvWvCfUKsRyTywseFWOWEk');
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then((json) => {
            const fullAddress = json.results[0].formatted_address;
            console.log(fullAddress);
            this.setState({address: fullAddress});
            if (this.props.profile.gender) {
              APIKit.profile({
                ...this.props.profile,
                location: {
                  lat: this.state.latitude,
                  lng: this.state.longitude,
                  address: this.state.address,
                },
              }).then((resp) => {
                this.props.setProfile(resp.data);
              });
            }
          })
          .catch((error) => console.log(error));
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 200000},
    );
  };

  simpleModal = () => {
    return (
      <Modal
        animationType={'slide'}
        visible={this.state.modalVisible}
        transparent
        onRequestClose={() => this.onModal2()}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text
              style={{
                color: 'white',
                fontSize: 32,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              {'WELCOME TO\nARMAGO!'}
            </Text>
            <Image
              source={{uri: this.props.profile.imageUrl}}
              style={{width: 70, height: 70, marginTop: 10, borderRadius: 999}}
            />

            <Text style={styles.text4}>{"It's a simple:"}</Text>

            <Text style={styles.text5}>
              {
                'All players displayed match your location, ability and availability'
              }
            </Text>
            <Text style={styles.text5}>
              {
                'You can update your availability and preferences in settings at any time'
              }
            </Text>
            <Text style={styles.text5}>
              {
                'Swipe right to show interest in other players, teams and events'
              }
            </Text>
            <Text style={styles.text5}>{'Swipe left to discuss them'}</Text>
            <Text style={styles.text5}>{'A red dot shows mutual friends'}</Text>
            <Text style={styles.text5}>{"Tap on cards to read more'"}</Text>

            <TouchableOpacity
              style={[styles.btn, {marginTop: 20}]}
              onPress={() => this.onModal2()}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'ProximaNova-Regular',
                  fontSize: 17,
                }}>
                Ready!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  matchModal = () => {
    return (
      <Modal
        animationType={'slide'}
        visible={
          this.state.matchModal &&
          this.props.navigation.state.routeName === 'Home'
        }
        transparent
        onRequestClose={() => this.onModal1()}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Image
              source={images.GameOn2}
              style={{
                width: 180,
                height: 40,
                marginBottom: 10,
              }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              {"IT'S A MATCH!"}
            </Text>
            <Image
              source={{uri: this.state.matchUser.imageUrl}}
              style={{
                width: 120,
                height: 120,
                marginTop: 10,
                borderRadius: 999,
              }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 15,
              }}>
              {this.state.matchUser.firstName}
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                width: 17,
                height: 17,
                borderRadius: 17,
                margin: 7,
              }}
            />
            <View
              style={{
                backgroundColor: 'white',
                width: 17,
                height: 17,
                borderRadius: 17,
                margin: 7,
              }}
            />
            <View
              style={{
                backgroundColor: 'white',
                width: 17,
                height: 17,
                borderRadius: 17,
                margin: 7,
              }}
            />
            <Image
              source={
                this.props.profile
                  ? {uri: this.props.profile.imageUrl}
                  : images.user9
              }
              style={{width: 70, height: 70, marginTop: 10, borderRadius: 999}}
            />
            <TouchableOpacity
              style={[styles.btn, {marginTop: 20}]}
              onPress={() => this.onToChat()}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'ProximaNova-Regular',
                  fontSize: 17,
                }}>
                See Availability and Chat!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, {marginTop: 20, backgroundColor: '#F67800'}]}
              onPress={() => this.onModal1()}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'ProximaNova-Regular',
                  fontSize: 17,
                }}>
                Keep Browsing
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  setTogglePanel = (visible, user = {}) => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({toggleMatchingPanel: visible, currentUser: user});
  };

  blurView = () => {
    return (
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="black"
      />
    );
  };
  render() {
    const {navigate} = this.props.navigation;
    const style_invisible_newMatch =
      this.state.toggleMatchingPanel === false &&
      this.state.toggleTeamPanel === false &&
      this.state.toggleMatchingFollowPanel === false
        ? {opacity: 1}
        : {height: 0, opacity: 0, flex: 0};
    const style_visible_newMatch =
      this.state.toggleMatchingPanel === true
        ? {opacity: 1}
        : {height: 0, opacity: 0, flex: 0};
    const style_visible_newMatch_follow =
      this.state.toggleMatchingFollowPanel === true
        ? {opacity: 1}
        : {height: 0, opacity: 0, flex: 0};
    const style_visible_team =
      this.state.toggleTeamPanel === true
        ? {opacity: 1}
        : {height: 0, opacity: 0, flex: 0};
    const modal_style =
      (this.state.modalVisible === true || this.state.matchModal === true) &&
      Platform.OS === 'android'
        ? {opacity: 0.7}
        : {};

    const users =
      this.state.allcards &&
      this.state.allcards.find((cd) => cd.users !== undefined) &&
      this.state.allcards.find((cd) => cd.users !== undefined).users;
    const teams =
      this.state.allcards &&
      this.state.allcards.find((cd) => cd.team !== undefined) &&
      this.state.allcards.find((cd) => cd.team !== undefined).team;
    const trials =
      this.state.allcards &&
      this.state.allcards.find((cd) => cd.trial !== undefined) &&
      this.state.allcards.find((cd) => cd.trial !== undefined).trial;
    const training =
      this.state.allcards &&
      this.state.allcards.find((cd) => cd.traning !== undefined) &&
      this.state.allcards.find((cd) => cd.traning !== undefined).traning;
    const events =
      this.state.allcards &&
      this.state.allcards.find((cd) => cd.event !== undefined) &&
      this.state.allcards.find((cd) => cd.event !== undefined).event;
    let cards = [];
    if (users) {
      cards = users
        .filter((user) => user.bio)
        .map((user, index) => (
          <Card
            style={styles.card}
            key={'user' + index}
            onSwipedLeft={() => {
              APIKit.cardGame({partner: user.id, enable: false}).then(
                (resp) => {
                  console.log(resp);
                },
              );
            }}
            onSwipedRight={() => {
              APIKit.cardGame({partner: user.id, enable: true}).then((resp) => {
                console.log(resp);
              });
            }}>
            <UserCard
              user={user}
              universities={this.state.universities}
              setTogglePanel={this.setTogglePanel}
              setToggleFollowPanel={(val) => {
                this.state.setToggleMatchingFollowPanel(val);
              }}
              handleReportUser={() => {
                if (this.swiper !== null) {
                  this.setState({
                    toggleMatchingPanel: false,
                    toggleTeamPanel: false,
                  });
                  this.swiper.swipeLeft();
                }
              }}
            />
          </Card>
        ));
      teams.map((team, index) => {
        cards.push(
          <Card
            style={styles.card}
            key={'team' + index}
            onSwipedLeft={() => {
              console.log(this.props.setting);
              APIKit.rejectTeam(
                {
                  player: this.state.userId,
                },
                team.chief,
              ).then((resp) => {
                console.log(resp);
              });
            }}
            onSwipedRight={() => {
              console.log(this.props.setting);
              APIKit.joinTeam(
                {
                  player: this.state.userId,
                },
                team.chief,
              ).then((resp) => {
                console.log(resp);
                APIKit.getTeams().then((resp1) => {
                  this.props.setTeams(resp1.data.docs);
                });
              });
            }}>
            <TeamCard
              team={team}
              setToggleTeamPanel={(visible) =>
                this.setState({toggleTeamPanel: visible})
              }
            />
          </Card>,
        );
      });
      training.map((tr, index) => {
        cards.push(
          <Card
            style={styles.card}
            key={'training' + index}
            onSwipedRight={() => navigate('TrainingAccept')}>
            <TrainingCard training={tr} />
          </Card>,
        );
      });
      events.map((event, index) => {
        cards.push(
          <Card
            style={styles.card}
            key={'event' + index}
            onSwipedRight={() =>
              navigate('EventAccept', event.$__.scope.formUrl)
            }>
            <EventCard event={event} />
          </Card>,
        );
      });
      trials.map((trial, index) => {
        cards.push(
          <Card
            style={styles.card}
            key={'trial' + index}
            onSwipedLeft={() => {
              console.log('left');
              APIKit.cardJoin({
                cardId: trial.id,
                status: false,
                cardType: 'trial',
              }).then((resp) => {
                console.log(resp);
              });
            }}
            onSwipedRight={() => {
              // console.log('right');
              // APIKit.cardJoin({
              //   cardId: trial.id,
              //   status: true,
              //   cardType: 'trial',
              // }).then((resp) => {
              //   console.log(resp);
              // });
              navigate(
                'TrialAccept',
                trial.formUrl ? trial.formUrl : 'https://google.com',
              );
            }}>
            <TrialCard trial={trial} />
          </Card>,
        );
      });
    }
    return (
      <View style={[styles.container]}>
        <>
          <Header navigate={navigate} />
          <CardStack
            style={[styles.cardstack, style_invisible_newMatch, modal_style]}
            ref={(swiperRef) => {
              this.swiper = swiperRef;
            }}
            renderNoMoreCards={() => {
              return <OutOfCards />;
            }}
            disableTopSwipe={true}
            disableBottomSwipe={true}
            verticalSwipe={false}>
            {cards}
          </CardStack>
          {this.state.toggleMatchingPanel && (
            <View style={[styles.cardstack, style_visible_newMatch]}>
              <Card style={styles.card}>
                <View style={styles.main}>
                  {this.state.currentUser.mFriends.length > 0 && (
                    <Image source={images.group} style={styles.groupImg} />
                  )}

                  <View
                    style={[
                      {
                        width: '100%',
                        height: '100%',
                        padding: 20,
                        flexDirection: 'column',
                        flex: 1,
                      },
                    ]}>
                    <Text style={[styles.text6, {textAlign: 'center'}]}>
                      {'Matching Availability'}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <DateView
                        data={'Monday'}
                        value={this.state.currentUser.availability.mon}
                      />
                      <DateView
                        data={'Tuesday'}
                        value={this.state.currentUser.availability.tue}
                      />
                      <DateView
                        data={'Wednesday'}
                        value={this.state.currentUser.availability.wed}
                      />
                      <DateView
                        data={'Thursday'}
                        value={this.state.currentUser.availability.thu}
                      />
                      <DateView
                        data={'Friday'}
                        value={this.state.currentUser.availability.fri}
                      />
                      <DateView
                        data={'Saturday'}
                        value={this.state.currentUser.availability.sat}
                      />
                      <DateView
                        data={'Sunday'}
                        value={this.state.currentUser.availability.sun}
                      />
                    </View>

                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      onPress={() => this.setTogglePanel(false)}>
                      <AntDesign name="up" size={30} color={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </View>
          )}
          {this.state.toggleMatchingFollowPanel && (
            <View style={[styles.cardstack, style_visible_newMatch_follow]}>
              <Card style={styles.card}>
                <View
                  style={[styles.main, {backgroundColor: colors.lightBlue}]}>
                  <Image source={images.group} style={styles.groupImg} />

                  <View style={{flex: 1, padding: 20}}>
                    <Text style={[styles.text6, {textAlign: 'center'}]}>
                      {'Mutual Friends'}
                    </Text>
                    <View style={{paddingTop: 10}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      onPress={() =>
                        this.setState({toggleMatchingFollowPanel: false})
                      }>
                      <AntDesign name="up" size={30} color={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </View>
          )}
          {this.state.toggleTeamPanel && (
            <View style={[styles.cardstack, style_visible_team]}>
              <Card style={styles.card}>
                <View style={[styles.main, {backgroundColor: colors.orange}]}>
                  <Image source={images.group} style={styles.groupImg} />

                  <View style={{flex: 1, padding: 20}}>
                    <Text style={[styles.text6, {textAlign: 'center'}]}>
                      {'Mutual Friends'}
                    </Text>
                    <View style={{paddingTop: 10}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user10} />
                          <Text style={styles.text7}>Jess Jones</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                        <View style={styles.m_avatar}>
                          <Image source={images.user11} />
                          <Text style={styles.text7}>Jack Norrow</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      onPress={() => this.setState({toggleTeamPanel: false})}>
                      <AntDesign name="up" size={30} color={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </View>
          )}
          {this.simpleModal()}
          {this.matchModal()}
          <Footer
            onSwipedLeft={() => {
              if (this.swiper !== null) {
                this.setState({
                  toggleMatchingPanel: false,
                  toggleTeamPanel: false,
                });
                this.swiper.swipeLeft();
              }
            }}
            onSwipedRight={() => {
              if (this.swiper !== null) {
                this.setState({
                  toggleMatchingPanel: false,
                  toggleTeamPanel: false,
                });
                this.swiper.swipeRight();
              }
            }}
          />
        </>
        {(this.state.modalVisible || this.state.matchModal) && this.blurView()}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  setting: state.main.data.setting,
  profile: state.main.data.profile,
  curUser: state.main.chat.curUser,
  socket: state.main.chat.socket,
  contacts: state.main.chat.contacts,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSetting: (data) => dispatch(Actions.setSetting(data)),
    setContacts: (data) => dispatch(Actions.setContacts(data)),
    setTeams: (data) => dispatch(Actions.setTeams(data)),
    setSports: (data) => dispatch(Actions.setSports(data)),
    setProfile: (data) => dispatch(Actions.setProfile(data)),
    addHistory: (data) => dispatch(Actions.addHistory(data)),
    clearHistory: (data) => dispatch(Actions.clearHistory(data)),
    setCurUser: (data) => dispatch(Actions.setCurUser(data)),
    clearAllData: () => dispatch(Actions.clearAllData()),
  };
  // ... normally is an object full of action creators
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    backgroundColor: colors.lightBlue,
    borderRightWidth: 3,
    borderLeftWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.gray,
    marginHorizontal: 30,
    justifyContent: 'center',
    borderRadius: 60,
  },
  cardstack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // bottom: 10
    // marginVertical : 10,
  },
  card: {
    width: width,
    height: responsiveHeight(63),
  },
  mask: {
    width: '100%',
  },
  circle: {
    backgroundColor: colors.green,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  img: {
    flex: 1.5,
    width: '100%',
    // height: 300,
    borderRadius: 50,
  },
  back_img: {
    width: width / 4.5,
    height: 60,
    top: 10,
    left: 10,
    borderRadius: 20,
  },
  groupImg: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 40,
    height: 40,
  },
  m_avatar: {
    flex: 0.2,
    textAlign: 'center',
    padding: 10,
  },
  text: {
    color: colors.white,
    fontSize: RFValue(12, 580),
    fontFamily: 'ProximaNova-Bold',
  },
  text1: {
    color: colors.white,
    fontSize: 30,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
    left: 20,
    top: 15,
  },
  text2: {
    flex: 1,
    color: colors.white,
    fontSize: 15,
    top: 20,
    marginHorizontal: 10,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
  },
  text6: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
  },
  text7: {
    color: colors.white,
    fontSize: 10,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
    textAlign: 'center',
  },
  title: {
    color: colors.white,
    fontSize: RFValue(23, 580),
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  racket: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modal: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
    // opacity: 0.2
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  btn: {
    backgroundColor: '#2ecc71',
    height: 50,
    width: '90%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginTop: 8,
    backgroundColor: 'white',
  },
  text4: {
    color: 'white',
    marginTop: 6,
    fontSize: 30,
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
    fontWeight: '700',
  },
  text5: {
    color: 'white',
    marginTop: 12,
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
    fontWeight: '700',
  },
  item: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn_date: {
    width: 100,
    height: 40,
    backgroundColor: '#34495E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 10,
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '700',
  },
  circle_date: {
    backgroundColor: colors.green,
    width: 35,
    height: 35,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 1,
  },
  text_date: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
  },
});
