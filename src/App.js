import React from 'react';
import { useFirebaseChat } from './hooks/useFirebaseChat';
import { ChatContainer } from './components/ChatContainer';

const App = () => {
    const {
        isAuthReady,
        user,
        chatRooms,
        currentRoomId,
        setCurrentRoomId,
        messages,
        handleSendMessage,
        handleAddRoom
    } = useFirebaseChat();

    const [newMessageText, setNewMessageText] = React.useState('');
    const [newRoomName, setNewRoomName] = React.useState('');

    const onSubmitNewMessage = (e) => {
        e.preventDefault();
        handleSendMessage(newMessageText);
        setNewMessageText('');
    };

    const onSubmitNewRoom = () => {
        handleAddRoom(newRoomName);
        setNewRoomName('');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-gray-900">
            {!isAuthReady ? (
                <div className="flex items-center justify-center w-full h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-t-indigo-500 border-gray-600"></div>
                </div>
            ) : (
                <ChatContainer
                    chatRooms={chatRooms}
                    currentRoomId={currentRoomId}
                    setCurrentRoomId={setCurrentRoomId}
                    messages={messages}
                    user={user}
                    newMessageText={newMessageText}
                    setNewMessageText={setNewMessageText}
                    onSubmitNewMessage={onSubmitNewMessage}
                    newRoomName={newRoomName}
                    setNewRoomName={setNewRoomName}
                    onSubmitNewRoom={onSubmitNewRoom}
                />
            )}
        </div>
    );
};

export default App;