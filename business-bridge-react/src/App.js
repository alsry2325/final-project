//import './stylee.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/businessbridge/Main";
import ApprovalLayout from "./layouts/ApprovalLayout";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Layout/> }>
              <Route index element={<Main/>}></Route>
          </Route>

            <Route path="/approval">        {/*여기에서 권한체크?*/}
                <Route path="home" element={<ApprovalLayout/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
