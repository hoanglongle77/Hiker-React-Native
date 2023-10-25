import { StyleSheet } from "react-native";
import {
  black,
  white,
  primaryText,
  secondaryButton,
  warningColor,
} from "../../resources/colors";

export const EditScreenStyles = StyleSheet.create({
  scrollView: {
    backgroundColor: black,
  },

  form: {
    flex: 1,
    padding: 20,
    height: "100%",
  },

  labelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: white,
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
    marginTop: 10,
    fontSize: 15,
    color: black,
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

  radioButton: {
    color: white,
  },

  addButton: {
    marginTop: 10,
    width: "100%",
    backgroundColor: secondaryButton,
    padding: 20,
    borderRadius: 5,
  },

  addTitle: {
    fontSize: 18,
    color: primaryText,
    textAlign: "center",
    fontWeight: "bold",
  },

  datePickerButton: {
    marginTop: 5,
    backgroundColor: warningColor,
    padding: 18,
    borderRadius: 5,
  },

  datePickerModal: {
    width: 100,
    marginTop: 5,
    backgroundColor: warningColor,
  },

  datePickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
