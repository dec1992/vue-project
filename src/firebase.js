import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD8ZaFt0w-uAMzdv8GTHDLewRIEpeI6A5I",
    authDomain: "vue-project-36c3a.firebaseapp.com",
    projectId: "vue-project-36c3a",
    storageBucket: "vue-project-36c3a.appspot.com",
    messagingSenderId: "914461601329",
    appId: "1:914461601329:web:047a7d310c93dd062baf10"
}

export const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)
export const anonSignIn = () => signInAnonymously(auth)
export const onAuthChanged = (callback) => {
    onAuthStateChanged(auth, (user) => callback?.(user))
}
export const logOut = () => signOut(auth)

export const chatsRef = collection(db, 'chats')

export const addChat = async (chat) => {
    await addDoc(chatsRef, chat)
}

export const addMessageToChat = async (chatId, message) => {
    console.log({ chatId, message })
    const ref = await addDoc(collection(db, 'chats', chatId, 'messages'), message)
    console.log(ref)
}

export const joinChatRoom = async (chatId, uid) => {
    const chatRef = doc(db, 'chats', chatId)
    await updateDoc(chatRef, {
        members: arrayUnion(uid)
    })
}

export { createUserWithEmailAndPassword, signInWithEmailAndPassword, query, where, collection }