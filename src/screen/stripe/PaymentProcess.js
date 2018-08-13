import React, { PureComponent } from "react";
import { View, Text, Button } from "react-native";
import stripe from "../../lib/stripe";

export default class PaymentProcess extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tokenId: "",
      processing: true
    };
  }

  componentWillMount() {
    const token = this.props.navigation.getParam("data");
    const object = {
      amount: 2500,
      currency: "usd",
      source: token.id
    };
    stripe
      .chargeCard(object)
      .then(data => {
        this.setState({ processing: false });
      })
      .then(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.Container}>
        <Text style={styles.Text}>
          {this.state.processing ? "Processing.." : "Payment Complete"}
        </Text>
        {!this.state.processing && (
          <Button
            title="Done"
            onPress={() => this.props.navigation.navigate("Main")}
          />
        )}
      </View>
    );
  }
}

const styles = {
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  Text: {
    fontSize: 25,
    fontWeight: "bold"
  }
};
