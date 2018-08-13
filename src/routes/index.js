import { createStackNavigator } from "react-navigation";
import Main from "../screen/MainScreen";
import Payment from "../screen/Payment";
import PaymentProcess from "../screen/PaymentProcess";
import StripePayment from "../screen/stripe/Payment";

const root = createStackNavigator(
  {
    Main,
    Payment,
    PaymentProcess,
    StripePayment
  },
  {
    initialRouteName: "Main",
    headerMode: "none"
  }
);

export default root;
