import { useEffect, useState } from 'react'
import './App.css'
import { fetchDiaries } from './services/diaryService'
import Diary from '../types'

function App() {

  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    fetchDiaries().then((res) => {
      setDiaries(res.data)
    })
  }, [])

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(diary => {
        return (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>{diary.weather}</p>
            <p>{diary.visibility}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
