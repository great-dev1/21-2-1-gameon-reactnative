/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {colors} from '../../common/colors';
import {images} from '../../common/images';
import {Input, Button, Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import APIKit from '../../services/api';

export default class SetBioUniversity extends Component {
  state = null;

  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      university: '',
      universities: [],
    };
  }

  next(navigate) {
    console.log(this.state.bio + this.state.university);
    const payload = {
      bio: {description: this.state.bio, university: this.state.university},
    };
    APIKit.setbiouniversity(payload).then(
      (response) => {
        console.log(response);
        navigate('SetAvailability');
      },
      (error) => {
        console.log(error);
      },
    );
  }

  componentDidMount() {
    //get Bio and University
    //get all universities
    APIKit.getuniversities().then(
      (response) => {
        var data = response.data;
        let newArray = [...data];
        newArray.forEach((val, idx) => {
          newArray[idx] = {...newArray[idx], label: val.name, value: val._id};
        });
        console.log(newArray);
        APIKit.getbiouniversity().then(
          // eslint-disable-next-line no-shadow
          (response) => {
            console.log(response);
            var bio =
              typeof response.data.description !== 'undefined'
                ? response.data.description
                : '';
            var university =
              typeof response.data.university !== 'undefined'
                ? response.data.university
                : '';
            this.setState({
              bio: bio,
              university: university,
              universities: newArray,
            });
            console.log(this.state.bio);
            console.log(this.state.university);
          },
          () => {},
        );
      },
      (error) => {
        console.log(error);
      },
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.main}>
          <View style={styles.sectionTop}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.tlabel}>{'Bio and University'}</Text>
          </View>
          <View style={styles.sectionMiddle}>
            <Input
              label="Bio"
              multiline
              value={this.state.bio}
              placeholder="Describe yourself and your sporting ability. E.g. I’m in first year and I’m a social tennis player who likes to play twice a week."
              style={styles.input}
              onChangeText={(value) => this.setState({bio: value})}
            />

            <DropDownPicker
              items={this.state.universities}
              defaultValue={this.state.university}
              placeholder="Select your university"
              containerStyle={{height: 40}}
              labelStyle={{
                color: 'grey',
                fontSize: RFValue(12, 580),
                alignItems: 'flex-start',
              }}
              placeholderStyle={{fontWeight: 'bold'}}
              onChangeItem={(item) => this.setState({university: item.value})}
            />

            <Text style={styles.label1}>
              {'We will be adding more universities soon'}
            </Text>
          </View>
          <View style={styles.sectionBottom}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Button
                buttonStyle={styles.navBtn_prev}
                icon={<Icon name={'chevron-left'} size={60} color="#fff" />}
                onPress={() => navigate('ChooseAbility')}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Button
                buttonStyle={styles.navBtn_next}
                icon={<Icon name={'chevron-right'} size={60} color="#fff" />}
                onPress={() => this.next(navigate)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
    flex: 2,
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 50,
  },
  sectionMiddle: {
    flex: 4,
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
});
