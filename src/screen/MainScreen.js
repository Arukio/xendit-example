import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default (MainScreen = props => (
  <View style={styles.Container}>
    <View>
      <Text style={styles.Text}>You have to pay Rp.250000</Text>
      <Button
        title="Pay now"
        style={styles.Button}
        onPress={() => props.navigation.navigate("Payment")}
      />
    </View>
  </View>
));

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  Button: {
    borderWidth: 1,
    borderColor: "black"
  },
  Text: {
    fontSize: 20
  }
});
