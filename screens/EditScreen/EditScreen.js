import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { EditScreenStyles } from "./EditStyles";
import { strings } from "../../resources/strings";
import { white } from "../../resources/colors";
import Database from "../../database/Database";

const EditScreen = ({ route, navigation }) => {
  const { itemToEdit } = route.params;
  const [editedData, setEditedData] = useState(itemToEdit);
  const [selectedParking, setSelectedParking] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const radioButtons = [
    {
      id: "Yes",
      label: "Yes",
      color: white,
      labelStyle: { color: "white", fontSize: 18, fontWeight: "bold" },
      selected: true,
    },
    {
      id: "No",
      label: "No",
      color: white,
      labelStyle: { color: "white", fontSize: 18, fontWeight: "bold" },
      selected: true,
    },
  ];

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  //Function to handle save
  const handleButtonSave = async () => {
    if (handleFormValidate()) {
      await Database.updateHike(
        editedData.id,
        editedData.name,
        editedData.location,
        editedData.date,
        editedData.parking,
        editedData.length,
        editedData.difficulty,
        editedData.description
      )
        .then(() => {
          Alert.alert(strings.title_success, strings.success_hike_saved);
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert(strings.error_hike_updated);
        });
    } else {
      Alert.alert(strings.title_error, strings.error_hike_details_incomplete);
    }
  };

  // Function to validate form
  const handleFormValidate = () => {
    const validateList = [
      editedData.name,
      editedData.location,
      editedData.parking,
      editedData.length,
      editedData.difficulty,
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
      style={EditScreenStyles.scrollView}
    >
      <View style={EditScreenStyles.form}>
        <View style={EditScreenStyles.NLDDGroup}>
          <Text style={EditScreenStyles.labelText}>{strings.field_name}</Text>
          <TextInput
            style={EditScreenStyles.NLDDInput}
            value={editedData.name}
            onChangeText={(text) =>
              setEditedData({ ...editedData, name: text })
            }
          />
        </View>

        <View style={EditScreenStyles.NLDDGroup}>
          <Text style={EditScreenStyles.labelText}>
            {strings.field_location}
          </Text>
          <TextInput
            style={EditScreenStyles.NLDDInput}
            value={editedData.location}
            onChangeText={(text) =>
              setEditedData({ ...editedData, location: text })
            }
          />
        </View>

        <View style={EditScreenStyles.NLDDGroup}>
          <TouchableOpacity
            style={EditScreenStyles.datePickerButton}
            onPress={showDatepicker}
          >
            <Text style={EditScreenStyles.datePickerTitle}>
              {strings.field_date}
            </Text>
          </TouchableOpacity>
          <TextInput
            style={EditScreenStyles.NLDDInput}
            value={editedData.date}
            editable={false}
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(editedData.date)}
              mode={mode}
              onChange={(_, selectedDate) => {
                if (selectedDate) {
                  setEditedData({
                    ...editedData,
                    date: selectedDate.toDateString(),
                  });
                  setShow(false);
                }
              }}
              style={EditScreenStyles.datePickerModal}
            />
          )}
        </View>

        <View style={EditScreenStyles.PLLGroup}>
          <Text style={EditScreenStyles.labelText}>
            {strings.field_parking}
          </Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={(selectedParking) =>
              setEditedData({ ...editedData, parking: selectedParking })
            }
            selectedId={editedData.parking}
            layout="row"
          />
        </View>

        <View style={EditScreenStyles.PLLGroup}>
          <Text style={EditScreenStyles.labelText}>{strings.field_length}</Text>
          <TextInput
            style={EditScreenStyles.lengthInput}
            placeholder={strings.length_hint}
            keyboardType="numeric"
            value={editedData.length.toString()} // Ensure it's a string
            onChangeText={(text) =>
              setEditedData({ ...editedData, length: parseFloat(text) || 0 })
            }
          />
        </View>

        <View style={EditScreenStyles.PLLGroup}>
          <Text style={EditScreenStyles.labelText}>
            {strings.field_difficulty}
          </Text>
          <Picker
            style={EditScreenStyles.picker}
            selectedValue={editedData.difficulty}
            onValueChange={(value) =>
              setEditedData({ ...editedData, difficulty: value })
            }
          >
            <Picker.Item label="Easy" value="Easy" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Hard" value="Hard" />
          </Picker>
        </View>

        <View style={EditScreenStyles.NLDDGroup}>
          <Text style={EditScreenStyles.labelText}>
            {strings.field_description}
          </Text>
          <TextInput
            style={EditScreenStyles.NLDDInput}
            placeholder={strings.description_hint}
            multiline={true}
            numberOfLines={8}
            value={editedData.description}
            onChangeText={(text) =>
              setEditedData({ ...editedData, description: text })
            }
          />
        </View>

        <TouchableOpacity
          style={EditScreenStyles.addButton}
          onPress={handleButtonSave}
        >
          <Text style={EditScreenStyles.addTitle}>{strings.button_save}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditScreen;
