import React, { useMemo, useState } from "react";

import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AddScreenStyles } from "./AddStyles";
import { strings } from "../../resources/strings";

import Database from "../../database/Database";

const AddScreen = ({ navigation }) => {
  const [inputName, setInputName] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [selectedPark, setSelectedPark] = useState("");
  const [inputLength, setInputLength] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Yes",
        value: "Yes",
      },
      {
        id: "2",
        label: "No",
        value: "No",
      },
    ],
    []
  );

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  //Method to reset add field
  // const resetAllFields = () => {
  //   setInputName(""); // Reset the input value to an empty string
  //   setInputLocation(""); // Reset other input fields as well
  //   setDate(new Date(1598051730000));
  //   setSelectedPark("");
  //   setInputLength("");
  //   setSelectedLevel("");
  //   setInputDescription("");
  // };
  //Method to add hike
  const handleAddNewHike = async () => {
    await Database.insertHike(
      inputName.toString(),
      inputLocation.toString(),
      date.toString(),
      selectedPark.toString(),
      inputLength.toString(),
      selectedLevel.toString(),
      inputDescription.toString()
    )
      .then(() => {
        console.log("Hike added successfully");
        navigation.navigate("Details"); // Navigate back to the previous screen
      })
      .catch((error) => {
        console.error("Error adding hike:", error);
      });
  };

  // const handleTest = () => {
  //   console.log(
  //     inputName,
  //     inputLocation,
  //     date,
  //     selectedPark,
  //     inputLength,
  //     selectedLevel,
  //     inputDescription
  //   );
  // };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <View style={{ flex: 1, padding: 15 }}>
        <View style={AddScreenStyles.NLDDGroup}>
          <Text style={AddScreenStyles.labelText}>{strings.field_name}</Text>
          <TextInput
            style={AddScreenStyles.NLDDInput}
            placeholder={strings.name_hint}
            onChangeText={setInputName}
            value={inputName}
          />
        </View>

        <View style={AddScreenStyles.NLDDGroup}>
          <Text style={AddScreenStyles.labelText}>
            {strings.field_location}
          </Text>
          <TextInput
            style={AddScreenStyles.NLDDInput}
            placeholder={strings.location_hint}
            onChangeText={setInputLocation}
            value={inputLocation}
          />
        </View>

        <View style={AddScreenStyles.NLDDGroup}>
          <TouchableOpacity
            style={AddScreenStyles.datePickerButton}
            onPress={showDatepicker}
          >
            <Text style={AddScreenStyles.datePickerTitle}>
              {strings.field_date}
            </Text>
          </TouchableOpacity>
          <TextInput
            style={AddScreenStyles.NLDDInput}
            value={date.toLocaleDateString()}
            onChangeText={setDate}
            editable={false}
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              onChange={onChange}
            />
          )}
        </View>

        <View style={AddScreenStyles.PLLGroup}>
          <Text style={AddScreenStyles.labelText}>{strings.field_parking}</Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedPark}
            selectedId={selectedPark}
            layout="row"
          />
        </View>

        <View style={AddScreenStyles.PLLGroup}>
          <Text style={AddScreenStyles.labelText}>{strings.field_length}</Text>
          <TextInput
            style={AddScreenStyles.lengthInput}
            placeholder={strings.length_hint}
            keyboardType="numeric"
            onChangeText={setInputLength}
            value={inputLength}
          />
        </View>

        <View style={AddScreenStyles.PLLGroup}>
          <Text style={AddScreenStyles.labelText}>
            {strings.field_difficulty}
          </Text>
          <Picker
            style={AddScreenStyles.picker}
            selectedValue={selectedLevel}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLevel(itemValue)
            }
          >
            <Picker.Item label="Easy" value="Easy" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Hard" value="Hard" />
          </Picker>
        </View>

        <View style={AddScreenStyles.NLDDGroup}>
          <Text style={AddScreenStyles.labelText}>
            {strings.field_description}
          </Text>
          <TextInput
            style={AddScreenStyles.NLDDInput}
            placeholder={strings.description_hint}
            multiline={true}
            numberOfLines={8}
            onChangeText={setInputDescription}
            value={inputDescription}
          />
        </View>

        <View style={AddScreenStyles.buttonGroup}>
          <TouchableOpacity
            style={AddScreenStyles.addButton}
            onPress={handleAddNewHike}
          >
            <Text style={AddScreenStyles.addTitle}>{strings.button_add}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={AddScreenStyles.resetButton}>
            <Text style={AddScreenStyles.resetTitle}>
              {strings.button_reset}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddScreen;
