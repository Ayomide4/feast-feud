import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebaseConfig";

export async function testAuth() {
  signInAnonymously(auth)
    .then(() => console.log("Signed in anonymously"))
    .catch((error) => console.error(error));
}
