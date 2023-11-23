//import './stylee.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/businessbridge/Main";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Layout/> }>
              <Route index element={<Main/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
