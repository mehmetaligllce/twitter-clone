import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateTweetForm from './components/UpdateTweetForm.jsx'
import TweetForm from "./components/TweetForm.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { useAuthStore } from "./store/authStore.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import CommentsList from "./components/CommentsList.jsx";
import CommentsForm from "./components/CommentsForm.jsx";
import UserTweets from "./components/UserTweets.jsx";
import UpdateProfile from "./components/UpdateProfile.jsx";


function App() {
    const { isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) {
        return <div style={{ color: "white", textAlign: "center", marginTop: "100px", fontSize: "1.5rem" }}>Otorite Sağlanıyor... Lütfen Bekleyin ⏳</div>;
    }

    return (
        <Router>
            <Routes>

                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile/:id" element={<ProfilePage />} />
                    <Route path="/update-tweet/:id" element={<UpdateTweetForm />} />
                    <Route path="/create-tweet" element={<TweetForm />} />
                    <Route path="/comments/:tweetId" element={<CommentsList />} />
                    <Route path="/comments/create-comment/:tweetId" element={<CommentsForm />} />
                    <Route path="/user-tweets/:id" element={<UserTweets />} />
                    <Route path="/update-profile" element={<UpdateProfile />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </Router>
    )
}
export default App
