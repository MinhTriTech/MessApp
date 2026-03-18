import './App.css'
import Chat from './pages/Chat'
import TestChat from './pages/TestChat'

function App() {
  return (
    <div>
      <TestChat />
      <Chat conversationId={5}/>
    </div>
  )
}

export default App
