/* eslint-disable import/no-anonymous-default-export */
import * as R from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { Registry } from 'react-registry';
import registry from '../tiles/registry'

// Gotta register the component
// Gotta setup the config
// Gotta put things into where they exist.

const TitleComponent = (props) => (
  <div>
    <h1>{props.text}</h1>
    <p>{props.children}</p>
  </div>
)

Registry.register(TitleComponent, "title");


const layoutConfig = {
  sections: {
    left: '',
  }
}

export default () => {
  const TitleComponent2 = Registry.get("title");
  const titleComponent = Registry.createElement("title", {text: "Dynamically created"});

  return (
    <div className="App">
      <Container fluid>
        <Row debug>
          <Col debug>1 of 2</Col>
          <Col debug>
            <TitleComponent2 text="Hello Registry" >
              And here be thine children
            </TitleComponent2>

            {titleComponent}
          </Col>
        </Row>
        <br />
        <Row debug>
          <Col debug>1 of 3</Col>
          <Col debug>2 of 3</Col>
          <Col debug>3 of 3</Col>
        </Row>
      </Container>
    </div>
  )
}