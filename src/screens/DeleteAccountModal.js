import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

export default ({visible, onCancel, onDelete}) => {
  return (
    <Modal isVisible={visible} backdropOpacity={0}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Are you sure you want to delete your account?
        </Text>
        <Text style={styles.text}>
          Breaking up is hard but you're welcome back anytime
        </Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.stayTouchable} onPress={onCancel}>
            <Text style={styles.stayText}>I'll stay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.byeTouchable} onPress={onDelete}>
            <Text style={styles.byeText}>Goodbye</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 30,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Bold',
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Regular',
    marginVertical: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  stayTouchable: {
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 20,
  },
  stayText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Bold',
  },
  byeTouchable: {
    borderRadius: 8,
    borderColor: '#2ecc71',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#2ecc71',
  },
  byeText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Bold',
  },
});
