import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
// import 'antd/dist/antd.css'; // Import Ant Design styles
// import 'antd/dist/antd.css';
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthHome from "./pages/AuthHome";
import MyBooking from "./pages/customer/MyBooking";
import MyCart from "./pages/customer/MyCart";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/admin/AdminUsers";
import PropertyManage from "./pages/admin/PropertyManage";
import Dashboard from "./pages/admin/Dashboard";
import ChatReply from "./pages/admin/ChatReply";
import HomeType from "./pages/admin/HomeType";
import AddHomeType from "./pages/admin/AddHomeType";
import EditHomeType from "./pages/admin/EditHomeType";
import AddProperty from "./pages/admin/AddProperty";
import BookNow from "./pages/customer/BookNow";
import EditProperty from "./pages/admin/EditProperty";
import AdminNotification from "./pages/admin/AdminNotification";
import Chat from "./pages/customer/Chat";
import AdminChat from "./components/AdminChat";
import PropertyDetail from "./pages/admin/PropertyDetail";
import CustomerNotification from "./pages/customer/CustomerNotification";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import Explore from "./pages/Explore";
import ExplorePage from "./pages/ExplorePage";
import AdminChatList from "./pages/admin/AdminChatList";
import ReplyChat from "./pages/admin/ReplyChat";
import Terms from "./components/Terms";

function App() {
  const { Loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {Loading && <Loader />}
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          {/* route for admin */}
          {/* <Route path="/location" element={<ProtectedRoute><Location/></ProtectedRoute>}/> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage/users"
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage/hometype"
            element={
              <ProtectedRoute>
                <HomeType />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-hometype"
            element={
              <ProtectedRoute>
                <AddHomeType />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-hometype/:id"
            element={
              <ProtectedRoute>
                <EditHomeType />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage/property"
            element={
              <ProtectedRoute>
                <PropertyManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-property"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-property/:id"
            element={
              <ProtectedRoute>
                <EditProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/property-detail/:id"
            element={
              <ProtectedRoute>
                <PropertyDetail />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/admin/chat" element={<ProtectedRoute><ChatReply/></ProtectedRoute>}/> */}
          <Route
            path="/admin/notification"
            element={
              <ProtectedRoute>
                <AdminNotification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reply-chat/:userId"
            element={
              <ProtectedRoute>
                <ReplyChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chat"
            element={
              <ProtectedRoute>
                <AdminChatList />
              </ProtectedRoute>
            }
          />

          {/* route for customer */}
          <Route
            path="/mybooking"
            element={
              <ProtectedRoute>
                <MyBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <MyCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/notification"
            element={
              <ProtectedRoute>
                <CustomerNotification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booknow/:id"
            element={
              <ProtectedRoute>
                <BookNow />
              </ProtectedRoute>
            }
          />

          {/* route all user  */}

          <Route
            path="/contact"
            element={
              <PublicRoute>
                <Contacts />
              </PublicRoute>
            }
          />
          <Route
            path="/Register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PublicRoute>
                <About />
              </PublicRoute>
            }
          />
          <Route
            path="/terms"
            element={
              <PublicRoute>
                <Terms />
              </PublicRoute>
            }
          />
          <Route
            path="/Explore"
            element={
              <PublicRoute>
                <Explore />
              </PublicRoute>
            }
          />
          <Route
            path="/ExplorePage"
            element={
              <PublicRoute>
                <ExplorePage />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/myhome"
            element={
              <ProtectedRoute>
                <AuthHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/about" element={<PublicRoute><About/></PublicRoute>}/> */}
          {/* <Route path="/" element={<PublicRoute><GuestHome/></PublicRoute>}/>  */}
          {/* <Route path="/contact" element={<PublicRoute><Contact/></PublicRoute>}/>  */}

          <Route
            path="/user/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chat"
            element={
              <ProtectedRoute>
                <AdminChat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
