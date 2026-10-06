// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { Typography, Card, Row, Col, Alert } from "antd";
import { useMsal } from "@azure/msal-react";
import useApi from "../api/useApi";

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

  const api = useApi();
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    api
      .get("/api/me")
      .then((me) => setApiStatus({ ok: true, text: `API verified you as ${me.email}` }))
      .catch((e) => setApiStatus({ ok: false, text: e.message }));
  }, [api]);

  return (
    <>
      <Title level={2} style={{ marginBottom: 4 }}>
        Welcome, {name}
      </Title>
      <Text type="secondary">Choose a module to get started.</Text>

      {apiStatus && (
        <Alert
          style={{ marginTop: 16 }}
          type={apiStatus.ok ? "success" : "error"}
          message={apiStatus.text}
          showIcon
        />
      )}

      <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
        {modules.map((m) => (
          <Col xs={24} md={8} key={m.title}>
            <Card hoverable title={m.title}>
              <Text type="secondary">{m.desc}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}