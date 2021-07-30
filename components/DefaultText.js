import React from "react";
import { Text, View, StyleSheet } from "react-native";

const DefaultText = (props) => (
  <View>
    <Text style={styles.text}>{props.children}</Text>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});

export default DefaultText;
