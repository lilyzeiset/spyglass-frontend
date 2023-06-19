import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// config file containing all translation strings

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "spyglass": "Spyglass",
        "name": "Name",
        "email": "Email",
        "password": "Password",
        "confirm-password": "Confirm password",
        "login": "Login",
        "register": "Register",

      }
    },
    de: {
      translation: {
        "spyglass": "Spyglass"
      }
    }
  },
  fallbackLng: "en"
});

export default i18n;