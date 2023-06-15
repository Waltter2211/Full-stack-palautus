const Total = (props) => {
    return (
        <div>
            <h4>
                total of {props.total} exercises
            </h4>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.coursePartName} {props.coursePartExercise}
            </p>
        </div>
    )
}

function Content(props) {
    var summed = props.coursesParts.map(coursePart => coursePart.exercises)
    return (
        <div>
            <h2>{props.coursesName}</h2>
            {props.coursesParts.map(coursePart => <Part key={coursePart.id} coursePartName={coursePart.name} coursePartExercise={coursePart.exercises} />)}
            <Total total={summed.reduce((a, b) => a + b, 0)} />
        </div>
    )
}

const Header = () => {
    return (
        <div>
            <h1>Web development curriculum</h1>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header />
            {props.courses.map(course => <Content key={course.id} coursesName={course.name} coursesParts={course.parts} />)}
        </div>
    )
}

export default Course