/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import {Button, Text} from '../../src/components/';

describe('Button', () => {
  describe('Rendering', () => {
    it('should match to snapshot - Button', () => {
      const button = renderer.create(
          <Button type="primary" title="Button Primary" />,
        ),
        butttonLight = renderer.create(
          <Button type="light" title="Button Light" />,
        ),
        buttonSuccess = renderer.create(
          <Button type="success" title="Button Success" />,
        ),
        buttenDanger = renderer.create(
          <Button type="danger" title="Button Danger" />,
        ),
        withOutRipple = renderer.create(
          <Button
            type="primary"
            title="Button Primary"
            withOutRipple={false}
            withOutAnimate
          />,
        ),
        withOutAnimate = renderer.create(
          <Button
            type="primary"
            title="Button Primary"
            withOutAnimate
            withOutRipple={false}
          />,
        ),
        buttonWithChildern = renderer.create(
          <Button>
            <Text type="thin">Button Primary</Text>
          </Button>,
        ),
        disable = renderer.create(
          <Button
            disable
            withOutAnimate
            withOutRipple
            type="primary"
            title="Disable Button Primary"
          />,
        ),
        disableButtonWithChild = renderer.create(
          <Button disable withOutAnimate withOutRipple type="primary">
            <Text type="thin">Button Primary</Text>
          </Button>,
        );

      expect({
        button,
        butttonLight,
        buttonSuccess,
        buttenDanger,
        withOutRipple,
        withOutAnimate,
        buttonWithChildern,
        disable,
        disableButtonWithChild,
      }).toMatchSnapshot('button snapshot');
    });
  });
});
