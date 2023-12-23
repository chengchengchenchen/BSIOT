import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./page/login/login"
import HomePage from "./page/home/home"

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

function NotFound(){
  return <div>404 Not Founds</div>
}


export default App;

