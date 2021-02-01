/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {LongHeader} from '../components/longHeader';
import {colors} from '../common/colors';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppStatusBar from '../components/AppStatusBar';
import {useSelector} from 'react-redux';

const fullWeekDays = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

function DateView(props) {
  return (
    <View style={styles.item}>
      <View style={styles.btn_date}>
        <Text style={styles.text3}>{props.data}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.circle_date,
            {backgroundColor: props.value[0] ? colors.green : colors.red},
          ]}>
          <Text style={styles.text_date}>AM</Text>
        </View>
        <View
          style={[
            styles.circle_date,
            {backgroundColor: props.value[1] ? colors.green : colors.red},
          ]}>
          <Text style={styles.text_date}>PM</Text>
        </View>
        <View
          style={[
            styles.circle_date,
            {backgroundColor: props.value[2] ? colors.green : colors.red},
          ]}>
          <Text style={styles.text_date}>EVE</Text>
        </View>
      </View>
    </View>
  );
}

class ThreeDots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({position: (this.state.position + 23) % 100});
    }, 50);
  }
  render = () => {
    // console.log(this.state.position);
    if (this.props.isTyping) {
      const dots = [
        10 -
          Math.min(
            Math.min(
              Math.abs(this.state.position - 17),
              Math.abs(117 - this.state.position),
            ) / 10.0,
            4,
          ),
        10 - Math.min(Math.abs(this.state.position - 50) / 10.0, 4),
        10 - Math.min(Math.abs(this.state.position - 83) / 10.0, 4),
      ];
      return (
        <View style={styles.threeDots}>
          {dots.map((size, index) => (
            <View style={styles.dotContainer} key={'dot' + index}>
              <View style={{...styles.oneDot, width: size, height: size}} />
            </View>
          ))}
          <View
            style={{
              ...styles.oneDot,
              width: 5,
              height: 5,
              position: 'absolute',
              left: this.state.position * 0.28,
              alignSelf: 'center',
            }}
          />
        </View>
      );
    }
    return <></>;
  };
}

const ChatScreen = (props) => {
  const setting = useSelector((state) => state.main.data.setting);
  const history = useSelector((state) => state.main.chat.history);
  const socket = useSelector((state) => state.main.chat.socket);

  const [inputTime, setInputTime] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  var timeOut = null;

  useEffect(() => {
    socket.on('Typing', onSomeoneTyping);
  }, []);

  const onSend = (newMessages = []) => {
    newMessages.map((msg) => {
      socket.emit('Message', {
        from: setting.userId,
        to: props.user.userId,
        msg: msg.text,
      });
    });
  };

  const renderBubble = (bubbles) => {
    return (
      <Bubble
        {...bubbles}
        wrapperStyle={{
          left: {
            backgroundColor: colors.gray,
          },
          right: {
            backgroundColor: colors.lightgreen,
          },
        }}
        textStyle={{
          left: {
            color: 'white',
          },
          right: {
            color: 'white',
          },
        }}
      />
    );
  };

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const renderTime = (msgs) => {
    return (
      <Text
        style={{
          color: 'white',
          fontSize: 11,
          marginHorizontal: 10,
          marginBottom: 5,
        }}>
        {formatAMPM(msgs.currentMessage.createdAt)}
      </Text>
    );
  };

  const renderFooter = (IsTyping) => {
    // console.log(IsTyping);
    return (
      <View style={{flexDirection: 'row'}}>
        {IsTyping.isTyping ? (
          <Text
            style={{
              color: '#999',
              paddingBottom: 4,
              marginRight: 3,
              marginLeft: 10,
            }}>
            {props.user.firstName} is typing
          </Text>
        ) : (
          <View style={{width: 33, height: 23}} />
        )}
        <ThreeDots isTyping={IsTyping.isTyping} />
      </View>
    );
  };

  const onTyping = (text) => {
    if (text === '') {
      return;
    }
    const now = new Date();
    if (inputTime === null || now.getTime() - inputTime.getTime() > 500) {
      setInputTime(now);
      socket.emit('Typing', {
        from: setting.userId,
        to: props.user.userId,
      });
    }
  };

  const onSomeoneTyping = (typing) => {
    if (typing.from === props.user.userId && typing.to === setting.userId) {
      console.log('someone typing to me');
      if (timeOut) {
        clearTimeout(timeOut);
      }
      setIsTyping(true);
      timeOut = setTimeout(() => {
        console.log(isTyping);
        setIsTyping(false);
      }, 1000);
    }
  };

  const render = () => {
    return (
      <GiftedChat
        isTyping={isTyping}
        messages={history.map((msg, index) => {
          return {
            _id: 'msg' + index,
            text: msg.msg,
            sent: msg.status,
            createdAt: new Date(msg.createdAt),
            user: {
              _id: msg.from,
              name: props.user.firstName,
              avatar: props.user.imageUrl,
            },
          };
        })}
        onSend={(msg) => onSend(msg)}
        onInputTextChanged={(text) => onTyping(text)}
        renderBubble={renderBubble}
        renderTime={renderTime}
        renderFooter={renderFooter}
        user={{
          _id: setting.userId,
        }}
      />
    );
  };
  return render();
};

