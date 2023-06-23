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
        "logout": "Logout",
        "register": "Register",
        "language": "Language",

        "cancel": "Cancel",
        "create-new-goal": "Create new goal",
        "create-goal": "Create Goal",
        "goal-name": "Name",
        "goal-description": "Description",
        "goal-target-amount": "Target amount",
        "goal-target-date": "Target date",

        "frequency": "Frequency",
        "day": "day",
        "week": "week",
        "month": "month",

        "deposit": "Deposit",
        "every": "every",
        "reach-goal-by": "to reach your goal by",
        "make-deposit": "Make a deposit",

        "deposit-amount": "Deposit amount"

      }
    },
    de: {
      translation: {
        "spyglass": "de Spyglass"
      }
    }
  },
  fallbackLng: "en"
});

export default i18n;