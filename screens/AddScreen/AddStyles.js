import { StyleSheet } from "react-native";
import {
  black,
  disabledButton,
  primaryButton,
  primaryText,
  secondaryButton,
  secondaryText,
  white,
} from "../../resources/colors";

export const AddScreenStyles = StyleSheet.create({
  labelText: {
    fontSize: 18,
  },

  //name, location, date, description
  NLDDGroup: {
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
  },

  //name, location, date, description
  NLDDInput: {
    height: 50,
    backgroundColor: white,
    borderRadius: 5,
    paddingLeft: 5,
    marginTop: 5,
    fontSize: 15,
  },

  //parking, length, level
  PLLGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  lengthInput: {
    width: 150,
    height: 50,
    backgroundColor: white,
    borderRadius: 5,
    paddingLeft: 5,
    marginTop: 5,
    fontSize: 15,
    backgroundColor: white,
  },

  picker: {
    width: 150,
    backgroundColor: white,
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },

  addButton: {
    backgroundColor: primaryButton,
    padding: 20,
    borderRadius: 5,
  },

  resetButton: {
    backgroundColor: secondaryButton,
    padding: 20,
    borderRadius: 5,
  },

  addTitle: { fontSize: 15, color: primaryText },

  resetTitle: { fontSize: 15, color: secondaryText },

  datePickerButton: {
    backgroundColor: disabledButton,
    padding: 18,
    color: black,
  },

  datePickerTitle: {
    fontSize: 18,
  },
});
