import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';
import IconQr from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import RNRestart from 'react-native-restart';

import {colors, sizes} from '../../theme';
import {Button, Text} from '../../components';
import {persistor} from '../../store/store';

function Home({auth, navigation}: any) {
  const refsModal: any = React.useRef(),
    {profile} = auth;

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
  });

  const openModal = () => {
    refsModal.current.open();
  };

  const logout = () => {
    refsModal.current.close();
    setTimeout(async () => {
      await persistor.purge();
      await AsyncStorage.clear();
      RNRestart.Restart();
    }, 500);
  };

  const navigateScanner = () => {
    refsModal.current.close();
    setTimeout(() => navigation.navigate('Scanner'), 500);
  };

  const Header = () => (
    <LinearGradient
      colors={[colors.primary, colors.primary2]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.header}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
    </LinearGradient>
  );

  const ContainerData = () => (
    <View style={styles.containerData}>
      <View style={styles.containerProfile}>
        <View style={styles.flexRow}>
          <View style={styles.containerAvatar}>
            {profile ? (
              <Image
                source={{uri: `${profile.avatar}`}}
                style={styles.imageAvatar}
              />
            ) : null}
          </View>
          <View>
            <Text type="bold" size={10} style={styles.textSubtitle}>
              {profile ? `${profile.username}` : null}
            </Text>
            <Text type="regular" color="grey" style={styles.textSubtitle}>
              Peserta
            </Text>
          </View>
        </View>
        <Button onPress={openModal} style={styles.buttonInfo}>
          <Icon name="info" size={heightPercentageToDP(4)} />
        </Button>
      </View>
      <View style={styles.containerQrCode}>
        <QRCode
          value={
            profile ? `${profile.username} ${profile.avatar}` : 'will be data'
          }
          size={heightPercentageToDP(30)}
        />
      </View>
      <RBSheet
        customStyles={{
          container: {
            borderTopLeftRadius: sizes.radiusMedium,
            borderTopRightRadius: sizes.radiusMedium,
          },
        }}
        ref={refsModal}
        height={heightPercentageToDP(30)}
        closeOnDragDown
        closeOnPressMask
        closeOnPressBack>
        <View>
          <View style={styles.containerModal}>
            <View style={styles.containerInfo}>
              <Text type="semibold" style={styles.textSubtitle}>
                Scan QR untuk melihat profile teman
              </Text>
              <Text type="regular" style={styles.textSubtitle} color="grey">
                Pastikan kamu sudah terdaftar di aplikasi agar profile bisa
                langsung terlihat
              </Text>
            </View>
            <Button onPress={navigateScanner}>
              <IconQr name="qrcode-scan" size={heightPercentageToDP(4)} />
            </Button>
          </View>
          <Button onPress={logout} style={styles.containerModal}>
            <View style={styles.containerInfo}>
              <Text
                color={colors.danger}
                type="semibold"
                style={styles.textSubtitle}>
                Sign Out
              </Text>
              <Text type="regular" style={styles.textSubtitle} color="grey">
                Keluar dari aplikasi
              </Text>
            </View>
          </Button>
        </View>
      </RBSheet>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <ContainerData />
    </View>
  );
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: heightPercentageToDP(55),
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
  circle2: {
    height: heightPercentageToDP(20),
    width: heightPercentageToDP(25),
    backgroundColor: '#FFFFFF50',
    position: 'absolute',
    borderTopRightRadius: 1200,
    borderBottomLeftRadius: 2000,
    left: -20,
    bottom: -40,
  },
  containerData: {
    marginTop: heightPercentageToDP(-5),
    backgroundColor: colors.white,
    borderTopLeftRadius: sizes.radiusMedium,
    borderTopRightRadius: sizes.radiusMedium,
  },
  containerProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  flexRow: {
    flexDirection: 'row',
  },
  containerAvatar: {
    marginRight: 20,
    marginTop: heightPercentageToDP(-5),
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.gray3,
    borderRadius: sizes.radiusMedium,
  },
  imageAvatar: {
    height: heightPercentageToDP(10),
    width: heightPercentageToDP(10),
  },
  textSubtitle: {
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  containerQrCode: {
    alignSelf: 'center',
    marginTop: heightPercentageToDP(5),
  },
  buttonInfo: {
    overflow: 'hidden',
    height: heightPercentageToDP(5),
    width: heightPercentageToDP(5),
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    backgroundColor: colors.white,
  },
  containerModal: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: widthPercentageToDP(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerInfo: {
    width: widthPercentageToDP(70),
  },
});
