import { BrowserRouter, Routes, Route } from "react-router-dom";
import  ProtectedRoute from "./components/ProtectedRoute";
import  PublicRoute  from "./components/PublicRoute";
// import 'antd/dist/antd.css'; // Import Ant Design styles
// import 'antd/dist/antd.css';
import  {useSelector}  from "react-redux";
import  Loader  from "./components/Loader";
import Register  from "./pages/Register";
import Login  from "./pages/Login";
import Home from "./pages/Home";
import MyBooking from "./pages/customer/MyBooking";
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

function App() {
  const {Loading} = useSelector(state=>state.alerts)
  return <div>
   {Loading && <Loader/>}
    <BrowserRouter >
  {/* <Header /> */}
  <Routes>
    {/* route for admin */}
    {/* <Route path="/location" element={<ProtectedRoute><Location/></ProtectedRoute>}/> */}
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    <Route path="/manage/users" element={<ProtectedRoute><AdminUsers/></ProtectedRoute>}/>
    <Route path="/manage/hometype" element={<ProtectedRoute><HomeType/></ProtectedRoute>}/>
    <Route path="/add-hometype" element={<ProtectedRoute><AddHomeType/></ProtectedRoute>}/>
    <Route path="/edit-hometype/:id" element={<ProtectedRoute><EditHomeType/></ProtectedRoute>}/>
    <Route path="/manage/property" element={<ProtectedRoute><PropertyManage/></ProtectedRoute>}/>
    <Route path="/add-property" element={<ProtectedRoute><AddProperty/></ProtectedRoute>}/>
    <Route path="/admin/chat" element={<ProtectedRoute><ChatReply/></ProtectedRoute>}/>
     

    {/* route for customer */}
    <Route path="/mybooking" element={<ProtectedRoute><MyBooking/></ProtectedRoute>}/>
    <Route path="/booknow/:id" element={<ProtectedRoute><BookNow/></ProtectedRoute>}/>


 
    {/* route all user  */}
    <Route path="/Register" element={<PublicRoute><Register/></PublicRoute>}/>
    <Route path="/" element={<PublicRoute><Home/></PublicRoute>}/>
    <Route path="/Login" element={<PublicRoute><Login/></PublicRoute>}/>
    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    {/* <Route path="/about" element={<PublicRoute><About/></PublicRoute>}/> */}
    {/* <Route path="/" element={<PublicRoute><GuestHome/></PublicRoute>}/>  */}
     {/* <Route path="/contact" element={<PublicRoute><Contact/></PublicRoute>}/>  */}
    
    </Routes>
    </BrowserRouter>
  </div>
}
  
export default App;
