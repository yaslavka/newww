import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import React from 'react'
import Spin from '../Header'

function Blacc() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={7}>
          <Spin />
          <iframe
            src="https://demo.evoplay.games/demo/fullstate/html5/evoplay/nukeworld"
            width="100%"
            height={500}
          />
        </Col>
      </Row>
    </Container>
  )
}
export default Blacc
