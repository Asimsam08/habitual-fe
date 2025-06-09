import { Account, Client, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID!;
export const HABITS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_HABITS_COLLECTION_ID!;
export const COMPLETIONS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_HABITS_COMPLETIONS_ID!;

export interface RealtimeResponse {
  events: string[];
  payload: any;
}

// type EnvConfig = {
//   appwriteEndpoint: string;
//   appwriteProjectId: string;
//   appwritePlatform: string;
//   dbId: string;
//   habitsCollectionId: string;
//   habitsCompletionsId: string;
// };

// import { Account, Client, Databases } from "react-native-appwrite";

// import Constants from 'expo-constants';

// // Safely access extra with fallback
// const extra = (Constants.expoConfig?.extra || {}) as EnvConfig;

// export const {
//   appwriteEndpoint,
//   appwriteProjectId,
//   appwritePlatform,
//   dbId,
//   habitsCollectionId,
//   habitsCompletionsId,
// } = extra;
// export const client = new Client()
//   .setEndpoint(appwriteEndpoint)
//   .setProject(appwriteProjectId)
//   .setPlatform(appwritePlatform);

// export const account = new Account(client);
// export const databases = new Databases(client);

// export const DATABASE_ID = dbId;
// export const HABITS_COLLECTION_ID =
//   habitsCollectionId;
// export const COMPLETIONS_COLLECTION_ID =
//   habitsCompletionsId;

// export interface RealtimeResponse {
//   events: string[];
//   payload: any;
// }



