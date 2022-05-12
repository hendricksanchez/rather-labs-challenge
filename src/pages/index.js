import { Layout } from "antd";
import Headers from '../components/Header';
import Contents from "../components/Contents";

const Index = () => {
  return (
    <Layout style={{ display: "flex" }}>
      <Headers />
      <Contents />
    </Layout>
  );
};

export default Index;
