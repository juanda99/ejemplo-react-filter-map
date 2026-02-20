import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Table, Button } from 'react-bootstrap'
import alumnos from './alumnos.json'

// Tareas -> Filtro para que solo se muestren los alumnos del curso de DAW o DAM
// Si de damos al button vemos sus calificaciones utilizando un componente de React
// https://www.react-google-charts.com/

function App() {
  const filasAlumnos = alumnos.map((alumno) => (
    <tr key={alumno.id}>
      <td>
        <img src={alumno.imagen} height={50} />
      </td>
      <td>{alumno.nombre}</td>
      <td>{alumno.apellido}</td>
      <td>{alumno.curso}</td>
      <td>
        <Button variant="primary">Ver calificaciones</Button>
      </td>
    </tr>
  ))

  return (
    <Container>
      <h1>Listado alumnos</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Curso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{filasAlumnos}</tbody>
      </Table>
    </Container>
  )
}

export default App
