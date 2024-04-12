import Part from "./Part";
import CoursePart from '../../types';

/* interface ContentPropsDetails {
  name: string,
  exerciseCount: number
} */

type ContentProps = {
  courseParts: CoursePart[]
}

function Content({ courseParts }: ContentProps) {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <div>
      {courseParts.map((coursePart: CoursePart, index: number) => {
        switch (coursePart.kind) {
        case 'basic':
          return <Part key={index} name={coursePart.name} description={coursePart.description} exerciseCount={coursePart.exerciseCount} />
        case 'group':
          return <Part key={index} name={coursePart.name} description={coursePart.description} exerciseCount={coursePart.exerciseCount} groupProjectCount={coursePart.groupProjectCount} />
        case 'background':
          return <Part key={index} name={coursePart.name} description={coursePart.description} exerciseCount={coursePart.exerciseCount} backgroundMaterial={coursePart.backgroundMaterial} />
        case 'special':
          return <Part key={index} name={coursePart.name} description={coursePart.description} exerciseCount={coursePart.exerciseCount} requirements={coursePart.requirements} />
        default:
          return assertNever(coursePart);
        }
      })}
    </div>
  )
}

export default Content;