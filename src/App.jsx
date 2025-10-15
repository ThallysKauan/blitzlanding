import { useState } from 'react'
import './App.css'
import './fonts.css'
import Navbar from "./components/Navbar/Navbar";
import Headline from "./components/Headline/Headline";
import Principal from "./components/Principal/Principal";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <main>
        <Headline/>
        <Principal/>
      </main>
    </>
  )
}

export default App
