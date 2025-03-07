import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  const bikes = [
    { id: 1, name: 'Bike 1', lat: 37.78825, lng: -122.4324 },
    { id: 2, name: 'Bike 2', lat: 37.78425, lng: -122.4304 },
    { id: 3, name: 'Bike 3', lat: 37.78625, lng: -122.4344 },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {bikes.map(bike => (
          <Marker
            key={bike.id}
            coordinate={{ latitude: bike.lat, longitude: bike.lng }}
            title={bike.name}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
