import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, query, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';

const appId = "react-chat-app-5b44b"; // Updated with your project ID
const firebaseConfig = {
    apiKey: "AIzaSyDBR1x_-WT59FUqg0D-TO5gircwfEivw64",
    authDomain: "react-chat-app-5b44b.firebaseapp.com",
    projectId: "react-chat-app-5b44b",
    storageBucket: "react-chat-app-5b44b.firebasestorage.app",
    messagingSenderId: "119301227447",
    appId: "1:119301227447:web:6489b0ac70d7d3f992de32",
    measurementId: "G-G505D08NMB"
};
const initialAuthToken = null;

export const useFirebaseChat = () => {
    const [db, setDb] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [chatRooms, setChatRooms] = useState([]);
    const [currentRoomId, setCurrentRoomId] = useState(null);
    const [messages, setMessages] = useState([]);
    
    // Auth and DB initialization
    useEffect(() => {
        try {
            if (!firebaseConfig.apiKey) {
                console.error("Firebase config is not provided. Please enter your configuration details.");
                return;
            }
            const app = initializeApp(firebaseConfig);
            const authInstance = getAuth(app);
            const dbInstance = getFirestore(app);
            setDb(dbInstance);

            const unsubscribe = onAuthStateChanged(authInstance, async (currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                } else {
                    try {
                        if (initialAuthToken) {
                            await signInWithCustomToken(authInstance, initialAuthToken);
                        } else {
                            await signInAnonymously(authInstance);
                        }
                    } catch (error) {
                        console.error("Firebase auth error:", error);
                    }
                }
                setIsAuthReady(true);
            });
            return () => unsubscribe();
        } catch (error) {
            console.error("Error initializing Firebase:", error);
        }
    }, []);

    // Fetch chat rooms
    useEffect(() => {
        if (db && isAuthReady) {
            const q = query(collection(db, `artifacts/${appId}/public/data/chatRooms`), orderBy("createdAt"));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const rooms = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setChatRooms(rooms);
                if (rooms.length > 0 && !currentRoomId) {
                    setCurrentRoomId(rooms[0].id);
                }
            });
            return () => unsubscribe();
        }
    }, [db, isAuthReady, currentRoomId]);

    // Fetch messages for the current room
    useEffect(() => {
        if (db && currentRoomId) {
            const messagesRef = collection(db, `artifacts/${appId}/public/data/chatRooms/${currentRoomId}/messages`);
            const unsubscribe = onSnapshot(query(messagesRef, orderBy("createdAt")), (snapshot) => {
                const msgs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(msgs);
            });
            return () => unsubscribe();
        }
    }, [db, currentRoomId]);

    const handleSendMessage = async (text) => {
        if (text.trim() === '' || !user || !currentRoomId) {
            return;
        }
        try {
            const messagesRef = collection(db, `artifacts/${appId}/public/data/chatRooms/${currentRoomId}/messages`);
            await addDoc(messagesRef, {
                text: text,
                uid: user.uid,
                displayName: user.displayName || `Guest-${user.uid.slice(0, 5)}`,
                photoURL: user.photoURL || null,
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleAddRoom = async (roomName) => {
        if (roomName.trim() === '') return;
        try {
            const roomsRef = collection(db, `artifacts/${appId}/public/data/chatRooms`);
            await addDoc(roomsRef, {
                name: roomName,
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error adding new room:", error);
        }
    };

    return {
        isAuthReady,
        user,
        chatRooms,
        currentRoomId,
        setCurrentRoomId,
        messages,
        handleSendMessage,
        handleAddRoom
    };
};