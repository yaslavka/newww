import React, { useEffect, useMemo } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'


import * as actions from '../../../actions/milkyway.actions'
import NavBar from '../../../components/layout/Navbar'
//import UserInfo from '../../../components/UserInfo'
import Table from '../../../components/Table'
import { Spinner } from 'react-bootstrap'

const Statisticmilkyway = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.milkyway.loadings.table)
  const list = useSelector((state) => state.milkyway.table)

  const arrayList = useMemo(
    () => list.map((el) => ({ ...el, level: `Уровень ${el.level}` })),
    [list],
  )

  const columns = useMemo(
    () => ({
      level: 'Уровни',
      matrix: '№ последний номер',
    }),
    [],
  )

  useEffect(() => {
    dispatch(actions.milkywayStatistic())
  }, [dispatch])

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={9}>
          <h1 className="root-page-title">Статистика</h1>
          <Spinner isLoading={isLoading}>
            <Table columns={columns} data={arrayList} withoutPaginate />
          </Spinner>
        </Col>
      </Row>
    </Container>
  )
}

export default Statisticmilkyway
