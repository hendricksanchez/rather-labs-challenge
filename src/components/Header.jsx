import { Button, Layout, Menu, Row } from 'antd';
import 'antd/dist/antd.css';
import Image from 'next/image';

const { Header } = Layout;

const Headers = () => {
  return (
    <Header style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', padding: '0'}}>
      <Row style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 'max-content'}}>
        <Image src={'/logo.png'} width={35} height={35} />
        <Menu mode="horizontal" style={{width:'100%'}}>
          <Menu.Item key="aboutUs">
            About Us
          </Menu.Item>
          <Menu.Item key="ourWork">
            Our Work
          </Menu.Item>
        </Menu>
        <Button type='primary'>Connect</Button>
      </Row>
    </Header>
  );
}
 
export default Headers;