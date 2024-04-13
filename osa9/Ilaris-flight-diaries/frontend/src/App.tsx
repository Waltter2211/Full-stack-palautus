import { useEffect, useState } from 'react'
import './App.css'
import { addNewDiary, fetchDiaries } from './services/diaryService'
import { Diary } from '../types'

function App() {

  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')


  useEffect(() => {
    fetchDiaries().then((res) => {
      setDiaries(res.data)
    })
  }, [])

  const handleDiary = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newDiaryObj = {
      id: diaries.length + 1,
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }

    addNewDiary(newDiaryObj).then(res => {
      setDiaries(diaries.concat(res.data))
    })
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleDiary}>
        <p>date</p>
        <input type='text' onChange={(event) => setDate(event.target.value)} />
        <p>weather</p>
        <input type='text' onChange={(event) => setWeather(event.target.value)} />
        <p>visibility</p>
        <input type='text' onChange={(event) => setVisibility(event.target.value)} />
        <p>comment</p>
        <input type='text' onChange={(event) => setComment(event.target.value)} />
        <button>create</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map(diary => {
        return (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>{diary.weather}</p>
            <p>{diary.visibility}</p>
            <p>{diary.comment}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
