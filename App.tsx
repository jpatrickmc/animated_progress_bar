/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Animated} from 'react-native';

const Progress = ({step, steps, height}) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, reactive]);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [reactive, step, steps, width]);

  return (
    <>
      <Text style={{marginBottom: 4}}>
        {step}/{steps}
      </Text>
      <View
        onLayout={event => {
          const width = event.nativeEvent.layout.width;
          setWidth(width);
        }}
        style={[
          styles.outerProgressBar,
          {height: height, borderRadius: height},
        ]}>
        <Animated.View
          style={[
            styles.innerProgressBar,
            {
              height: height,
              borderRadius: height,
              transform: [{translateX: animatedValue}],
            },
          ]}
        />
      </View>
    </>
  );
};

function App(): JSX.Element {
  // const countInterval = useRef(null);
  // const [count, setCount] = useState(0);

  // const loaderValue = useRef(new Animated.Value(0)).current;

  // const load = count => {
  //   Animated.timing(loaderValue, {
  //     toValue: count, //final value
  //     duration: 500, //update value in 500 milliseconds
  //     useNativeDriver: false,
  //   }).start();
  // };

  // const width = loaderValue.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: ['0%', '100%'],
  //   extrapolate: 'clamp',
  // });

  // useEffect(() => {
  //   countInterval.current = setInterval(() => setCount(old => old + 5), 1000);
  //   return () => {
  //     clearInterval(countInterval);
  //   };
  // }, []);

  // useEffect(() => {
  //   load(count);
  //   if (count >= 100) {
  //     setCount(100);
  //     clearInterval(countInterval);
  //   }
  // }, [count]);

  const steps = 40;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % (steps + 1));
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [index]);
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Loading...</Text>
      <View style={styles.progressBar}>
        <Animated.View style={{backgroundColor: '#8BED4F', width: width}} />
      </View> */}
      <Progress step={index} steps={steps} height={4} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // progressBar: {
  //   flexDirection: 'row',
  //   height: 20,
  //   width: '80%',
  //   backgroundColor: 'white',
  //   borderColor: '#000',
  //   borderWidth: 2,
  //   borderRadius: 5,
  // },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    margin: 20,
  },
  outerProgressBar: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  innerProgressBar: {
    width: '100%',
    backgroundColor: 'green',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default App;
