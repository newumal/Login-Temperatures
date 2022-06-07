import React, {useCallback, useEffect, useState} from "react";
import {Typography, Card, Col, Row, Divider, Empty, Button, Skeleton, List} from 'antd';
import styles from './index.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getWeatherList} from "../../features/weatherSlice";
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';


const { Title } = Typography;

const LoginTempList = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [weatherDataList1, setWeatherDataList1] = useState([]);
    const [weatherDataList2, setWeatherDataList2] = useState([]);
    const [hasData, setHasData] = useState(false);

    const {weather, isSuccess} = useSelector((state) => state.weather);

    useEffect(() => {
        loadMoreData();
    },[]);

    const loadMoreData = () => {
        dispatch(getWeatherList());
    };

    useEffect(() => {
        if (data.length > 0){
            setHasData(true);
            const newWeatherListOne =Array.isArray(data) ? data.filter((item) => item?.city !== "COLOMBO"): [];
            const newWeatherListTwo =Array.isArray(data) ? data.filter((item) => item?.city !== "MELBOURNE") : [];
            setWeatherDataList1(newWeatherListOne);
            setWeatherDataList2(newWeatherListTwo);
        }
        setData(weather);
    }, [isSuccess, weather]);

    const getFormattedDateTime = (date) => {
        const d = new Date(date);
        return moment(d).format('LLLL');
    }

    const convertToCelsius= (temp) => {
        return Math.round(+temp - 273.15);
    };

    const convertToFahrenheit= (temp) => {
        return Math.round(1.8*(+temp-273) + 32);
    };


    const ListContent = useCallback((weatherData) => (
        <div
            id="scrollableDiv"
            style={{
                height: '30vh',
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <InfiniteScroll
                dataLength={weatherData.length}
                next={loadMoreData}
                hasMore={weatherData.length < 1}
                loader={
                    <Skeleton
                        avatar
                        paragraph={{
                            rows: 1,
                        }}
                        active
                    />
                }
                endMessage={<Divider plain>It is all, nothing more</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={weatherData}
                    renderItem={(item) => (
                        <List.Item key={item.time}>
                            <Row justify="start">
                                {/*Wed, 6 July 2022 , 10.48 pm*/}
                                {/*{item.time}*/}
                                {getFormattedDateTime(item?.time)}
                            </Row>
                            <div>
                                <Typography>{`${convertToCelsius(item?.temperature)} ℃ `}</Typography>
                            </div>
                            <div>
                                <Typography>{`${convertToFahrenheit(item?.temperature)} ℉ `}</Typography>
                            </div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
        ), [weather]);



    return(
      <div style={{ height: '65vh'}}>
          <div>
              <Title level={4} style={{ color: "dodgerblue" }}>Login Temperatures</Title>
          </div>
          <Divider />
          <div className={styles.buttons_row}>
              <div className={styles.buttons}>
                  <Button type="primary">Hottest First</Button>
                  <div className={styles.reset_button}>
                      <Button danger>Reset Order</Button>
                  </div>
              </div>
          </div>
          <div className="site-card-wrapper">
              <Row gutter={16}>
                  <Col span={12}
                       style={{
                      height: '55vh',
                  }}>
                      <Card title="Colombo" bordered={true}>
                          { hasData ? ListContent(weatherDataList2):
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                          }
                      </Card>
                  </Col>
                  <Col span={12}
                       style={{
                           height: '55vh',
                       }}>
                      <Card title="Melbourne" bordered={true}>
                          { hasData ? ListContent(weatherDataList1):
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                          }
                      </Card>
                  </Col>
              </Row>
          </div>

      </div>
    );
}

export default LoginTempList;