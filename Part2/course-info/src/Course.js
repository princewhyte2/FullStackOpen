
const Header = ({ course }) => <h1>{ course }</h1>


const Part = ({ part }) => (<p>{ part.name } { part.exercises }</p>)

const Content = ({ parts }) =>
(
    <div>
        { parts.map((part) => <Part key={ part.id } part={ part } />) }
    </div>
)


const Total = ({ parts }) => {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0)
    return <h3>total of { total } exercises</h3>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={ course.name } />
            <Content parts={ course.parts } />
            <Total parts={ course.parts } />
        </div>
    )
}

export default Course