import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {colors} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
  },
  actionTop: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 50,
    zIndex: 1,
    paddingHorizontal: 30,
    height: heightPercentageToDP(5),
    width: widthPercentageToDP(100),
  },
  buttonExit: {
    height: heightPercentageToDP(5),
    width: heightPercentageToDP(5),
    backgroundColor: colors.backgroundColor + 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
  },
});

export default styles;
