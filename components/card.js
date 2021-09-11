/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {SliderBox} from 'react-native-image-slider-box';
import {faCity, faGlobeAsia} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default Card = props => {
  //console.log(props.data);
  const parseImgs = data => {
    var items = [];
    data.forEach(element => {
      items.push(element.url);
    });
    console.log(items);
    return items;
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
      <View style={{flex: 0.5}}>
        <SliderBox
          images={parseImgs(props.data.images)}
          sliderBoxHeight={'100%'}
          parentWidth={190}
        />
      </View>
      <View style={{flex: 0.5}}>
        <Text h3 style={{marginBottom: 2}}>
          {props.data.title}
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <FontAwesomeIcon
            size={18}
            icon={faCity}
            color="#4B6587"
            style={{marginRight: 5}}
          />
          <Text style={{fontSize: 18}}>{props.data.city}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <FontAwesomeIcon
            size={18}
            icon={faGlobeAsia}
            color="#4B6587"
            style={{marginRight: 5}}
          />
          <Text style={{fontSize: 18}}>{props.data.country + '\n'}</Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text h6>{props.data.description}</Text>
        </View>
      </View>
    </View>
  );
};
