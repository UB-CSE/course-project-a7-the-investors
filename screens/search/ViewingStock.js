import * as React from "react";
import { View } from "react-native";
import { Component } from "react";
import StockBoard from "./StockBoard";
import AppHeader from "../../navigation/AppHeader";

export default class ViewingStock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <AppHeader />
        <View style={styles.content}></View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  cashContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  cashHeader: {
    flex: 1,
    flexDirection: "row",
  },
};
