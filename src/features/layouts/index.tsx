import React from 'react'
import { Container, Row, Col } from 'react-grid-system'

export const LayoutConfig = () => {
  return (
    <div>
      <Container fluid>
        <Row justify="center">
          <Col xs={10}>
            <h2>Layout config page</h2>
            <p>Now, this is how it works ...</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}