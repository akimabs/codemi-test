import {useFocusEffect} from '@react-navigation/native';
import {Formik} from 'formik';
import React from 'react';
import {ScrollView, StyleSheet, View, Image, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

import {Button, showErrorToast, Text, TextInput} from '../../components';
import {colors, images} from '../../theme';
import {setAuth, setProfile} from '../../store/_actions/auth';

function Login({dispatch, auth}: any) {
  useFocusEffect(() => StatusBar.setBackgroundColor('transparent'));

  const submit = async (value: any) => {
    const {data} = auth;
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].username === value.username &&
        data[i].password === value.password
      ) {
        dispatch(setAuth('token'));
        dispatch(
          setProfile({username: data[i].username, avatar: data[i].avatar}),
        );
        break;
      } else {
        showErrorToast('Username dan password salah');
      }
    }
  };

  const Header = () => (
    <LinearGradient
      colors={[colors.primary, colors.primary2]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.header}>
      <View style={styles.circle1} />
    </LinearGradient>
  );

  const Form = () => (
    <Formik
      initialValues={{username: '', password: ''}}
      onSubmit={(values: any) => submit(values)}>
      {({values, handleChange, handleSubmit}: any) => (
        <View style={styles.containerForm}>
          <Image source={images.Logo} style={styles.imageLogo} />
          <Text type="bold" size={8} style={styles.textHeader}>
            Sign in with username
          </Text>
          <TextInput
            handle={handleChange('username')}
            containerStyle={styles.textInput}
            placeholder="Username"
          />
          <TextInput
            handle={handleChange('password')}
            containerStyle={styles.textInput}
            placeholder="Password"
            isPassword
          />
          <Button
            onPress={handleSubmit}
            type={values.username && values.password ? 'primary' : 'light'}
            disable={!values.username && !values.password ? true : false}
            style={styles.button}>
            <Text
              type="bold"
              color={
                !values.username || !values.password ? colors.primary : 'white'
              }>
              Sign In
            </Text>
          </Button>
        </View>
      )}
    </Formik>
  );

  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent />
      <Header />
      <Form />
    </ScrollView>
  );
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: heightPercentageToDP(25),
    width: widthPercentageToDP(100),
    backgroundColor: colors.primary,
    paddingHorizontal: 25,
  },
  circle1: {
    height: heightPercentageToDP(20),
    width: heightPercentageToDP(25),
    backgroundColor: '#FFFFFF50',
    position: 'absolute',
    borderTopLeftRadius: 1200,
    borderBottomLeftRadius: 2000,
    borderBottomRightRadius: 2000,
    right: -20,
    top: -40,
  },
  containerForm: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
    marginTop: -20,
  },
  imageLogo: {
    resizeMode: 'contain',
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(40),
    marginBottom: 10,
  },
  textHeader: {
    marginBottom: 20,
    marginTop: -5,
    color: 'grey',
  },
  textInput: {
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
    height: heightPercentageToDP(6),
    justifyContent: 'center',
  },
});
