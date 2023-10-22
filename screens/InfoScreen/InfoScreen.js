import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, FlatList, TouchableOpacity } from "react-native"; // Added StyleSheet for styling
import Database from "../../database/Database";

const InfoScreen = () => {
  const [hikes, setHikes] = useState([]);
  const isFocused = useIsFocused();
  const [longPressedItemId, setLongPressedItemId] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchHikes = async () => {
      try {
        const hikeList = await Database.getAllHikes();
        setHikes(hikeList);
      } catch (error) {
        console.error("Error fetching hikes:", error);
      }
    };

    fetchHikes();
  }, [isFocused]);

  // Method to delete hike
  const handleDeleteHike = async (id) => {
    await Database.deleteHike(id);
    const data = await Database.getAllHikes();
    setHikes(data);
  };

  const renderHikeCard = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => setLongPressedItemId(item.id)}
      onPress={() => setLongPressedItemId(null)} // Clear long press state on regular press
    >
      <View>
        <Text>Name: {item.name}</Text>
        <Text>Location: {item.location}</Text>
        <Text>Date: {item.date}</Text>
        <Text>Parking: {item.parking}</Text>
        <Text>Length: {item.length}</Text>
        <Text>Difficulty: {item.difficulty}</Text>
        <Text>Description: {item.description}</Text>
        {longPressedItemId === item.id && (
          <TouchableOpacity onPress={() => handleDeleteHike(item.id)}>
            <Text>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={hikes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHikeCard}
      />
    </View>
  );
};

export default InfoScreen;
