import Axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import {  Dimensions, FlatList, Image, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';



const { width, height } = Dimensions.get('screen');
console.log('WIDTH:',width)
// console.log('HEIGHT', height);
const API_KEY = "563492ad6f917000010000010fd3ec5633044b2daaa24f941dcc4339"
const API_URL = "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20"
const IMAGE_SIZE = 80;
const SPACING = 10;


const fetchImagesFromPexels = async() => {
    var response = await Axios.get(API_URL, {
        headers: {
            'Authorization': API_KEY
        }
    });
    // return response;
    const {photos} = response.data
    return photos;
}

const Gallery = () => {
    const [images, setImages] = useState(null);
    const topRef = useRef();
    const thumbRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToActiveIndex = (index) => {
        setActiveIndex(index)
        topRef ?.current ?.scrollToOffset({
          offset: index * width,
          animated: true
        })
        if(index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2){
          thumbRef?.current?.scrollToOffset({
            offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
            animated: true
          })
        }
    }


    useEffect(() => {
        const fetchImages = async () => {
            const images = await fetchImagesFromPexels();
            setImages(images);
            //console.log(responseCheck)
        }
        fetchImages();
    }, [])


    if(!images){
        return(
            <Text>Loading...</Text>
        );
    }

    // const topRef = useRef();

    // console.log(images);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* <StatusBar hidden /> */}
            <FlatList
              ref={topRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={ev => {
                  scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
              }} 
              data={images}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => {
                return(
                  <View style={{width, height}}>
                    <Image 
                        source={{uri: item.src.portrait}}
                        style={StyleSheet.absoluteFillObject} 
                    />
                  </View>
                )
              }}
            />

            <FlatList />

            {/* {console.log(scrollToActiveIndex)} */}
            <FlatList
              ref={thumbRef}
              style={{position: 'absolute', bottom: IMAGE_SIZE}}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: SPACING}} 
              data={images}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => {
                return(
                    <TouchableOpacity
                      onPress={() => scrollToActiveIndex(index)}>
                        <Image 
                          source={{uri: item.src.portrait}}
                          style={{height: IMAGE_SIZE, width: IMAGE_SIZE, borderRadius: 12, marginRight: SPACING, borderWidth: 2, borderColor: activeIndex === index ? 'white' : 'transparent'}} 
                        />
                    </TouchableOpacity>
                )
              }}
            />
        </View>
        
    );
};

export default Gallery;