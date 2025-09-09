import React, { useState } from 'react';

export const ChatContainer = ({
    chatRooms,
    currentRoomId,
    setCurrentRoomId,
    messages,
    user,
    newMessageText,
    setNewMessageText,
    onSubmitNewMessage,
    newRoomName,
    setNewRoomName,
    onSubmitNewRoom
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const currentRoom = chatRooms.find(room => room.id === currentRoomId);

    return (
        <div className="w-full max-w-2xl h-[90vh] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden relative">
            {/* Header with Room Name */}
            <div className="bg-gray-200 text-gray-800 p-4 border-b border-gray-300 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{currentRoom ? currentRoom.name : 'Select a Room'}</h2>
                <button
                    className="md:hidden p-2 text-gray-600 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>

            {/* Main Chat and Rooms Content */}
            <div className="flex flex-grow overflow-hidden">
                {/* Rooms List (Desktop & Mobile Overlay) */}
                <div className={`absolute md:static top-0 left-0 w-full md:w-2/5 lg:w-1/3 h-full bg-gray-900 text-white z-10 p-4 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col border-r border-gray-700`}>
                    <h2 className="text-xl font-bold mb-4">Chat Rooms</h2>
                    <ul className="flex-grow overflow-y-auto">
                        {chatRooms.map(room => (
                            <li
                                key={room.id}
                                className={`cursor-pointer p-2 rounded-md mb-2 ${currentRoomId === room.id ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                                onClick={() => {
                                    setCurrentRoomId(room.id);
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                {room.name}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <h3 className="text-lg font-bold mb-2">Create New Room</h3>
                        <div className="flex">
                            <input
                                type="text"
                                value={newRoomName}
                                onChange={(e) => setNewRoomName(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') onSubmitNewRoom(); }}
                                placeholder="Room name..."
                                className="w-4/5 bg-gray-700 text-white border border-gray-600 rounded-l-md p-2 focus:outline-none focus:border-indigo-500"
                                />
                            <button
                                onClick={onSubmitNewRoom}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2 rounded-r-md transition duration-300 flex-shrink-0"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chat Messages and Input */}
                <div className="flex flex-col flex-grow bg-gray-50">
                    <div className="flex-grow p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start mb-4 ${msg.uid === user?.uid ? 'justify-end' : ''}`}>
                                {msg.uid !== user?.uid && (
                                    <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-sm font-bold mr-2">
                                        {msg.displayName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className={`p-3 rounded-lg max-w-sm ${msg.uid === user?.uid ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'}`}>
                                    <div className="font-bold text-sm mb-1">{msg.displayName}</div>
                                    <div>{msg.text}</div>
                                </div>
                                {msg.uid === user?.uid && (
                                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold ml-2 text-white">
                                        {msg.displayName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <form onSubmit={onSubmitNewMessage} className="p-4 bg-white flex border-t border-gray-200">
                        <input
                            type="text"
                            value={newMessageText}
                            onChange={(e) => setNewMessageText(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow bg-gray-100 text-gray-800 border border-gray-300 rounded-full p-3 mr-2 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};