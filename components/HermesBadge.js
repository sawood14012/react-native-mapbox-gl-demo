/* eslint-disable no-undef */

import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

import Colors from '../styles/colors';

export default HermesBadge = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const version =
    global.HermesInternal?.getRuntimeProperties?.()['OSS Release Version'] ??
    '';
  return global.HermesInternal ? (
    <View style={styles.badge}>
      <Text
        style={[
          styles.badgeText,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {`Engine: Hermes ${version}`}
      </Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 8,
    right: 12,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
});
