import Loader from "./Loader";
import React from "react";

const LastBooking = (props) => {
  const {
    lastBookingPresent,
    seat,
    timing,
    movieName,
    errorMsg,
    loading,
    finishLoading,
  } = props;


  const seatNumbers = [
    {
      label: "A1",
      key: "a1",
    },
    {
      label: "A2",
      key: "a2",
    },
    {
      label: "A3",
      key: "a3",
    },
    {
      label: "D1",
      key: "d1",
    },
    {
      label: "D2",
      key: "d2",
    },
  ];
  return (
    <div className="LastBooking">
      <h4 className="ContainerHeading">Last Booking Details</h4>
      {loading ? (
        <Loader />
      ) : (
        <>
          {finishLoading && lastBookingPresent === false && errorMsg && (
            <div>
              <h3 className="error_msg fs-4">{errorMsg}</h3>{" "}
              {/* Display a message when no previous booking is found */}
            </div>
          )}

          {finishLoading && lastBookingPresent && (
            <div className="details-container">
              <div className="heading_details">Seats:</div>
              <div className="booked_seat_wrapper">
                {/* map function for seat label */}
                {seatNumbers.map(({ label, key }) => (
                  
                  <div className="d-flex align-items-center" key={key}>
                    <span className="booking_seat_sp">{`${label}:`}</span>
                    {seat && seat[key] ? (
                      <span className="seat_booked">{`${seat[key]}`}</span>
                    ) : (
                      <span className="seat_booked">{``}</span>
                    )}
                  </div>

                ))

                }
              </div>

              <div>
                <span className="heading_details">Slot:</span>{" "}
                <span className="seat_b">{timing}</span>
              </div>
              <div>
                <span className="heading_details ">Movie:</span>{" "}
                <span className="name_movie">{movieName}</span>
              </div>
            </div>
           )} 
        </>
      )}
    </div>
  );
};

export default LastBooking;
