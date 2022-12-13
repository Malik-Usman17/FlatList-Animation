import React, {useRef, useState} from 'react';
import {View, Text, StatusBar, StyleSheet, TouchableOpacity, Animated} from 'react-native';
// import Animated from 'react-native-reanimated';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import Circle from '../Components/Circle';
import TryScreen from './TryScreen';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const CIRCLE_SIZE = 100;


const DotAnimation = ({navigation}) => {

    const animatedValue = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);
    
    // const onPress = () => {
    //     Animated.timing(animatedValue, {
    //         toValue: 1,
    //         duration: 3000,
    //         useNativeDriver: false
    //     }).start()
    // };

    const animation = (toValue) => Animated.timing(animatedValue, {
        toValue,
        duration: 3000,
        useNativeDriver: false
    });

    const onPress = () => {
        setIndex(index === 1 ? 0 : 1);
        animation(index === 1 ? 0 : 1).start();
        navigation.push('TryScreen')
    }

    return(
        <View style={styles.container}>
            <StatusBar style='auto' hidden/>
            <Circle onTap={onPress} animationValue={animatedValue}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-start'
    },
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
});

export default DotAnimation;