export default (props) => {
  const [togglePanel, setTogglePanel] = useState(false);
  const [arrowIcon, setArrowIcon] = useState('down');
  const myAvailability = useSelector(
    (state) => state.main.data.profile.availability,
  );
  console.log(myAvailability);
  const onTogglePanel = (toggle) => {
    setTogglePanel(toggle);
    setArrowIcon(toggle ? 'up' : 'down');
  };
  const render = () => {
    const {navigation} = props;
    const {navigate} = props.navigation;
    const user = navigation.getParam('user');
    const changeStyle = togglePanel === false ? {height: 200} : {height: 450};
    const today = new Date();
    let weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    weekdays = weekdays.concat(weekdays.slice(0, today.getDay()));
    weekdays = weekdays.slice(today.getDay(), weekdays.length);
    let availableDays = weekdays.filter(
      (w) =>
        (user.availability[w].includes(true) ||
          user.availability[w].includes('true') ||
          user.availability[w].includes('1') ||
          user.availability[w].includes(1)) &&
        myAvailability &&
        (myAvailability[w].includes(true) ||
          myAvailability[w].includes(1) ||
          myAvailability[w].includes('1') ||
          myAvailability[w].includes('true')),
    );
    console.log('availableDays', availableDays);
    return (
      <>
        <AppStatusBar
          backgroundColor={colors.lightgreen}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <SafeAreaView style={styles.container}>
          <LongHeader
            title={user.firstName}
            avatar={{uri: user.imageUrl}}
            dark={true}
            left={colors.lightgreen}
            route={'Messages'}
            navigate={navigate}
            bcolor={colors.gray}
            rightIcon={'ellipsis1'}
            rightMenu={true}
            userId={user.userId}
          />
          <View
            style={[
              {
                backgroundColor: colors.darkBlue,
                padding: 15,
                width: '80%',
                justifyContent: 'center',
                textAlign: 'center',
                alignSelf: 'center',
                borderRadius: 20,
                marginVertical: 20,
              },
              changeStyle,
            ]}>
            <Text style={styles.text6}>{'Matching Availability'}</Text>
            <View style={{paddingVertical: 20}}>
              {!togglePanel
                ? availableDays
                    .slice(0, 2)
                    .map((day) => (
                      <DateView
                        key={day}
                        data={fullWeekDays[day]}
                        value={user.availability[day]}
                      />
                    ))
                : weekdays.map((day) => (
                    <DateView
                      key={day}
                      data={fullWeekDays[day]}
                      value={user.availability[day]}
                    />
                  ))}
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
                togglePanel ? onTogglePanel(false) : onTogglePanel(true)
              }>
              <AntDesign name={arrowIcon} size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          <ChatScreen user={user} />
        </SafeAreaView>
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
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    marginTop: 8,
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
  text6: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'ProximaNova-Bold',
    fontWeight: '700',
    textAlign: 'center',
  },
  threeDots: {
    width: 33,
    height: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  dotContainer: {
    width: 11,
    height: 11,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  oneDot: {
    backgroundColor: '#aaa',
    borderRadius: 10,
  },
});
