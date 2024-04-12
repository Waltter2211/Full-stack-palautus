interface SentPropsDetails {
    name: string,
    exerciseCount: number,
    description?: string | undefined,
    groupProjectCount?: number,
    backgroundMaterial?: string,
    requirements?: string[]
}

type SentProps = SentPropsDetails

function Part(props: SentProps) {
  return (
    <div>
      <h3>{props.name} {props.exerciseCount}</h3>
      <p>{props.description}</p>
      <p>{props.backgroundMaterial}</p>
      {props.groupProjectCount && <p>project exercises {props.groupProjectCount}</p>}
      {props.requirements && <p>required skills: {props.requirements.map(requirement => ' ' + requirement)} </p>}
    </div>
  )
}

export default Part