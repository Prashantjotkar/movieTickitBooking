import React from "react";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SelectSeats = (props) => {
  const { mainHeading, seats, items, onChange, submitBooking } = props;
  return (
    <>
      <Container className="container-fluid ContainerStyle">
        <Row className="gx-4">
          <Col xs={12} md={12}>
            <h4 className="ContainerHeading">{mainHeading}</h4>
            <ButtonGroup
              aria-label="Basic outlined example"
            >
              {items.map((item, i) => (
                <Col lg={2} md={2} xs={6} sm={3} key={i}>
                  <div className="seatWrapper">
                    <label htmlFor={`seat-${item}`}>{`Type ${item}`}</label>
                    <input
                      type="number"
                      name={item.toLowerCase()}
                      onChange={(e) => onChange(e)}
                      value={seats && seats[item.toLowerCase()]}
                      id={`seat-${item}`}
                      max="30"
                      min="0"
                      placeholder="0"
                    />
                  </div>
                </Col>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <div className="book-button" onClick={submitBooking}>
            <button>Book now</button>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SelectSeats;
