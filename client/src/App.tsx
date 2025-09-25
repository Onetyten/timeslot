import { useState } from 'react'
import { TextScramble } from '@skyshots/react-text-scrambler'

function App() {
  const [trigger, setTrigger] = useState(0)

  return (
    <main className='w-screen h-screen bg-background flex justify-center items-center flex-col gap-4 text-border-muted'>
      <h1 className='font-console text-primary'>
        <TextScramble key={trigger} texts={['Vite + React','Vite']} letterSpeed={40} nextLetterSpeed={60} pauseTime={2000} />
      </h1>
      <div className="card">
        <button>
          count is <span className='text-primary'>{trigger}</span>
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        <TextScramble key={trigger} texts={['Click on the Vite and React logos to learn more']} letterSpeed={40}
        nextLetterSpeed={100}
        pauseTime={2000} />
        
      </p>
      <button onClick={() => setTrigger((t) => t + 1)} className="p-3 mt-4 bg-primary hover:bg-primary-100 text-white rounded">
        Trigger Scramble
      </button>
    </main>
  )
}

export default App
