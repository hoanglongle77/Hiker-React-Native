import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native"; // Added StyleSheet for styling
import Database from "../../database/Database";
import { InfoScreenStyles } from "./InfoStyles";

const InfoScreen = ({ navigation }) => {
  const image = {
    uri: "https://img.freepik.com/premium-vector/hiking-mountain-background_608812-428.jpg",
  };
  const [hikes, setHikes] = useState([]);
  const isFocused = useIsFocused();
  const [longPressedItemId, setLongPressedItemId] = useState(null);

  // 1 - Fetch data
  useEffect(() => {
    const fetchHikes = async () => {
      try {
        const hikeList = await Database.getAllHikes();
        setHikes(hikeList);
      } catch (error) {
        Alert.alert("Error fetching hikes:", error);
      }
    };

    fetchHikes();
  }, [isFocused]);

  // 2 - Method to delete hike
  const handleDeleteHike = async (id) => {
    await Database.deleteHike(id);
    const data = await Database.getAllHikes();
    setHikes(data);
  };

  // 3 - Generate image from OpenAI

  const renderHikeCard = ({ item }) => (
    <TouchableOpacity
      style={InfoScreenStyles.hikeCard}
      onLongPress={() => setLongPressedItemId(item.id)}
      onPress={() => setLongPressedItemId(null)} // Clear long press state on regular press
    >
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={InfoScreenStyles.image}
      >
        <View style={InfoScreenStyles.infoContainter}>
          <Text style={InfoScreenStyles.text}>Trip: {item.name}</Text>
          <Text style={InfoScreenStyles.text}>Location: {item.location}</Text>
          <Text style={InfoScreenStyles.text}>Location: {item.date}</Text>
        </View>
        {longPressedItemId === item.id && (
          <View style={InfoScreenStyles.buttonContainer}>
            <TouchableOpacity
              style={InfoScreenStyles.buttonEdit}
              onPress={() => {
                // Navigate to the EditScreen and pass the selected item's data
                navigation.navigate("EditScreen", { itemToEdit: item });
              }}
            >
              <Text style={InfoScreenStyles.edText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={InfoScreenStyles.buttonDelete}
              onPress={() => handleDeleteHike(item.id)}
            >
              <Text style={InfoScreenStyles.edText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={InfoScreenStyles.listContainer}>
      <FlatList
        data={hikes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHikeCard}
      />
    </SafeAreaView>
  );
};

export default InfoScreen;
