import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, StyleSheet, Image, Animated, StatusBar} from 'react-native';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {colors} from '../../theme';
import {Text} from '../../components';

function DataScan({route, auth}: any) {
  const {item} = route.params,
    mountedAnimation = React.useRef(new Animated.Value(-100)).current;

  const animation = (toValue: number) => {
    Animated.timing(mountedAnimation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => animation(1), []);

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.containerRow,
          {transform: [{translateY: mountedAnimation}]},
        ]}>
        <View style={styles.containerData}>
          <Image
            source={{uri: auth.profile.avatar}}
            style={styles.imageAvatar}
          />
          <Text
            size={8}
            style={styles.textUsername}
            type="bold">{`${auth.profile.username}`}</Text>
        </View>
        <View style={styles.containerData}>
          <Image source={{uri: item.avatar}} style={styles.imageAvatar} />
          <Text style={styles.textUsername} type="bold">{`${item.name}`}</Text>
        </View>
      </Animated.View>

      <Text size={8} style={styles.textInfo} type="regular">
        <Text style={styles.textUsername} type="bold">{`${item.name}`}</Text>{' '}
        ini adalah teman anda dalam satu kelas ini, jadi silahkan berkenalan
        terlebih dahulu agar lebih akrab kedepannya
      </Text>
    </View>
  );
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DataScan);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  containerRow: {
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    width: widthPercentageToDP(90),
    flexDirection: 'row',
  },
  logo: {
    width: widthPercentageToDP(60),
    resizeMode: 'contain',
    marginRight: 10,
  },
  containerImage: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  imageAvatar: {
    height: heightPercentageToDP(20),
    width: heightPercentageToDP(20),
    marginBottom: 20,
  },
  containerData: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUsername: {
    textTransform: 'capitalize',
  },
  textInfo: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 40,
    width: widthPercentageToDP(90),
  },
});
