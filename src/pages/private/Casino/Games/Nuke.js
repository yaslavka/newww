import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../../constants/routes.constants'
import NUKEWORLd from '../uploads/games/Nuke-World.jpg'
function NUKEWORLD() {
  return (
    <div className="wrapp">
      <div className="grid-wrapp">
        <div className="grid-col__left">
          <div className="mainsu">
            <div className="con cnt-pt">
              <div className="grid-wrapp">
                <div className="grid-wrapp-cols pd-sm-both game-listen">
                  <div className="grid-col__4-12">
                    <div className="tmbv">
                      <i className="stickerc"/>
                      <div className="tmb-fav">
                        <div className="icoc icoc-tmb-fav"/>
                      </div>
                      <Link to={routes.blaac}>
                        <div className="tmb-img">
                          <img src={NUKEWORLd} height="1%"  alt={""}/>
                        </div>
                        <div className="tmb-title">NUKE WORLD</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NUKEWORLD
