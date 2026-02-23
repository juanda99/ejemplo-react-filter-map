import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Container, Table, Button, Form } from 'react-bootstrap'
import alumnos from './alumnos.json'
import NotasModal from './NotasModal'

// Tareas -> Filtro para que solo se muestren los alumnos del curso de DAW o DAM
// Si de damos al button vemos sus calificaciones utilizando un componente de React
// https://www.react-google-charts.com/

function App() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState('DAW')
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null)

  const asignaturas = ['matematicas', 'lenguaje', 'informatica', 'fisica']

  const mediasClase = asignaturas.reduce((acumulador, asignatura) => {
    const sumaAsignatura = alumnos.reduce(
      (suma, alumno) => suma + alumno.calificaciones[asignatura],
      0,
    )
    acumulador[asignatura] = Number(
      (sumaAsignatura / alumnos.length).toFixed(2),
    )
    return acumulador
  }, {})

  const obtenerMediaAlumno = (calificaciones) => {
    const suma = asignaturas.reduce(
      (acumulador, asignatura) => acumulador + calificaciones[asignatura],
      0,
    )
    return Number((suma / asignaturas.length).toFixed(2))
  }

  const alumnosFiltrados =
    cursoSeleccionado === 'Todos'
      ? alumnos
      : alumnos.filter((alumno) => alumno.curso === cursoSeleccionado)

  const optionCursos = [
    'Todos',
    ...new Set(alumnos.map((alumno) => alumno.curso)),
  ].map((curso) => <option key={curso}>{curso}</option>)

  const mensaje =
    cursoSeleccionado === 'Todos'
      ? `Se han encontrado ${alumnos.length} alumnos`
      : `Se han encontrado ${alumnosFiltrados.length} alumnos de un total de ${alumnos.length}`
  return (
    <Container>
      <h1>Listado alumnos</h1>
      <p>Filtra el listado de alumnos por curso</p>
      <p>{mensaje}</p>
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
            <th>Nota media</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnosFiltrados.map(
            ({ id, imagen, nombre, apellido, curso, calificaciones }) => (
              <tr key={id}>
                <td>
                  <img src={imagen} height={50} />
                </td>
                <td>{nombre}</td>
                <td>{apellido}</td>
                <td>{curso}</td>
                <td>{obtenerMediaAlumno(calificaciones)}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() =>
                      setAlumnoSeleccionado({
                        nombre,
                        apellido,
                        calificaciones,
                      })
                    }
                  >
                    Ver calificaciones
                  </Button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
      <NotasModal
        show={Boolean(alumnoSeleccionado)}
        onHide={() => setAlumnoSeleccionado(null)}
        mediasClase={mediasClase}
        notasAlumno={alumnoSeleccionado?.calificaciones}
        nombreAlumno={
          alumnoSeleccionado
            ? `${alumnoSeleccionado.nombre} ${alumnoSeleccionado.apellido}`
            : ''
        }
      />
    </Container>
  )
}

export default App
