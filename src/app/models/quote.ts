import firebase from "firebase/compat/app";

export interface Quote {
  uid: string;
  userUid: string;
  content: string;
  author: string;
  timestamp:  firebase.firestore.Timestamp
}

export interface SuggestedQuote {
  uid: string;
  content: string,
  author: string
}
