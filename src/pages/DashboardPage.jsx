// src/pages/DashboardPage.jsx
import { Layout, Typography, Button, Card, Row, Col, Avatar, Space } from "antd";
import { useMsal } from "@azure/msal-react";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const modules = [
  { title: "CV Evaluation", desc: "AI-assisted scoring of candidate CVs against a role." },
  { title: "Sourcing Reuse", desc: "Find past candidates who fit new openings." },
  { title: "Interview Guidance", desc: "Generate structured interview questions." },
];

export default function DashboardPage() {
  const { instance, accounts } = useMsal();
  const account = instance.getActiveAccount() || accounts[0];
  const name = account?.name || "there";
  const email = account?.username;

  const handleLogout = () => {
    instance.logoutRedirect({
      account,
      postLogoutRedirectUri: "http://localhost:5173/login",
    });
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#F5F6FA" }}>
      <Header
        style={{
          background: "#101B33",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
        }}
      >
        <span style={{ color: "#F5F6FA", fontWeight: 600, fontSize: 18 }}>TA Tool</span>
        <Space size={16}>
          <Avatar style={{ background: "#1a56db" }}>{name.charAt(0).toUpperCase()}</Avatar>
          <Text style={{ color: "#AEB6CC" }}>{email}</Text>
          <Button onClick={handleLogout}>Sign out</Button>
        </Space>
      </Header>

      <Content style={{ padding: "48px 32px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <Title level={2} style={{ marginBottom: 4 }}>
          Welcome, {name}
        </Title>
        <Text type="secondary">Choose a module to get started.</Text>

        <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
          {modules.map((m) => (
            <Col xs={24} md={8} key={m.title}>
              <Card hoverable title={m.title}>
                <Text type="secondary">{m.desc}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
}