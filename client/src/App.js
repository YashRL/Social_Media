import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import "./App.css";
import Home from "./pages/Home";
import Explore from "./pages/Explore/Explore";
import Feed from "./pages/Feed/Feed";
import Messages from "./pages/Messages/Messages";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Lists from "./pages/Lists/Lists";
import Profile from "./pages/Profile/Profile";
import More from "./pages/More/More";
import Notifications from "./pages/Notifications/Notifications";

function App() {
  return (
    <div className="app">
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute> <Home /></ProtectedRoute>} >
            <Route index element={<Feed />} />
          </Route>
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          >
            <Route path="feed" element={<Feed />} />
            <Route path="explore" element={<Explore />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="messages" element={<Messages />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="lists" element={<Lists />} />
            <Route path="profile" element={<Profile />} />
            <Route path="more" element={<More />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
