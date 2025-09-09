
# Real-Time Chat Application
This is a real-time chat application built using React and Firebase. The app features multiple chat rooms, allowing users to send messages that are instantly synchronized across all connected clients.

## ✨ Features
Real-Time Messaging: Messages are sent and received in real-time using Firebase Firestore, ensuring instant communication.

Multiple Chat Rooms: Users can create and join different public chat rooms to organize conversations.

Anonymous Authentication: Users are automatically signed in as guests, providing a seamless and quick way to start chatting.

Responsive UI: The application's design is optimized for a great user experience on both desktop and mobile devices.

## 🚀 Getting Started
Follow these steps to get a copy of the project up and running on your local machine.

## Prerequisites
You need to have Node.js and npm installed.


Installation
Clone the repository:

Bash

git clone https://github.com/[your-username]/[your-repo-name].git
Navigate to the project directory:

Bash

cd [your-repo-name]
Install the project dependencies:

Bash

npm install
Firebase Configuration
This project relies on Firebase for its backend. You need to connect it to your own Firebase project.

Go to the Firebase Console and create a new project.

In your Firebase project, enable the Firestore Database and Anonymous Authentication.

Locate your project's configuration object by going to Project settings > General.

Open the src/hooks/useFirebaseChat.js file in your code editor and replace the placeholder firebaseConfig object with your actual configuratio
