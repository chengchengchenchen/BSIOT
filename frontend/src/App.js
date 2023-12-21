import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

function NotFound(){
  return <div>这里是卡拉云的主页</div>
}


function Home() {
  return <div>hello world</div>
}

const About = () => {
  return <div>这里是卡拉云的主页</div>
}

const Dashboard = () => {
  return <div>今日活跃用户: 42</div>
}

export default App;

