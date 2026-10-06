// src/pages/LoginPage.jsx
import { useState } from "react";
import { Row, Col, Typography, Button, Alert, Space } from "antd";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

const { Title, Text } = Typography;

// Simple inline Microsoft logo (4-color squares) — avoids pulling in an icon
// pack just for one brand mark.
function MicrosoftLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

export default function LoginPage() {
  const { instance, inProgress } = useMsal();
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    setError(null);
    try {
      await instance.loginRedirect(loginRequest);
      // Browser navigates away here; code after this line won't run
      // unless the redirect fails before leaving the page.
    } catch (err) {
      if (err instanceof InteractionRequiredAuthError) {
        setError("Additional sign-in step required. Please try again.");
      } else {
        // UI-007: actionable, non-technical, no stack trace shown to the user
        setError("We couldn't start sign-in. Please try again or contact IT support.");
      }
    }
  };

  const isBusy = inProgress !== InteractionStatus.None;

  return (
    <Row style={{ minHeight: "100vh" }}>
      {/* Left: brand panel */}
      <Col
        xs={0}
        md={12}
        style={{
          background: "linear-gradient(160deg, #101B33 0%, #1B2C52 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          color: "#F5F6FA",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: 0.2 }}>
          TA Tool
        </div>

        <div style={{ maxWidth: 420 }}>
          <Title level={2} style={{ color: "#F5F6FA", marginBottom: 16 }}>
            Evaluate candidates consistently. Keep the final call human.
          </Title>
          <Text style={{ color: "#AEB6CC", fontSize: 15, lineHeight: 1.7 }}>
            AI-assisted CV evaluation, sourcing reuse, and interview guidance —
            with every recommendation open for your team to review.
          </Text>
        </div>

        <Text style={{ color: "#6E7A99", fontSize: 13 }}>
          Internal use only · Talent Acquisition
        </Text>
      </Col>

      {/* Right: sign-in panel */}
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          background: "#FFFFFF",
        }}
      >
        <div style={{ width: "100%", maxWidth: 360 }}>
          <Title level={3} style={{ marginBottom: 4 }}>
            Sign in
          </Title>
          <Text type="secondary">
            Use your organization account to continue.
          </Text>

          <Space direction="vertical" size={16} style={{ width: "100%", marginTop: 32 }}>
            {error && (
              <Alert
                type="error"
                message={error}
                showIcon
                closable
                onClose={() => setError(null)}
              />
            )}

            <Button
              size="large"
              onClick={handleSignIn}
              loading={isBusy}
              block
              icon={<MicrosoftLogo />}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                height: 46,
                fontWeight: 500,
              }}
            >
              {isBusy ? "Redirecting…" : "Sign in with Microsoft"}
            </Button>

            <Text type="secondary" style={{ fontSize: 13 }}>
              Access is provisioned by your administrator. If you don't have
              access yet, contact your TA system admin.
            </Text>
          </Space>
        </div>
      </Col>
    </Row>
  );
}
