// import { transform } from '@babel/core';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CIRCLE_SIZE = 100;

const Circle = ({onTap, animationValue}) => {
    const inputRange = [0, 0.001, 0.5, 0.501, 1];
    const containerBg = animationValue.interpolate({
        inputRange,
        outputRange: ['gold', 'gold', 'gold', '#444', '#444']
    });

    const circleBg = animationValue.interpolate({
        inputRange,
        outputRange: ['#444', '#444', '#444', 'gold', 'gold']
    });

    return(
     <Animated.View style={[StyleSheet.absoluteFillObject, styles.circleContainer, {backgroundColor: containerBg}]}>
        <Animated.View style={[styles.circle, {
           backgroundColor: circleBg,
           transform: [
               {
                   perspective: 400
               },
               { 
                   rotateY: animationValue.interpolate({
                   inputRange: [0, 0.5, 1],
                   outputRange: ['0deg', '-90deg', '-180deg']
               })
               },
               {
                   scale: animationValue.interpolate({
                       inputRange: [0, 0.5, 1],
                       outputRange: [1, 8, 1]
                   })
               },
            //    {
            //     translateX: animationValue.interpolate({
            //         inputRange: [0, 0.5, 1],
            //         outputRange: ['0%', '50%', '0%']
            //     })
            // },
            ]
           }]}
        >
            <TouchableOpacity onPress={onTap}>
                <View style={[styles.circle, styles.circleButton]}>
                    <AntDesign name='arrowright' size={28} color={'white'}/>
                </View>
            </TouchableOpacity>
        </Animated.View>
    </Animated.View>
    )
}

const styles = StyleSheet.create({
    circleContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 8,
        paddingBottom: 100,
        backgroundColor: 'gold'
    },
    circle:{
        backgroundColor: '#444',
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2
    },
    circleButton:{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Circle;