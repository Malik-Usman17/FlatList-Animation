import React, {useEffect, useState, useRef} from 'react';
import {TouchableOpacity, View, Text, FlatList, Image, Dimensions, StyleSheet} from 'react-native';
import Axios from 'axios';

const API_KEY = "563492ad6f917000010000010fd3ec5633044b2daaa24f941dcc4339"
const API_URL = "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20"
const {width, height} = Dimensions.get('screen')

const fetchImagesUrl = async () => {
  const response = await Axios.get(API_URL, {
    headers: {
      'Authorization': API_KEY
    }
  });
  const {photos} = response.data
  // console.log(photos)
  return photos
};


const TestScreen = () => {

  const [screenLoader, setScreenLoader] = useState(true);
  const [image, setImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef();
  const thumbnailRef = useRef();

  const scrollActiveIndex = (index) => {
    setActiveIndex(index)
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true
    })
  }

  // console.log('TOPREF', topRef)

  useEffect(() => {
    const imageFetched = async () => {
      const images = await fetchImagesUrl();
      setScreenLoader(false)
      setImage(images);
    }
    imageFetched();
  }, [])

  // console.log(image);

  if(screenLoader == true){
    return(
      <Text>Loading...</Text>
    )
  }

  const itemView = ({item}) => {
    // console.log('ITEM:',item)
    return(
       <View style={{width, height}}>
         <Image 
           source={{uri: item.src.portrait}}
           style={StyleSheet.absoluteFillObject}
          />
       </View>
    )
  }

  const thumbnailView = ({item, index}) => {
    return(
      <View style={{marginHorizontal: 8}}>
        <Image 
          source={{uri: item.src.portrait}}
          style={{height: 80, width: 80, borderRadius: 5, borderWidth: 2, borderColor: activeIndex === index ? 'white' : 'transparent'}}
        />
      </View>
    )
  }

  return(
    <View style={{flex: 1, backgroundColor: 'white'}} >
      <FlatList
        ref={topRef}
        horizontal
        showsHorizontalScrollIndicator={false} 
        pagingEnabled
        onMomentumScrollEnd={x => {
          scrollActiveIndex(Math.floor(x.nativeEvent.contentOffset.x / width))
        }} 
        data={image}
        keyExtractor={item => item.id.toString()}
        renderItem={itemView}
      />

      <FlatList
       ref={thumbnailRef} 
       style={{position: 'absolute', bottom: '10%'}}
       horizontal
       showsHorizontalScrollIndicator={false} 
       data={image}
       keyExtractor={item => item.id.toString()}
       renderItem={thumbnailView}
      />
    
    </View>
  )
}


export default TestScreen;