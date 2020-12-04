import {StackActions} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {Button, showErrorToast, Text} from '../../components/';

import styles from './styles';

function Scanner({navigation, auth}: any) {
  const [ready, setReady] = React.useState(false),
    [readData, setRead] = React.useState(false);
  const cameraRef: any = React.useRef();

  const back = () => {
    navigation.goBack();
  };

  const submit = (data: string) => {
    const name = data.split(' ')[0],
      avatar = data.split(' ')[1];
    if (name === auth.profile.username) {
      showErrorToast('Kamu melakukan scan akun sendiri');
      navigation.goBack();
    } else {
      navigation.dispatch(
        StackActions.replace('DataScan', {item: {name, avatar}}),
      );
    }
  };

  const handleRead = ({data}) => {
    submit(data);
    setRead(true);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 400);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.actionTop}>
        <Button onPress={back} style={styles.buttonExit}>
          <Icon name="x" color="white" size={heightPercentageToDP(3)} />
        </Button>
        <Text type="regular" size={7} color="white">
          Scanner
        </Text>
        <Button style={styles.buttonExit}>
          <Icon name="info" color="white" size={heightPercentageToDP(3)} />
        </Button>
      </View>
      {!ready ? (
        <View style={styles.camera} />
      ) : (
        <RNCamera
          ref={cameraRef}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={!readData ? handleRead : () => {}}
          style={styles.camera}>
          <BarcodeMask
            height={heightPercentageToDP(30)}
            width={heightPercentageToDP(30)}
          />
        </RNCamera>
      )}
    </View>
  );
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Scanner);
