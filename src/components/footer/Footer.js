import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-auto py-3 bg-light fixed-bottom">
      <Container>
        <Row>
          <Col>
            <p className="mb-0 text-center">
              © {new Date().getFullYear()} TesteFront
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="mb-0 text-center">
              Built by Igor Oliveira{' '} using  
              <a href="https://react-bootstrap.github.io/" target="_blank" rel="noopener noreferrer">
                Bootstrap
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
