import React from 'react'

function Notification({ style, text }) {

  return (
    <div>
        <p className={style}>{text}</p>
    </div>
  )
}

export default Notification