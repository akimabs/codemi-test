import React from 'react';
import {
  Animated,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {Text} from '..';

import styles from './styles';

type PropsButton = {
  title?: String;
  type?: 'primary' | 'danger' | 'light' | 'success';
  onPress?: () => void;
  style?: Object;
  children?: React.Component | any;
  withOutRipple?: boolean;
  withOutAnimate?: boolean;
  disable?: boolean;
};

const Button: React.FC<PropsButton> = ({
  type,
  style,
  title,
  onPress,
  children,
  withOutRipple,
  withOutAnimate,
  disable,
}) => {
  const animated: any = React.useRef(new Animated.Value(1));

  const inAnimate = (): void => {
    Animated.spring(animated, {
      toValue: 1.03,
      useNativeDriver: true,
    }).start();
  };

  const outAnimate = (): void => {
    Animated.spring(animated, {
      toValue: 1,
      useNativeDriver: true,
    }).start(onPress);
  };

  const animatedStyle: Object = {
    transform: [{scale: animated}],
  };

  const types: Object = [
    type === 'danger' && styles.dark,
    type === 'primary' && styles.primary,
    type === 'light' && styles.light,
    type === 'success' && styles.success,
  ];

  const textStyles: Object = [
    type === 'danger' && styles.textDark,
    type === 'primary' && styles.textPrimary,
    type === 'light' && styles.textLight,
    type === 'success' && styles.textDark,
  ];

  const Touchable: any =
    Platform.OS !== 'ios'
      ? withOutRipple
        ? TouchableOpacity
        : TouchableNativeFeedback
      : TouchableOpacity;

  const Wrapper: any = withOutAnimate ? View : Animated.View;

  return (
    <View>
      {disable ? (
        <Wrapper style={[types, style, withOutAnimate && animatedStyle]}>
          {children ? (
            children
          ) : (
            <Text type="bold" style={textStyles}>
              {title}
            </Text>
          )}
        </Wrapper>
      ) : (
        <Touchable
          activeOpacity={0.99}
          delayPressIn={0}
          useForeground={true}
          onPressIn={inAnimate}
          onPressOut={outAnimate}
          onPress={onPress}>
          <Wrapper style={[types, style, withOutAnimate && animatedStyle]}>
            {children ? (
              children
            ) : (
              <Text type="bold" style={textStyles}>
                {title}
              </Text>
            )}
          </Wrapper>
        </Touchable>
      )}
    </View>
  );
};

Button.defaultProps = {
  withOutAnimate: false,
  withOutRipple: false,
  disable: false,
};

export default Button;
