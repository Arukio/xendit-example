import { createStackNavigator } from "react-navigation";
import Main from "../screen/MainScreen";
import Payment from "../screen/Payment";
import PaymentProcess from "../screen/PaymentProcess";

const root = createStackNavigator(
  {
    Main,
    Payment,
    PaymentProcess
  },
  {
    initialRouteName: "Main",
    headerMode: "none"
  }
);

export default root;
