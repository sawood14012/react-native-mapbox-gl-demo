/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {View, Image, Animated} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import Header from './components/Header';
const locationData = require('./landmarks.json');
import Card from './components/card';
import SearchableDropdown from 'react-native-searchable-dropdown';

import SplashScreen from 'react-native-splash-screen';

MapboxGL.setAccessToken(process.env.MAPBOX_GL_KEY);

export default App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const refRBSheet = useRef();
  var initialD = locationData.data.allLandmarks[0];
  const [selectedPlace, setSelectedPlace] = useState({
    title: initialD.name,
    image: initialD.images[0].url,
    images: initialD.images,
    country: initialD.country,
    city: initialD.city,
    description: initialD.description,
    lat: initialD.location.latitude,
    long: initialD.location.longitude,
  });
  //console.log(selectedPlace);
  const renderAnnotation = (counter, data) => {
    const id = `pointAnnotation${counter}`;

    const coordinate = [data.long, data.lat];
    //console.log('rendering', data);
    return (
      <MapboxGL.PointAnnotation
        key={id}
        id={id}
        title={data.title}
        onSelected={feature => onAnnotationSelected(feature, data)}
        coordinate={coordinate}>
        <Image
          source={require('./marker.png')}
          style={{
            flex: 1,
            resizeMode: 'contain',
            width: 25,
            height: 25,
          }}
        />
        <MapboxGL.Callout
          title={data.title}
          containterStyle={{
            flex: 1,
            background: '#fff',
            align: 'end',
            bottom: 0,
          }}
        />
      </MapboxGL.PointAnnotation>
    );
  };
  const constructMarkers = () => {
    var data = locationData.data.allLandmarks;
    const items = [];
    var count = 0;

    data.forEach(element => {
      var data = {
        title: element.name,
        image: element.images[0].url,
        images: element.images,
        country: element.country,
        city: element.city,
        description: element.description,
        lat: element.location.latitude,
        long: element.location.longitude,
      };
      items.push(renderAnnotation(count, data));
      count++;
    });

    return items;
  };

  const onAnnotationSelected = (feature, data) => {
    console.log('Selected');
    setSelectedPlace(data);
    refRBSheet.current.open();
  };

  return (
    <View style={{flex: 1, height: '100%', width: '100%'}}>
      {/*<Header />*/}
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={17}
        centerCoordinate={[selectedPlace.long, selectedPlace.lat]}
        style={{flex: 1}}>
        <View style={{width: '100%', marginTop: 40}}>
          <SearchableDropdown
            onItemSelect={element => {
              var data = {
                title: element.name,
                image: element.images[0].url,
                images: element.images,
                country: element.country,
                city: element.city,
                description: element.description,
                lat: element.location.latitude,
                long: element.location.longitude,
              };
              setSelectedPlace(data);
            }}
            containerStyle={{padding: 5}}
            itemStyle={{
              padding: 10,
              marginTop: 0,
              backgroundColor: '#F7F6F2',
              borderColor: '#dddddd',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{color: '#222'}}
            itemsContainerStyle={{maxHeight: 120}}
            items={locationData.data.allLandmarks}
            defaultIndex={2}
            resetValue={false}
            textInputProps={{
              placeholder: 'Search here..',
              underlineColorAndroid: 'transparent',
              style: {
                padding: 12,
                borderWidth: 1,
                backgroundColor: '#F7F6F2',
                borderColor: '#dddddd',
                borderRadius: 20,
              },
              onTextChange: text => {},
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
        <MapboxGL.Camera
          zoomLevel={17}
          centerCoordinate={[selectedPlace.long, selectedPlace.lat]}
          animationMode={'flyTo'}
          animationDuration={0}
        />
        {constructMarkers()}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              maxWidth: '100%',
            },
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <Card data={selectedPlace} />
        </RBSheet>
      </MapboxGL.MapView>
    </View>
  );
};
