import axios from "axios";

const PK_KEY = "pk_test_l68yAJLwiNtSEuWtCY5HfVgO";
const SK_KEY = "sk_test_oU15SOAxTAiCKtKIXLGmgbay";

const stripeWrapper = {};

stripeWrapper.createToken = cardObject => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://api.stripe.com/v1/tokens",
        {
          card: cardObject
        },
        {
          auth: {
            username: PK_KEY
          }
        }
      )
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export default stripeWrapper;
