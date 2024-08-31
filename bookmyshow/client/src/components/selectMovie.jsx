import React from "react";

import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SelectMovie = (props) => {
  const { mainHeading, items, selectedValue, onClick } = props;
  return (
    <Container className="container-fluid ContainerStyle">
      <Row className="gx-4">
        <Col xs={12} md={12}>
          <h4 className="ContainerHeading">{mainHeading}</h4>
          <ButtonGroup
            aria-label="Basic outlined example"
            className="d-inline-block mt-3"
          >
            {items.map((item, i)=>(
              <React.Fragment key={i}>
                <button
                  type="button"
                  className={
                    item === selectedValue
                      ? "btn btn-success btn-active shadow-none"
                      : "btn btn-outline-secondary "
                  }
                  style={{
                    marginRight: "15px",
                    marginBottom: "19px",
                    borderRadius: "7px",
                  }}
                  onClick={() => onClick(item)}
                >
                  {item}
                </button>
              </React.Fragment>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default SelectMovie;
