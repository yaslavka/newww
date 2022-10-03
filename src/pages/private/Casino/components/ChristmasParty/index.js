import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavBar from '../../../../../components/layout/Navbar'
import Spio from '../../../../../components/Header'
function Christmas() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <Spio />
          <iframe
            src="https://demo.evoplay.games/demo/instant/html5/evoplay/christmasparty"
            width="100%"
            height={500}
          />
        </Col>
      </Row>
    </Container>
  )
}
export default Christmas
