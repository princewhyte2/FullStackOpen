import React from 'react'

const Header = ({ course }) => <h1>{ course }</h1>


const Part = ({ part }) => (<p>{ part.name } { part.exercises }</p>)

const Content = ({ parts }) =>
(
  <div>
    { parts.map((part, index) => <Part key={ index } part={ part } />) }
  </div>
)


const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0)
  return <p>Number of exercises { total }</p>
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return (
    <div>
      <Header course={ course.name } />
      <Content parts={ course.parts } />
      <Total parts={ course.parts } />
    </div>
  )
}

export default App