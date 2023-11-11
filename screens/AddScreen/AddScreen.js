import React, { useMemo, useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RadioGroup, { RadioButton } from "react-native-radio-buttons-group";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AddScreenStyles } from "./AddStyles";
import { strings } from "../../resources/strings";
import { white } from "../../resources/colors";
import Database from "../../database/Database";
import RadioButtonsGroup from "react-native-radio-buttons-group";

const AddScreen = ({ navigation }) => {
  // State variables to manage form input and UI state
  const [inputName, setInputName] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedParking, setSelectedParking] = useState("");
  const [inputLength, setInputLength] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  // State variables for managing date picker
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  // Radio button options for "Yes" or "No" selection
  const radioButtons = useMemo(
    () => [
      {
        id: "Yes", // acts as primary key, should be unique and non-empty string
        label: "Yes",
        color: white,
        labelStyle: { color: "white", fontSize: 18, fontWeight: "bold" },
      },
      {
        id: "No",
        label: "No",
        color: white,
        labelStyle: { color: "white", fontSize: 18, fontWeight: "bold" },
      },
    ],
    []
  );

  // Function to handle changes in the date picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  // Function to set the mode and show the date picker
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // Function to show the date picker
  const showDatepicker = () => {
    showMode("date");
  };

  // Function to reset add field
  const resetAllFields = () => {
    setInputName("");
    setInputLocation("");
    setDate(new Date());
    setSelectedParking("");
    setInputLength("");
    setSelectedLevel("");
    setInputDescription("");
  };

  // Function to add hike
  const handleAddNewHike = async () => {
    if (handleFormValidate()) {
      // Prepare the details message for confirmation
      const confirmationMessage = `
        Name: ${inputName}
        Location: ${inputLocation}
        Date: ${date.toDateString()}
        Parking: ${selectedParking}
        Length: ${inputLength}
        Level: ${selectedLevel}
        Description: ${inputDescription}
      `;

      // Display confirmation alert
      Alert.alert(
        strings.title_confirm,
        confirmationMessage,
        [
          {
            text: strings.button_cancel,
            style: "cancel",
          },
          {
            text: strings.button_add,
            onPress: async () => {
              try {
                await Database.insertHike(
                  inputName,
                  inputLocation,
                  date.toDateString(),
                  selectedParking,
                  inputLength,
                  selectedLevel,
                  inputDescription
                );

                Alert.alert(strings.title_success, strings.success_hike_added);
                resetAllFields();
                navigation.navigate("Details");
              } catch (error) {
                Alert.alert(error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(strings.title_error, strings.error_hike_details_incomplete);
    }
  };

  // Function to validate form
  const handleFormValidate = () => {
    const validateList = [
      inputName,
      inputLocation,
      selectedParking,
      inputLength,
      selectedLevel,
    ];

    for (let index = 0; index < validateList.length; index++) {
      if (validateList[index] === null || validateList[index] === "") {
        return false;
      }
    }
    return true;
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={AddScreenStyles.scrollView}
    >
      <View style={AddScreenStyles.form}>
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
            value={date.toDateString()}
            onChangeText={setDate}
            editable={false}
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              onChange={onChange}
              style={AddScreenStyles.datePickerModal}
            />
          )}
        </View>

        <View style={AddScreenStyles.PLLGroup}>
          <Text style={AddScreenStyles.labelText}>{strings.field_parking}</Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedParking}
            selectedId={selectedParking}
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

        <TouchableOpacity
          style={AddScreenStyles.addButton}
          onPress={handleAddNewHike}
        >
          <Text style={AddScreenStyles.addTitle}>{strings.button_add}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddScreen;
