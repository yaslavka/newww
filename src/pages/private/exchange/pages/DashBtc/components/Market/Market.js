import React from 'react'
import Result from '../result'
import Viewport from '../marketlist'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { Button } from 'react-bootstrap'
import cl from './../../../../Exchange.module.css';
const Market = () => {
  return (
    <div className="left_bar">
      <div className="market_box">
        <div className="all_title title">Маркет</div>
        <div>
          <div >
            <div className={cl.marketBtns}>
              <Button href="javascript:void(0)" value="top" onClick="changeMarketBase('top')">
                TOP
              </Button>
              <Button href="javascript:void(0)" value="btc" onClick="changeMarketBase('btc')">
                BTC
              </Button>
              <Button href="javascript:void(0)" value="eth" onClick="changeMarketBase('eth')">
                ETH
              </Button>
              <Button
                href="javascript:void(0)"
                value="usd"
                onClick="changeMarketBase('usd')"
                className="manimr"
              >
                USD
              </Button>
              <Button href="javascript:void(0)" value="rur" onClick="changeMarketBase('rur')">
                RUR
              </Button>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
      <Result />
      <SimpleBar style={{ height: 150, width: '100%' }}>
        <Viewport />
      </SimpleBar>
    </div>
  )
}
export default Market
