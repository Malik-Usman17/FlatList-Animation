import React, {forwardRef, useRef, useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import Indicator from './Indicator';


const Tab = forwardRef(({ item }, ref) => {
    //console.log(data.length)
    return(
      <View ref={ref}>
        <Text style={{color: 'white', fontSize: 84/5, fontWeight: '800', textTransform: 'uppercase'}}>{item.title}</Text>
      </View>
    );
  });


const Tabs = ({ data, scrollX }) => {

    const [measures, setMeasures] = useState([]);
    const containerRef = useRef();
    const {width, height} = Dimensions.get('screen')

    useEffect(() => {
        let m = [];
        data.forEach((item) => {
            item.imageRef.current.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    m.push({
                        x, y, height, width
                    });
                    // console.log(x, y, width, height)

                    if(m.length === data.length){
                        setMeasures(m);
                    }
                }
            );
        });
    }, []);

    console.log(measures)

    return (
        <View style={{position: 'absolute', top: 100, width}}>
            <View
              ref={containerRef} 
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}
            >
                {
                    data.map((item) => {
                        return (
                            <Tab key={item.key} item={item} ref={item.imageRef}/>
                        )
                    })
                }
            </View>
            {
                measures.length > 0 &&
                  <Indicator measures={measures} scrollX={scrollX}/>
            }
        </View>
    );
};

export default Tabs;