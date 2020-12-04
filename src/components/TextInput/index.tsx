import React from 'react';
import {TextInput, Animated, View, Platform, Dimensions} from 'react-native';
import {colors, sizes} from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import {Button} from '..';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {RFValue as fs} from 'react-native-responsive-fontsize';

const {width} = Dimensions.get('window');

type PropsText = {
  placeholder?: string;
  style?: Object;
  containerStyle?: Object;
  handle: Function;
  isPassword?: boolean;
  isNumber?: any;
  multiline?: boolean;
  uppercase?: boolean;
};

const CustomTextInput: React.FC<PropsText> = ({
  style,
  containerStyle,
  placeholder,
  handle,
  isPassword,
  isNumber,
  multiline,
  uppercase,
}) => {
  const [state, setState] = React.useState({
    value: '',
    animated: new Animated.Value(0),
    hide: true,
  });

  const handleType = async (value: string) => {
    await setState({
      ...state,
      value,
    });
    await handle(value);
  };

  React.useEffect(() => {
    state.value !== '' ? animateText(fs(7, width)) : animateText(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.value.length === 0 ? state.value : null]);

  const animateText = (toValue: number): void => {
    Animated.timing(state.animated, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const hidePassword = (): void => {
    setState({...state, hide: !state.hide});
  };

  const animate = {
      fontSize: state.animated.interpolate({
        inputRange: Platform.OS === 'ios' ? [-1, 2] : [0, 1],
        outputRange: Platform.OS === 'ios' ? [-2, 1] : [0, 1],
      }),
      fontFamily: 'Lato-Semibold',
      marginBottom: 5,
      color: colors.gray4,
    },
    styleTextInput = {
      width: isPassword ? '90%' : '100%',
      borderRadius: sizes.radiusMedium,
      fontFamily: 'Lato-Regular',
      backgroundColor: colors.backgroundColor,
      padding: 10,
      borderColor: state.value !== '' ? colors.success : colors.gray2,
      fontSize: fs(7, width),
    },
    containerText: Object = {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.backgroundColor,
      borderRadius: 5,
      height: heightPercentageToDP(6.5),
    },
    container = [containerStyle];

  return (
    <View style={container}>
      <Animated.Text style={animate}>{`${placeholder}`}</Animated.Text>
      <View style={containerText}>
        <TextInput
          multiline={multiline}
          keyboardType={isNumber ? 'phone-pad' : 'default'}
          placeholder={`${placeholder}`}
          autoCapitalize={uppercase ? 'characters' : 'none'}
          value={state.value}
          onChangeText={(value: any) => handleType(value)}
          style={[styleTextInput, style]}
          secureTextEntry={isPassword ? state.hide : false}
        />
        {isPassword && (
          <Button onPress={hidePassword}>
            <Icon
              name={state.hide ? 'eye-off' : 'eye'}
              color="grey"
              size={fs(13, width)}
            />
          </Button>
        )}
      </View>
    </View>
  );
};

CustomTextInput.defaultProps = {
  placeholder: 'Input here',
  multiline: false,
  uppercase: false,
};

export default CustomTextInput;
