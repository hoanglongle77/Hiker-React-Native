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
import { strings } from "../../resources/strings";
import { InfoScreenStyles } from "./InfoStyles";
import { Alert } from "react-native";

const InfoScreen = ({ navigation }) => {
  // Image object with a URI pointing to a background image
  const image = {
    uri: "https://img.freepik.com/premium-vector/hiking-mountain-background_608812-428.jpg",
  };

  // State variable to manage a list of hikes
  const [hikes, setHikes] = useState([]);

  // A variable indicating whether the component is currently focused or not
  const isFocused = useIsFocused();

  // State variable to store the ID of an item that has been long-pressed
  const [longPressedItemId, setLongPressedItemId] = useState(null);

  // Initialize button to delete all hikes on to the header
  React.useEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: { marginRight: 15 },
      headerLeftContainerStyle: { marginLeft: 15 },
      headerRight: () => (
        <TouchableOpacity
          onPress={handleDeleteAllHikes}
          style={InfoScreenStyles.btnDeleteAll}
        >
          <Text style={InfoScreenStyles.textDeleteAll}>Delete All</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Fetch data from database
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

  const handleDeleteAllHikes = async () => {
    await Database.deleteAll();
    const data = await Database.getAllHikes();
    Alert.alert(strings.title_success, strings.success_reset_database);
    setHikes(data);
  };

  // Function to delete hike
  const handleDeleteHike = async (id) => {
    await Database.deleteHike(id);
    const data = await Database.getAllHikes();
    Alert.alert(strings.title_success, strings.success_hike_deleted);
    setHikes(data);
  };

  // Function to render hike card
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
          <Text style={InfoScreenStyles.text}>Date: {item.date}</Text>
          <Text style={InfoScreenStyles.text}>
            Parking Area: {item.parking}
          </Text>
          <Text style={InfoScreenStyles.text}>Length: {item.length}</Text>
          <Text style={InfoScreenStyles.text}>Level: {item.difficulty}</Text>
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
