import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// config file containing all translation strings

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "spyglass": "Spyglass",
        "login-google": "Log in with Google",
        "logout": "Logout",
        "language": "Language",
        "back": "Back",
        "cancel": "Cancel",
        "create-new-goal": "Create new goal",
        "create-goal": "Create Goal",
        "goal-name": "Name",
        "goal-description": "Description",
        "goal-target-amount": "Target amount",
        "goal-target-date": "Target date",
        "due-date": "Due date",
        "frequency": "Frequency",
        "day": "day",
        "week": "week",
        "month": "month",
        "deposit": "Deposit",
        "every": "every",
        "reach-goal-by": "to reach your goal by",
        "make-deposit": "Make a deposit",
        "upload-image": "Upload image",
        "deposit-amount": "Deposit amount",
        "goal-completed": "Congratulations! You completed your goal!"
      }
    },
    de: {
      translation: {
        "spyglass": "Spyglass",
        "login-google": "Mit Google anmelden",
        "logout": "Abmelden",
        "language": "Sprache",
        "back": "Zurück",
        "cancel": "Abbrechen",
        "create-new-goal": "Neues Ziel erstellen",
        "create-goal": "Ziel erstellen",
        "goal-name": "Name",
        "goal-description": "Beschreibung",
        "goal-target-amount": "Zielbetrag",
        "goal-target-date": "Zieldatum",
        "due-date": "Fälligkeitsdatum",
        "frequency": "Häufigkeit",
        "day": "Tag",
        "week": "Woche",
        "month": "Monat",
        "deposit": "Einzahlung",
        "every": "jeden",
        "reach-goal-by": "um Ihr Ziel zu erreichen",
        "make-deposit": "Einzahlung tätigen",
        "upload-image": "Bild hochladen",
        "deposit-amount": "Einzahlungsbetrag",
        "goal-completed": "Herzlichen Glückwunsch! Sie haben Ihr Ziel erreicht!"
        }
    }
  },
  fallbackLng: "en"
});

export default i18n;