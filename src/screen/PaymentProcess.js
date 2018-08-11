import React, { PureComponent } from "react";
import { View, Text, Button } from "react-native";
import axios from "axios";

export default class PaymentProcess extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tokenId: "",
      processing: true
    };
  }

  componentWillMount() {
    const json = this.props.navigation.getParam("data");
    const data = JSON.parse(json);

    axios
      .post(
        "https://api.xendit.co/credit_card_charges",
        {
          token_id: data.id,
          external_id: Math.random()
            .toString(36)
            .substring(7),
          amount: 250000
        },
        {
          auth: {
            username:
              "xnd_development_NYqIfL4igLCvnMJpduJKTzTGYtKi8Nh7mXXn+Rxg/mzS/7eiBQFzjg=="
          }
        }
      )
      .then(res => {
        this.setState({ processing: false });
      })
      .catch(err => console.log(err));
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
