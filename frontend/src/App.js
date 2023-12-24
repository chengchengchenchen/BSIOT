import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./page/login/login"
import HomePage from "./page/home/home"
import RegisterPage from "./page/register/register"
import DeviceConfigPage from "./page/deviceConfig/deviceConfig"
function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/deviceConfig" element={<DeviceConfigPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

function NotFound(){
  return <div>404 Not Founds</div>
}


export default App;

