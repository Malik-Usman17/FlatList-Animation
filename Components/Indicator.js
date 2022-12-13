import React from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import imageData from '../Screens/AnimatedTabs';

const Indicator = ({measures, scrollX}) => {
  
  const {width, height} = Dimensions.get('screen');
  // console.log('Measures:', measures)
    const inputRange = imageData.map((_, i) => i * width);
    
    const indicatorWidth = scrollX.interpolate({
      inputRange,
      outputRange: measures.map((measure) => measure.width)
    });

    return(
      <Animated.View style={{position: 'absolute', height: 4, width: indicatorWidth, left: 0, backgroundColor: 'white', bottom: -10}} />
    )
  }

// const styles = StyleSheet.create({
//     mainView:{
//         position: 'absolute', 
//         height: 4, 
//         width: measures[0].width,
//         left: measures[0].x, 
//         backgroundColor: 'white',
//         bottom: -10
//         //top: 100
//     }
// })

export default Indicator;