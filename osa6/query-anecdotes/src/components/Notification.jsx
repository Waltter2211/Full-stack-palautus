import { useContext } from "react"
import NotificationContext from "../contexts/NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationContext = useContext(NotificationContext)
  const notification = notificationContext[0]
  
  if (notification === '') return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
