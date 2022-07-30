import React from 'react'
import { Container, Row, Col } from 'react-grid-system'

export const CardReverse = () => (
  <Container sm style={{
    border: '1px solid lightgrey',
    padding: '10px',
    margin: '10px',
    width: '400px',
  }}>
    <Row>
      <Col>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum lacinia egestas. Nullam auctor tortor euismod turpis egestas pretium. Aliquam ullamcorper nulla .
          </p>
          <Row justify="center">
            <button>Button</button>
          </Row>
        </div>
      </Col>
    </Row>
    <Row debug>
      <Col>
        <div className="card">
          <img src="https://via.placeholder.com/350x300" className="card-img-top" alt="..." />
        </div>
      </Col>
    </Row>
  </Container>
)