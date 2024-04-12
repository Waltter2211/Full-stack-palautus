interface ContentPropsDetails {
    name: string,
    exerciseCount: number
}

type ContentProps = {
    courseParts: ContentPropsDetails[]
}

function Content({courseParts}: ContentProps) {
  return (
    <div>
      <p>{courseParts[0].name}: {courseParts[0].exerciseCount}</p>
      <p>{courseParts[1].name}: {courseParts[1].exerciseCount}</p>
      <p>{courseParts[2].name}: {courseParts[2].exerciseCount}</p>
    </div>
  )
}

export default Content;