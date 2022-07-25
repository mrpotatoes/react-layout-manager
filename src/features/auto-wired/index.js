import { Container, Row, Col } from 'react-grid-system'

export const Autowired = () => {
  return (
    <div>
      <Container fluid>
        <Row justify="center">
          <Col xs={10}>
          <p>Autowired components & layout</p>
          <p>Should handle everything manually</p>
          <p>Would be dope to transpile this into JSX components to be bundled later.</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}