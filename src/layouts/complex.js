/* eslint-disable import/no-anonymous-default-export */
import { Container, Row, Col } from 'react-grid-system'

export default () => (
  <div className="App">
    <Container fluid>
      <Row justify="start" debug>
        <Col xs={3} debug>1 of 3</Col>
        <Col xs={3} debug>2 of 3</Col>
        <Col xs={3} debug>3 of 3</Col>
      </Row>
      <br />
      <Row justify="center" debug>
        <Col xs={3} debug>1 of 3</Col>
        <Col xs={3} debug>2 of 3</Col>
        <Col xs={3} debug>3 of 3</Col>
      </Row>
      <br />
      <Row justify="end" debug>
        <Col xs={3} debug>1 of 3</Col>
        <Col xs={3} debug>2 of 3</Col>
        <Col xs={3} debug>3 of 3</Col>
      </Row>
      <br />
      <Row justify="between" debug>
        <Col xs={3} debug>1 of 3</Col>
        <Col xs={3} debug>2 of 3</Col>
        <Col xs={3} debug>3 of 3</Col>
      </Row>
      <br />
      <Row justify="around" debug>
        <Col xs={3} debug>1 of 3</Col>
        <Col xs={3} debug>2 of 3</Col>
        <Col xs={3} debug>3 of 3</Col>
      </Row>
      <br />
      <Row justify="initial" debug>
        <Col xs={3} debug>1 of 3</Col>
        <Col xs={3} debug>2 of 3</Col>
        <Col xs={3} debug>3 of 3</Col>
      </Row>
      <br />
      <Row justify="inherit" debug>
        <Col xs={3} debug>1 of 3</Col>
        <Col xs={3} debug>2 of 3</Col>
        <Col xs={3} debug>3 of 3</Col>
      </Row>
    </Container>
  </div>
);
