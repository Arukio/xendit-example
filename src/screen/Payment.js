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
import xendit from "xendit-js-node";

const API_KEY =
  "xnd_public_development_OIGJfL4igLCvnMJpduJKTzTGYtKi8Nh7mXXn+Rxg/mzS/7eiBQFzgQ==";

const patchPostMessageFunction = function() {
  var originalPostMessage = window.postMessage;
  var patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace(
      "hasOwnProperty",
      "postMessage"
    );
  };

  window.postMessage = patchedPostMessage;
};

const injectScript = "(" + String(patchPostMessageFunction) + ")();";

export default class Payment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: "4000000000000002",
      month: "10",
      year: "2020",
      cvn: "123",
      amount: "250000",
      isLoading: false,
      webViewUrl: "",
      showWebView: false
    };

    this.processPayment = this.processPayment.bind(this);
    this.webView = null;
  }

  processPayment() {
    this.setState({ isLoading: true });
    const { cardNumber, month, year, amount, cvn } = this.state;
    const data = {
      amount: amount,
      card_number: cardNumber,
      card_exp_month: month,
      card_exp_year: year,
      card_cvn: cvn
    };

    xendit.setPublishableKey(API_KEY);

    xendit.card.createToken(data, this.xenditResponseHandler.bind(this));
  }

  xenditResponseHandler(err, data) {
    console.log(err);
    if (err) {
      return alert("error");
    }
    if (data.status === "IN_REVIEW") {
      this.setState({
        webViewUrl: data.payer_authentication_url,
        showWebView: true
      });
    }

    this.setState({ isLoading: false });
  }

  render3dSecure() {
    return (
      <View style={styles.WebviewContainer}>
        <View style={styles.WebViewHeader}>
          <Button
            title="close"
            onPress={() => this.setState({ showWebView: false })}
          />
        </View>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: this.state.webViewUrl }}
          injectedJavaScript={injectScript}
          onMessage={event => this.onMessage(event)}
          ref={webView => (this.webView = webView)}
        />
      </View>
    );
  }

  onMessage(event) {
    this.setState({ showWebView: false });
    const data = event.nativeEvent.data;
    this.props.navigation.navigate("PaymentProcess", {
      data: data
    });
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
            value={this.state.cardNumber}
          />
        </View>
        <View style={styles.CardInfoContainer}>
          <TextInput
            placeholder="month"
            style={styles.CardInfo}
            value={this.state.month}
            onChangeText={month => this.setState({ month })}
          />
          <TextInput
            placeholder="year"
            style={styles.CardInfo}
            value={this.state.year}
            onChangeText={year => this.setState({ year })}
          />
          <TextInput
            placeholder="cvn"
            style={styles.CardInfo}
            value={this.state.cvn}
            onChangeText={cvn => this.setState({ cvn })}
          />
        </View>
        <TouchableOpacity
          style={styles.Button}
          onPress={this.processPayment}
          disabled={this.state.isLoading}
        >
          <Text style={styles.ButtonText}>
            {this.state.isLoading ? "PROCESSING" : "PAY NOW"}
          </Text>
        </TouchableOpacity>

        <Modal visible={this.state.showWebView}>{this.render3dSecure()}</Modal>
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
