import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import ReactMarkdown from 'react-markdown'

const md = `
# \`react-layout-manager\`

\`react-layout-manager\`

\`\`\`
Some code in here
but
there
is
more
here
wow
\`\`\`

I wanted to write a blog post on different ways to handle 
`

export const StartHere = () => (
  <div className="blog">
    <Container fluid>
      <Row justify="center">
        <Col xs={10}>
        <ReactMarkdown children={md} />
        </Col>
      </Row>
    </Container>
  </div>
)