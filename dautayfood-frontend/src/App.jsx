import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <>
        <Header />
        <h1 style={{ textAlign: 'center' }}>Chào mừng đến với Dâu Tây Food!</h1>
      </>

    </>
  )
}

export default App
