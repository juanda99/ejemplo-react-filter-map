import { Modal } from 'react-bootstrap'
import { Chart } from 'react-google-charts'

function NotasModal({ show, onHide, mediasClase, notasAlumno, nombreAlumno }) {
  if (!notasAlumno || !mediasClase) {
    return null
  }

  const data = [
    ['Asignatura', 'Alumno', 'Media clase'],
    ['Matemáticas', notasAlumno.matematicas, mediasClase.matematicas],
    ['Lenguaje', notasAlumno.lenguaje, mediasClase.lenguaje],
    ['Informática', notasAlumno.informatica, mediasClase.informatica],
    ['Física', notasAlumno.fisica, mediasClase.fisica],
  ]

  const options = {
    title: `Notas de ${nombreAlumno} vs media de la clase`,
    chartArea: { width: '70%', height: '70%' },
    legend: { position: 'top' },
    hAxis: { title: 'Asignatura' },
    vAxis: { title: 'Nota', viewWindow: { min: 0, max: 10 } },
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Comparativa de calificaciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Chart
          chartType="BarChart"
          width="100%"
          height="360px"
          data={data}
          options={options}
        />
      </Modal.Body>
    </Modal>
  )
}

export default NotasModal
