import { Layout } from "antd";

const { Content } = Layout;

// const wallet = typeof window.ethereum;
const { ethereum } = typeof window;
console.log("ethereum", ethereum);

const Contents = () => {
  return (
    <Content style={{display: 'flex', width: '100%', height: '600px'}}>
      AAA
    </Content>
  );
}
 
export default Contents;