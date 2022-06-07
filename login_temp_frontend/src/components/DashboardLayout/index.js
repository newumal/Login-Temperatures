import React, {useEffect} from "react";
import {Layout,Typography, Avatar, Image, Menu } from 'antd';
import styles from './index.module.scss'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../../features/authSlice";

import {
    LoginOutlined,
    UserOutlined,
} from '@ant-design/icons';
import LoginTempList from "../LoginTempList";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const headItems = [
    {
        key: 'profile',
        icon: <Avatar style={{ backgroundColor: '#3ea0f1', marginLeft:"10px" }} icon={<UserOutlined />} />,
        children: [
            {
                key: 'setting:1',
                label: 'Logout',
                icon: <LoginOutlined />,
                danger: true
            }
        ]
    }
];

const DashboardLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user){
            navigate('/login');
        }
    }, [user]);

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    const onClick = (e) => {
        if (e.key === 'setting:1'){
            onLogout()
        }
    };

  return(
      <div className="App">
          <Layout
              style={{
              minHeight: '100vh',
          }}>
              <Header style={{ display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "space-between"}}>
                  <div style={{ display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "center"}}>
                      <Image style={{ borderRadius: "2px"}}
                          width={40}
                          preview={false}
                          src="temp.png"
                      />
                      <Title level={5} style={{ color: "white", marginLeft:"20px"}}>Login Temperature App</Title>
                  </div>
                  <div>
                      <Menu theme={"dark"} onClick={onClick} selectedKeys={[]} mode="horizontal" items={headItems} />
                  </div>
              </Header>
              <Layout>
                  <Layout>
                      <Layout>
                          <Content style={{ padding: '0 30px' }}>
                              <div style={{ margin: '16px 0' }}>
                              </div>
                              <div className={styles.site_layout_content}>
                                  <div>
                                      <LoginTempList />
                                  </div>
                              </div>
                          </Content>
                          <Footer style={{ textAlign: 'center' }}>LTA©2022 Created by Newumal Weerasinghe </Footer>
                      </Layout>
                  </Layout>
              </Layout>
          </Layout>
      </div>
  )
}

export default DashboardLayout