import './css/loginform.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/businessbridge/employee/Login";
import Main from "./pages/businessbridge/Main";
import FindPassword from "./pages/businessbridge/employee/FindPassword";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout/> }>
                <Route index element={<Main/>}></Route>
            </Route>
            <Route path="emp/employee">
                <Route path="login" element={ <Login/> }/>
                <Route path="findpassword" element={<FindPassword/> }/>
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
