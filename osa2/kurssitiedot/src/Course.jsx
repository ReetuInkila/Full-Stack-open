const Header = (props) => {
    return <h1>{props.course}</h1>
}
  
const Total = (props) => {
    const sum = props.parts.reduce(function (acc, part) { return acc + part.exercises; }, 0);
    return <b>total of exercises {sum}</b>
}
  
const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
}
  
const Content = (props) => {
    return (
      <div>
        {props.parts.map((part) => 
            <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
      </div>
    )
}

const Course = (props) => {
    return(
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts}/>
        </div>
    )
}

export default Course