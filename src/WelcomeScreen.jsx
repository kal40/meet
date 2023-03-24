import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import meetLogo from "./logo192.png";

function WelcomeScreen(props) {
  return props.showWelcomeScreen ? (
    <Row className="WelcomeScreen justify-content-center text-center">
      <Stack gap={5}>
        <Image src={meetLogo} alt="Meet Logo" className="mx-auto mb-2 mt-5" />
        <h1 className="fw-bold">Welcome to the Meet app</h1>
        <h4>
          Log in to see upcoming events around the world for full-stack
          developers
        </h4>
        <Button
          className="mx-auto"
          variant="secondary"
          onClick={() => {
            props.getAccessToken();
          }}
          rel="nofollow noopener"
        >
          <Image
            className="rounded me-2"
            height={30}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google sign-in"
          />
          <b>Sign in with google</b>
        </Button>
        <a
          href="https://meet.smartcoder.dev/privacy.html"
          rel="nofollow noopener"
        >
          Privacy policy
        </a>
      </Stack>
    </Row>
  ) : null;
}
export default WelcomeScreen;
