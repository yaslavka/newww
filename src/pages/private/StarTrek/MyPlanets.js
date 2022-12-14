import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { zeroPad } from 'react-countdown'
import { Row, Col, Container } from 'reactstrap'
//import ReactPaginate from 'react-paginate'
import confirm from 'reactstrap-confirm'
import isEmpty from 'lodash-es/isEmpty'
import { declOfNum } from '../../../utils'
import dayjs from 'dayjs'

import * as actions from '../../../actions/startrek.actions'
//import arrowRight from '../../../scss/media/angle-right.2219c635.svg'
//import arrowLeft from '../../../scss/media/angle-left.309b1344.svg'
//import MyPlanetsElement from './MyPlanetsElement'
import NavBar from '../../../components/layout/Navbar'
//import UserInfo from '../../../components/UserInfo'
import Button from '../../../components/Button'
import Icon from '../../../components/Icon'
//import { Spinner } from 'react-bootstrap'



function MyPlanets() {
  const history = useHistory()
  const dispatch = useDispatch()
  const list = useSelector((state) => state.startrek.list)
  const selected = useSelector((state) => state.startrek.selected)
  const isLoading = useSelector((state) => state.startrek.loadings.list)
  const isUpdateLoading = useSelector((state) => state.startrek.loadings.update)
  const user = useSelector(state => state.app.user);
  const { total, page } = useSelector((state) => state.startrek.meta)
  const { limit } = useSelector((state) => state.startrek.query)
  const start = dayjs().tz('Europe/Minsk').startOf('date')
  const end = start.add(10, 'hour')



  const isDisable = useMemo(() => {
    return dayjs().isBetween(start, end)
  }, [start, end])

  useEffect(() => {
    dispatch(actions.startrekPlanets())
  }, [dispatch])

  const handleOnChangePage = useCallback(
    (page) => {
      dispatch(actions.setStartrekPlanetsPage(page))
    },
    [dispatch],
  )

  const handleOnPlanetsUpdate = async () => {
    const planetLength = selected.length
    let result = await confirm({
      title: '?????????????????? ????????',
      message: `???? ???????????? ???????????????? ${planetLength} ${declOfNum(planetLength, [
        '??????????',
        '??????????',
        '????????',
      ])}, ???? ?????????? ${planetLength * 2000} RUB`,
      confirmText: '??????????????????????',
      confirmColor: 'danger',
      cancelText: '????????????',
      cancelColor: 'link text-muted',
    })

    if (result) {
      dispatch(actions.startrekPlanetsUpdate())
    }
  }

  const handleSelectAllOnPage = () => {
    dispatch(actions.toggleAllPlanetOnPage())
  }

  const rendererTimer = ({ hours, minutes, seconds }) => (
    <span>
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  )


  const [activePlanet, setActivePlanet] = useState(0)

  const [infoPlanet, setInfoPlanet] = useState({namePlanet: 'Mercury', frozen: '', comets: '', dateCreate: '', sum: '', id: ''})
  const [viewSolary, setViewSolary] = useState('')
  useEffect(()=>{
    list!==undefined&&setViewSolary( solaryList.filter((el,i)=>list[i]!==undefined))
    if (list!==undefined&&typeof list[0] !== 'undefined') {
      if(list[activePlanet]!==undefined) {
        setInfoPlanet({...infoPlanet, id: list[activePlanet].id, level: list[activePlanet].level, dateCreate: list[activePlanet].dateCreate, sum: list[activePlanet].sum})
      }
    }
  },[list, activePlanet])




  const [solaryList, setSolaryList]  = useState([{count: 0, namePlanet: 'Mercury', classItem:['mercury-line-1'], classPlanet: ['mercury active-planet'], classDescr: ['mercury-descr planet-descr'], descr: 'mercury'},
    {count: 1, namePlanet: 'Venus', classItem:['venus-line-1'], classPlanet: ['venus'], classDescr: ['venus-descr planet-descr'], descr: 'venus'},
    {count: 2, namePlanet: 'Earth', classItem:['earth-line-1'], classPlanet: ['earth'], classDescr: ['earth-descr planet-descr'], descr: 'earth'},
    {count: 3, namePlanet: 'Mars', classItem:['mars-line-1'], classPlanet: ['mars'], classDescr: ['mars-descr planet-descr'], descr: 'mars'},
    {count: 4, namePlanet: 'Jupiter', classItem:['jupiter-line-1'], classPlanet: ['jupiter'], classDescr: ['jupiter-descr planet-descr'], descr: 'jupiter'},
    {count: 5, namePlanet: 'Saturn', classItem:['saturn-line-1'], classPlanet: ['saturn'], classDescr: ['saturn-descr planet-descr'], descr: 'saturn'},
    {count: 6, namePlanet: 'Urans', classItem:['urans-line-1'], classPlanet: ['urans'], classDescr: ['urans-descr planet-descr'], descr: 'urans'},
    {count: 7, namePlanet: 'Neptune', classItem:['neptune-line-1'], classPlanet: ['neptune'], classDescr: ['neptune-descr planet-descr'], descr: 'neptune'}
  ])





  useMemo(()=>{
    if (list!==undefined&&list[activePlanet] !== undefined) {
      setInfoPlanet({...infoPlanet, id: list[activePlanet].id, namePlanet: viewSolary[activePlanet].namePlanet , frozen: !list[activePlanet].frozen ? '????????':'??????', comets: list[activePlanet].comets, dateCreate: list[activePlanet].dateCreate, sum: list[activePlanet].sum, level: list[activePlanet].level})
    }
  },[list, activePlanet])

  let handleOnSetPlanetForUpdate = () => dispatch(actions.setPlanetForUpdate(infoPlanet.id))





  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <div className="root-page-header">
            <div className="root-page-header__left">
              <Button
                className="root-page-header__back"
                onClick={() => history.goBack()}
                color="link"
                size="lg"
              >
                <Icon iconName="back" />
              </Button>
            </div>
            <h1 className="root-page-title color-solar">?????? ?????????????????? ????????????????</h1>
            <div className="solar-list-info">
              <ul className="list-info-s">
                <li className='item-info-s'>
                  ?????? ??????????????: {infoPlanet.namePlanet}
                </li>
                <li className='item-info-s'>
                  ???: {infoPlanet.id}
                </li>
                <li className='item-info-s'>
                  ???????? ????????????????: {infoPlanet.dateCreate}
                </li>
                <li className='item-info-s'>
                  ??????????????: {infoPlanet.level}
                </li>
              </ul>
            </div>
          </div>








          {/* <div className="text-center">
            <h3>
              ????????-?????????????????? ????????????{' '}
              <strong>{user?.autoRefill ? '????????????????' : '??????????????????'}</strong>
            </h3>
            <Link to={r.settings}>????????????????</Link>
          </div> */}
          {/* <Spinner isLoading={isLoading}>
            <Row>
              {!isEmpty(list) ? (
                list.map((planet) => (
                  <Col key={planet.id} lg={6}>
                    <MyPlanetsElement planet={planet} />
                  </Col>
                ))
              ) : (
                <Col>
                  <h4 className="text-center mb-4 mt-4">?? ?????? ?????? ????????????</h4>
                </Col>
              )}
            </Row>
            {!isEmpty(list) && !isLoading && (
              <ReactPaginate
                forcePage={page}
                marginPagesDisplayed={1}
                activeClassName="active"
                pageCount={Math.ceil(total / limit)}

                onPageChange={(props) => handleOnChangePage(props.selected)}
                containerClassName="pagination"
                previousLabel={<img src={arrowLeft} className="arrowLeft" alt="Arrow left" />}
                nextLabel={<img src={arrowRight} className="arrowRight" alt="Arrow right" />}
              />
            )}
          </Spinner> */}
          {/* <div className="text-center mt-5 mb-5">
            {!isEmpty(selected) &&
              (isDisable && end ? (
                <div className="mb-5">
                  <p>
                    ?? ???????????? ???????????? ???????????????????????????? ???????????? ??????????, <br /> ?????????????????? ?????????????? ??????????
                    ?????????? ???????????????? ?? 10:00 ???? ??????
                  </p>
                  <div>
                    ????????????????: <Timer date={end.format()} renderer={rendererTimer} />
                  </div>
                </div>
              ) : (
                <Button
                  color="primary"
                  onClick={handleOnPlanetsUpdate}
                  disabled={isUpdateLoading}
                  loading={isUpdateLoading}
                >
                  ???????????????? ??????????????????
                </Button>
              ))}
            {!isLoading && (
              <div className="mt-3">
                <Button color="primary" onClick={handleSelectAllOnPage}>
                  {selected.length !== list.length ? '??????????????' : '????????????'} ??????
                </Button>
              </div>  list
            )}
          </div> */}










          {!isEmpty(list) ?
            <div className='solry-all-block'>
              <div className='solary-card'>
                <div className='solary-block'>
                  <div className="wrapper-solary">
                    <div className="sun">

                    </div>

                    {viewSolary.map((e,i)=>
                      <div className={e.classItem.join` `}><div className={e.classPlanet.join` `}><p className={e.classDescr.join` `}>{list[i].values}</p></div></div>
                    )}
                  </div>
                </div>
              </div>
              <div className="planets-block">
                <ul className="planets-list" onClick={handleOnSetPlanetForUpdate}>
                  {viewSolary.map(e=><li className='planet-btn-item'><button className={'planet-btn'} id={e.count} onClick={e=>{setActivePlanet(e.target.id)}}>{e.namePlanet}</button></li>)}
                </ul>
                {!isLoading && (
                  <div className="mt-3 btn-clear-block">
                    <btn className="btn-clear-space" onClick={handleSelectAllOnPage}>
                      {selected.length !== list.length ? '??????????????' : '????????????'} ??????
                    </btn>
                  </div>
                )}
                {!isEmpty(selected) &&
                <div className='update-planet-block'>
                  <button
                    onClick={handleOnPlanetsUpdate}
                    disabled={isUpdateLoading}
                    loading={isUpdateLoading}
                    className={'btn-clear-space'}
                  >
                    ???????????????? ??????????????????
                  </button>
                </div>
                }
              </div>
            </div>

            :
            <Col>
              <h4 className="text-center mb-4 mt-4">?????????????????? ???????????????? ???? ????????????????????????</h4>
            </Col>
          }

        </Col>

      </Row>

    </Container>
  )
}

export default MyPlanets
