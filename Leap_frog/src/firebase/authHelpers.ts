import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./client";

// Function to log in with email and password
interface AuthResponse {
  user: any; // Replace 'any' with the appropriate user type if known
}

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user }; // Contains user details
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Function to register a new user
export const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
