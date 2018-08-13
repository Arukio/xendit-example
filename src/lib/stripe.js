import axios from "axios";
import qs from "qs";

const PK_KEY = "pk_test_l68yAJLwiNtSEuWtCY5HfVgO";
const SK_KEY = "sk_test_oU15SOAxTAiCKtKIXLGmgbay";

const stripeWrapper = {};

stripeWrapper.createToken = cardObject => {
  return new Promise((resolve, reject) => {
    const data = qs.stringify({ card: cardObject });
    axios
      .post("https://api.stripe.com/v1/tokens", data, {
        headers: {
          Authorization: "bearer " + PK_KEY,
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

stripeWrapper.chargeCard = chargeData => {
  return new Promise((resolve, reject) => {
    const data = qs.stringify(chargeData);
    axios
      .post("https://api.stripe.com/v1/charges", data, {
        headers: {
          Authorization: "bearer " + SK_KEY,
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export default stripeWrapper;
