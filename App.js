
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

const Stack = createNativeStackNavigator();


function HomeScreen({ navigation, route }) {
  let exerciseList = route.params.exerciseList
  let goToExercise = useCallback(({ name, key, type}) => {
    if (type == "repetition") {
      navigation.navigate("RepetitionExercise", { name: name, exerciseKey: key})
    }
    else if (type == "duration") {
      navigation.navigate("DurationExercise", {name: name, exerciseKey: key})
    }
  })
  
  return (
    <View style={styles.container}>
      <FlatList data={exerciseList} renderItem={({ item }) => 
      <Button onPress={() => goToExercise(item)} title={item.name}></Button>
      } />
    </View>
  );
}

function RepetitionExerciseScreen({ navigation, route }) {
  let [count, setCount] =  useState(0)
  let { exerciseList, exerciseKey } = route.params
  let goToExercise = useCallback(({ name, key, type }) => {
    if (type == "repetition") {
      navigation.push("RepetitionExercise", { name: name, exerciseKey: key})
    }
    else if (type == "duration") {
      navigation.push("DurationExercise", {name: name, exerciseKey: key})
    }
  })
  let currentExercise = exerciseList.find(ex => ex.key === exerciseKey)
  let suggestedExercise = exerciseList[exerciseList.indexOf(currentExercise)+1]
  return (
    <View style={styles.container}>
      <Text>{currentExercise.name}:</Text><br />
      <Text>{count}</Text>
      <Button onPress={() => setCount(ct => ct + 1)} title="+1 Rep"></Button>
      <Button onPress={() => setCount(0)} title="Reset"></Button>
      <Button onPress={() => goToExercise(suggestedExercise)} title={"Go to " + suggestedExercise.name}></Button>
      <Button onPress={() => navigation.navigate("Home")} title="Return Home"></Button>
      <StatusBar style='auto' />
    </View>
  );
}

function DurationExerciseScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>Duration Exercise Screen</Text>
      <Button onPress={() => navigation.navigate("Home")} title="Return Home"></Button>
      <StatusBar style='auto' />
    </View>
  );
}

export default function App() {
  let exerciseList = [
    {
      name: "Push-Ups",
      key: "1",
      type: "repetition"
    },
    {
      name: "Sit-Ups",
      key: "2",
      type: "repetition"
    },
    {
      name: "Squats",
      key: "3",
      type: "repetition"
    },
    {
      name: "Run",
      key: "4",
      type: "duration"
    }
  ]
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{ exerciseList:exerciseList }}/>
        <Stack.Screen name="RepetitionExercise" component={RepetitionExerciseScreen} initialParams={{ exerciseList:exerciseList }}/>
        <Stack.Screen name="DurationExercise" component={DurationExerciseScreen} initialParams={{ exerciseList:exerciseList }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
