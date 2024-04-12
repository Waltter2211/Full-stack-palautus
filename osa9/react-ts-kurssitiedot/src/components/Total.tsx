interface TotalProps {
  totalExercises: number
}

function Total({ totalExercises }: TotalProps) {
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}

export default Total;