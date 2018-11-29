// 这个是 home ui 组件
import React from 'react';
// import { Injector } from 'ts-di';
// import { Injector } from '/path/to/node_modules/ts-di/dist/index.js';
// import { Text, View } from 'react-native';
import './Home.scss';
import { StickyContainer, Sticky } from 'react-sticky';
import { SearchBar, Grid, WingBlank, Carousel } from 'antd-mobile';
import Footer from '../../components/Footer/index';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const HomeUI = (props) => {
  const data = props.entries.map((item, index) => ({
    icon: `https://fuss10.elemecdn.com/${item.image_hash}.jpeg`,
    text: item.name,
  }));
  setTimeout(() => {
    console.log(props.position)
  }, 0);
  return (
    <div className="home">
      <div className="elm-home">
          <CSSTransition
          in={props.flag}
          timeout={1000}
          classNames="ho"
          unmountOnExit
          onClick={props.cfjclick}
          >
          <div className="cfj-choose" >
              <div className="cfj-address-choose"><span>></span><h3>选择收货地址</h3></div>
              <div className="cfj-choose-citylist">
                <div className="choose">选择城市</div>
                <div className="cfj-seach-city"><SearchBar placeholder="请输入地址" /></div>
              </div>
              <ul className="citylist">
                <li></li>
              </ul>
            </div>
          </CSSTransition>
          <div className="cfj-header">
          <div className="cfj-adress" onClick={props.cfjclick}><i className="iconfont icon-location"></i>{props.position.ad_info && props.position.ad_info.district}</div>
          </div>
          <div className="cfj-seach"><SearchBar placeholder="搜索饿了么商家，商品名称" /></div>
          <WingBlank style={{"touchAction":"none"}}>
            <div className="cfj-home-activity">
            <Grid data={data}
              columnNum={5}
              isCarousel
              dotStyle={{ "width": 10, "height": 3 }}
              dotActiveStyle={{ "width": 10, "height": 3, "background": "blue" }}
              infinite
              hasLine={false}
              renderItem={dataItem => (
                <NavLink to="/DeliciousFood">
                  <div>
                    <img src={dataItem.icon} style={{ width: '45px', height: '45px' }} alt="" />
                    <div style={{ color: '#888', fontSize: '12px', marginTop: '10px' }}>
                      <span>{dataItem.text}</span>
                    </div>
                  </div>
                </NavLink>
              )}
            />
              {/* <Grid data={data && data} isCarousel dotStyle={{ "width": 10, "height": 3 }} dotActiveStyle={{ "width": 10, "height": 3, "background": "blue" }} infinite hasLine={false} columnNum={5} /> */}
            </div>
          </WingBlank>
            {/* <Sticky>
              {({ style,wasSticky}) =>(
                <SearchBar style={{...style,background:"#0085ff",paddingBottom:6}} placeholder="搜索饿了么商家，商品名称" />
              )}
            </Sticky> */}
          <div className="cfj-banner">
            <WingBlank style={{"touchAction":"none"}}>
              <Carousel autoplay={true} autoplayInterval={1000} infinite dotStyle={{ "width": 10, "height": 3 }} dotActiveStyle={{ "width": 10, "height": 3, "background": "blue" }}>
                {/* <Carousel autoplay infinite autoplayInterval={1000}> */}
                {props.banner.map((item,index) => (
                    <img
                      key={index}
                      src={`https://fuss10.elemecdn.com/${item.image_hash}.jpeg`}
                      alt=""
                      style={{ width: '100%', verticalAlign: 'top' }}
                      onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                      }}
                    />
                ))}
              </Carousel>
            </WingBlank>
          </div>
        <StickyContainer>
          <div className="cfj-recommend">
            <div className="cfj-recommend-tit">推荐商家</div>
            <Sticky>
              {({ style }) => (
                <ul style={{ ...style, zIndex: 99, height: 40, top: 40,display:"flex",textAlign:"center",justifyContent:"space-around",lineHeight:"40px",background:"#FFF",borderBottom:"1px solid #ddd" }}>
                  <li>综合排序</li>
                  <li>距离最近</li>
                  <li>品质联盟</li>
                  <li>筛选<i className="iconfont icon-shaixuan"></i></li>
                </ul>
              )}
              {/* <div className="cfj-recommend-title">
              </div> */}
            </Sticky>
            <div className="cfj-recommend-list">
              <ul>
                {props.restaurant.map((item,index) =>(
                  // <NavLink to={`/details/${item.restaurant.id}/0`}>
                  <NavLink key={index} to={{ pathname: `/details/${item.id}/0`, search: `?lat=${props.position.location && props.position.location.lat}&lng=${props.position.location && props.position.location.lng}`}}>
                    <li>
                      <div className="shopinfo">
                        <div className="shopimg">
                          <img src={`https://fuss10.elemecdn.com/${item.image_path}.${/jpeg/.test(item.image_path) === true ? 'jpeg' : 'png'}`} alt="" />
                        </div>
                        <div className="shopbody">
                          <h3 className="shopname">{item.name}</h3>
                          <div className="shopnum">
                            <span style={{ "width": item.rating * 12 }}><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="/></span>
                            <span className="ppp">{item.rating}</span>
                            <span>月售{item.recent_order_num}单</span>
                            <div style={{ "background": `#${item.delivery_mode && item.delivery_mode.gradient.rgb_to}`}}>{item.delivery_mode && item.delivery_mode.text}</div>
                          </div>
                          <div className="shopprice">
                            <div>￥{item.piecewise_agent_fee.rules[0].price}起送|{item.piecewise_agent_fee.tips}</div>
                            <div>{(item.distance/1000).toFixed(2)}km  |  {item.order_lead_time}分钟</div>
                          </div>
                        </div>
                      </div>
                      <div className="shopactive">
                        <div className="shoptag">
                          <span style={{ "border": "1px solid #999" }}>{item.support_tags[0].text}</span><span style={{ "border": item.support_tags[1] && "1px solid #999"}}>{item.support_tags[1] && item.support_tags[1].text}</span>
                        </div>
                        <div className="nowactive">
                          <span style={{ "background": `#${item.activities[0] && item.activities[0].icon_color}` }}>{item.activities[0] && item.activities[0].icon_name}</span>
                          {item.activities[0] && item.activities[0].description}
                        </div>
                        <div className="nowactive">
                          <span style={{ "background": `#${item.activities[1] && item.activities[1].icon_color}`}}>{item.activities[1] && item.activities[1].icon_name}</span>
                          {item.activities[1] && item.activities[1].description}
                        </div>
                      </div>
                    </li>
                  </NavLink>
                ))}

              </ul>
            </div>
          </div>
        </StickyContainer>
      </div>
      <Footer></Footer>
    </div>
    )
}
export default HomeUI;