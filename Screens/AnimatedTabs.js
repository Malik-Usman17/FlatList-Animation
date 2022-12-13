import React, {useRef, createRef} from 'react';
import {View, FlatList, Text, StyleSheet, StatusBar, Animated, Dimensions, Image, findNodeHandle} from 'react-native';
import Tabs from '../Components/Tabs';
import Indicator from '../Components/Indicator';

const {width, height} = Dimensions.get('screen')
const images = {
    man:
      'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    women:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    kids:
      'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    skullcandy:
      'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    help:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  };

  export const imageData = Object.keys(images).map((i) => ({
    key: i,
    title: i,
    image: images[i],
    imageRef: createRef()
  }));


  const itemView = ({item}) => {
      return(
          <View style={{width, height}}>
            <Image 
              source={{uri: item.image}}
              style={[StyleSheet.absoluteFillObject, {resizeMode: 'cover'}]}
            //   style={{flex: 1, resizeMode: 'cover'}}
            />
            <View style={[StyleSheet.absoluteFillObject, {backgroundColor: 'rgba(0, 0, 0, 0.3)'}]}/>
          </View>
      )
  }

const AnimatedTabs = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
    return(
        <View>
            <StatusBar hidden/>
            <Animated.FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false}
              )}
              data={imageData}
              keyExtractor={(item) => item.key}
              renderItem={itemView}
            />

            <Tabs scrollX={scrollX} data={imageData}/>
            {/* <Indicator /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default AnimatedTabs;