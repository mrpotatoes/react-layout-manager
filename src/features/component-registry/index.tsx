/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-grid-system'
import { Registry, Registered } from 'react-registry';
import { Link, useLocation } from 'react-router-dom'
import qs from 'query-string'

import { variants, tiles, layouts } from './config'

const registerRegion = (reg, tiles) => tiles.map(tile => {
  Registry.register(tile.tile, tile.key)
  return tile.key
})

export const ComponentRegistry = () => {
  const { search } = useLocation();
  const variant = qs.parse(search).variant || 1  
  // const region1 = registerRegion(Registry, variants[variant].regions.region1.tiles)

  return (
    <div className="component-registry">
      <h2>Pick a variant</h2>
      <Container fluid>
        <Row debug>
          <Col debug>
            <div className="">
              Choose a layout variant: {' '}
              <Link to="/layout-variants?variant=1">Static</Link> {' | '}
              <Link to="/layout-variants?variant=2">Props</Link> {' | '}
              <Link to="/layout-variants?variant=3">Nested</Link> {' | '}
              <Link to="/layout-variants?variant=4">Async</Link>
            </div>
          </Col>
        </Row>        

        <Row>
          <Col className="variant-info">
            <div>
              <p>Below is using variant <code>{variant}</code> → {variants[variant].short}</p>
              <p>{variants[variant].desc}</p>
              <p>
                The 
              </p>
              <hr />
              <p><i><b>Note</b>: All these are based on a config. <a href="/layout-variants#">Click me</a> to see the config file</i></p>
            </div>
          </Col>
        </Row>
        <br />

        <Row debug>
          <Col debug>
            <h3>Region 1</h3>
            {/* {region1.map(tile => (<Registered id={tile} key={tile} />))} */}
          </Col>

          <Col debug>
            <h3>Region 2</h3>
          </Col>

          <Col debug>
            <h3>Region 3</h3>
          </Col>
        </Row>
        <br />

        <Row debug>
          <Col debug>
          <h3>Region 4</h3>
          </Col>

          <Col debug>
          <h3>Region 5</h3>
          </Col>

          <Col debug>
            <h3>Region 6</h3>
          </Col>
        </Row>
        <br />

        <Row debug>
          <Col debug>
            <br />
            <p>View Code</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
