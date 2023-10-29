import { StyleSheet } from "react-native";
import {
  black,
  lightBackground,
  primaryText,
  secondaryColor,
  warningColor,
} from "../../resources/colors";
export const InfoScreenStyles = StyleSheet.create({
  listContainer: {
    height: "100%",
    backgroundColor: black,
  },
  hikeCard: {
    height: 230,
    margin: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: secondaryColor,
  },
  image: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoContainter: {
    height: "40%",
    width: "50%",
    padding: 5,
    margin: 5,
    backgroundColor: secondaryColor,
    borderRadius: 5,
  },

  text: {
    fontSize: 9,
    color: primaryText,
    textAlign: "left",
    fontWeight: "bold",
  },

  buttonContainer: {
    margin: 5,
  },
  buttonDelete: {
    marginTop: 5,
    padding: 15,
    backgroundColor: warningColor,
    borderRadius: 5,
  },

  buttonEdit: {
    padding: 15,
    backgroundColor: lightBackground,
    borderRadius: 5,
  },

  edText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  textDeleteAll: { fontSize: 15, fontWeight: "bold" },
  btnDeleteAll: {
    backgroundColor: warningColor,
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
});
