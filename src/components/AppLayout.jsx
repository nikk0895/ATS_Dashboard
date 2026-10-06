// src/components/AppLayout.jsx
import { Layout, Avatar, Button, Space, Typography } from "antd";
import { Outlet } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const { Header, Content } = Layout;
const { Text } = Typography;

export default function AppLayout() {
  const { instance, accounts } = useMsal();
  const account = instance.getActiveAccount() || accounts[0];
  const name = account?.name || "User";
  const email = account?.username || "";

  const handleLogout = () =>
    instance.logoutRedirect({
      account,
      postLogoutRedirectUri: "http://localhost:5173/login",
    });

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
        <span style={{ color: "#F5F6FA", fontWeight: 600, fontSize: 18 }}>
          ATS Dashboard
        </span>

        <Space size={12}>
          <Avatar style={{ background: "#1a56db" }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <Text style={{ color: "#F5F6FA", fontWeight: 500 }}>{name}</Text>
            <Text style={{ color: "#AEB6CC", fontSize: 12 }}>{email}</Text>
          </div>
          <Button onClick={handleLogout}>Sign out</Button>
        </Space>
      </Header>

      <Content style={{ padding: "32px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <Outlet />
      </Content>
    </Layout>
  );
}