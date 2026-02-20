import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Container, Table, Button, Form } from 'react-bootstrap'
import alumnos from './alumnos.json'

// Tareas -> Filtro para que solo se muestren los alumnos del curso de DAW o DAM
// Si de damos al button vemos sus calificaciones utilizando un componente de React
// https://www.react-google-charts.com/

function App() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState('DAW')

  const alumnosFiltrados =
    cursoSeleccionado === 'Todos'
      ? alumnos
      : alumnos.filter((alumno) => alumno.curso === cursoSeleccionado)

  const filasAlumnos = alumnosFiltrados.map((alumno) => (
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

  const optionCursos = [
    'Todos',
    ...new Set(alumnos.map((alumno) => alumno.curso)),
  ].map((curso) => <option key={curso}>{curso}</option>)

  return (
    <Container>
      <h1>Listado alumnos</h1>
      <p>Filtra el listado de alumnos por curso</p>
      <Form.Select
        aria-label="Selección de curso"
        value={cursoSeleccionado}
        onChange={(e) => setCursoSeleccionado(e.target.value)}
      >
        {optionCursos}
      </Form.Select>
      <br />
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
