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
    height: 150,
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
    height: "50%",
    width: "50%",
    padding: 5,
    margin: 5,
    backgroundColor: secondaryColor,
    borderRadius: 5,
  },

  text: {
    fontSize: 11,
    color: primaryText,
    textAlign: "left",
    fontWeight: "bold",
  },

  buttonContainer: {
    padding: 5,
    margin: 5,
  },
  buttonDelete: {
    marginTop: 5,
    padding: 5,
    backgroundColor: warningColor,
    borderRadius: 5,
  },

  buttonEdit: { padding: 5, backgroundColor: lightBackground, borderRadius: 5 },

  edText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
