import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, doc, updateDoc, arrayUnion, orderBy, limitToLast, setDoc } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

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

export const addMessageToChat = async (chatId, message, audioBlob
) => {
    let audioUrl = null
    const uniqueRef = Date.now().toString()
    const messageRef = doc(db, 'chats', chatId, 'messages', uniqueRef)
    if (audioBlob) {
        const storageRef = ref(storage, `chats/${chatId}/${uniqueRef}.wav`);
        const upload = await uploadBytes(storageRef, audioBlob)
        audioUrl = await getDownloadURL(upload.ref)
    }
    await setDoc(messageRef, { ...message, audioUrl })
}

export const joinChatRoom = async (chatId, uid) => {
    const chatRef = doc(db, 'chats', chatId)
    await updateDoc(chatRef, {
        members: arrayUnion(uid)
    })
}

export { createUserWithEmailAndPassword, signInWithEmailAndPassword, query, where, collection, orderBy, limitToLast }