import React, { PureComponent } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Button,
  WebView
} from "react-native";

export default class Payment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: "",
      month: "",
      year: "",
      cvn: "",
      amount: "250000",
      isLoading: false,
      webViewUrl: "",
      showWebView: false
    };

    this.processPayment = this.processPayment.bind(this);
  }

  processPayment() {
    this.setState({ isLoading: true });
    const { cardNumber, month, year, amount, cvn } = this.state;
    const data = {
      amount: "250000",
      card_number: "4000000000000002",
      card_exp_month: "10",
      card_exp_year: "2018",
      card_cvn: "123"
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.Container}>
        <Text style={styles.Text}>Total : Rp.250,000</Text>
        <View>
          <TextInput
            placeholder="Card Number"
            style={styles.CardInput}
            onChangeText={cardNumber => this.setState({ cardNumber })}
          />
        </View>
        <View style={styles.CardInfoContainer}>
          <TextInput
            placeholder="month"
            style={styles.CardInfo}
            onChangeText={month => this.setState({ month })}
          />
          <TextInput
            placeholder="year"
            style={styles.CardInfo}
            onChangeText={year => this.setState({ year })}
          />
          <TextInput
            placeholder="cvn"
            style={styles.CardInfo}
            onChangeText={cvn => this.setState({ cvn })}
          />
        </View>
        <TouchableOpacity
          style={styles.Button}
          onPress={this.processPayment}
          disabled={this.state.isLoading}
        >
          <Text style={styles.ButtonText}>
            {this.state.isLoading ? "PROCESSING" : "PAY WITH STRIPE NOW"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  Text: {
    fontSize: 20
  },
  CardInput: {
    marginTop: 10,
    width: 350,
    borderColor: "grey",
    borderWidth: 1,
    height: 40,
    fontSize: 17,
    paddingHorizontal: 5
  },
  CardInfoContainer: {
    flexDirection: "row"
  },
  CardInfo: {
    marginTop: 10,
    width: 100,
    borderColor: "grey",
    borderWidth: 1,
    height: 40,
    fontSize: 17,
    marginHorizontal: 12,
    paddingHorizontal: 5
  },
  Button: {
    backgroundColor: "#2196F3",
    marginVertical: 12,
    height: 50,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  ButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "800"
  },
  WebviewContainer: {
    flex: 1
  },
  WebViewHeader: {
    marginTop: 20,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "flex-end"
  }
});
