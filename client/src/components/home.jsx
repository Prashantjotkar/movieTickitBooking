import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectMovie from "./selectMovie";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { movies, seats, slots } from "./data";
import SelectTimeSlot from "./selectTimeSlot";
import SelectSeats from "./selectSeat";
import LastBooking from "./lastBoookingDetails";
import React, { useEffect, useState } from "react";
import LocalStorage from "./localStorage";
import axios from "axios";

export default function Home() {
  const initialState = {
    movie: "",
    seats: {
      a1: 0,
      a2: 0,
      a3: 0,
      a4: 0,
      d1: 0,
      d2: 0,
    },
    slots: "",
  };

  const [state, setState] = LocalStorage("state", initialState);
  const [lastBooking, setLastBooking] = useState({
    movie: "",
    slots: "",
    dataPresent: false,
    isFinishLoading: false,
    isLoading: false,
    error: null,
    seats: {
      a1: 0,
      a2: 0,
      a3: 0,
      a4: 0,
      d1: 0,
      d2: 0,
    },
  });

  useEffect(() => {
    setLastBooking({ isFinishLoading: false });
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    axios
      .get(`${backendUrl}/getDetails/`)
      .then((res) => {
        if (res.data.message === "string") {
          setLastBooking({
            ...lastBooking,
            error: res.data.message,
            isFinishLoading: true,
            dataPresent: false,
          });
        } else if (res.data.data) {
          let { movie, slot, seats } = res.data.data;

          setLastBooking({
            ...lastBooking,
            movie: movie,
            slots: slot,
            error: null,
            isFinishLoading: true,
            dataPresent: true,
            seats: {
              a1: seats.A1 ? seats.A1 : 0,
              a2: seats.A2 ? seats.A2 : 0,
              a3: seats.A3 ? seats.A3 : 0,
              a4: seats.A4 ? seats.A4 : 0,
              d1: seats.D1 ? seats.D1 : 0,
              d2: seats.D2 ? seats.D2 : 0,
            }

          });
        } else {
          setLastBooking({
            ...lastBooking,
            isFinishLoading: true,
            dataPresent: true,
          });
        }
      })
      .catch((error) => {
        setLastBooking({
          ...lastBooking,
          dataPresent: false,
          isFinishLoading: true,
        });
      });
  }, []);

  const movieSelection = (item) => {
    setState((preState) => ({
      ...preState,
      movie: item,
    }));
  };

  const seatSelection = (e) => {
    setState({
      ...state,
      seats: {
        ...state.seats,
        [e.target.name]: e.target.value,
      },
    });
  };

  const slotSelection = (item) => {
    setState((preState) => ({
      ...preState,
      slots: item,
    }));
  };


  const submitBooking = (e) => {
    const { movie, slots, seats } = state;
    // Validation
    const notSelectedAnySeat = Object.values(seats).every(
      (field) => field === 0
    );

    if (movie === "") {
      enqueueSnackbar("Please Select a movie", { variant: "error" });
      return;
    } else if (slots === "") {
      enqueueSnackbar("Please Select a time slot", { variant: "error" });
      return;
    } else if (notSelectedAnySeat) {
      enqueueSnackbar("Please Select Atleast one seat", { variant: "error" });
      return;
    }

    setLastBooking({
      ...lastBooking,
      isLoading: true,
    });

    const backendUrl1 = process.env.REACT_APP_BACKEND_URL;

    // post request
    axios
      .post(`${backendUrl1}/getDetails/`, {
        movie: state.movie,
        slot: state.slots,
        seats: {
          A1: Number(state.seats.a1),
          A2: Number(state.seats.a2),
          A3: Number(state.seats.a3),
          A4: Number(state.seats.a4),
          D1: Number(state.seats.d1),
          D2: Number(state.seats.d2),
        },

      })
      .then((res) => {
        if (res.status === 200) {
          //set state in last bookings details
          setLastBooking({
            ...lastBooking,
            movie: state.movie,
            slots: state.slots,
            dataPresent: true,
            isFinishLoading: true,
            isLoading: false,
            seats: {
              a1: state.seats.a1,
              a2: state.seats.a2,
              a3: state.seats.a3,
              a4: state.seats.a4,
              d1: state.seats.d1,
              d2: state.seats.d2,
            },
          });
          setState({
            ...state,
            movie: "",
            slots: "",
            dataPresent: false,
            iSFinishLoading: false,
            seats: {
              a1: 0,
              a2: 0,
              a3: 0,
              a4: 0,
              d1: 0,
              d2: 0,
            },
          });
        }
        enqueueSnackbar("Booking successful!", { variant: "success" });

        setLastBooking({
          ...lastBooking,
          isLoading: false,
        });
      })
      .catch((error) => {
        setLastBooking({
          ...lastBooking,
          isLoading: false,
        });
        console.log(error);
      });

    return;
  };

  return (
    <Container className="mt-5 bg-custom">
      <SnackbarProvider />
      <h3 className="mb-5 ml-5">Book That Show !!</h3>
      <Row>
        <Col md={8} lg={8} sm={8} xs={12}>
          <SelectMovie
            mainHeading="Select a Movie"
            items={movies}
            selectedValue={state?.movie}
            onClick={movieSelection}
            display="block"
          />
          {/* Movies Container */}
          <SelectTimeSlot
            mainHeading="Select a Time"
            items={slots}
            selectedValue={state?.slots}
            onClick={slotSelection}
            display="block"
          />
          {/* Movies Container */}
          <SelectSeats
            mainHeading="Select a Seat"
            items={seats}
            type="number"
            selectedValue={state?.seats}
            onChange={seatSelection}
            display="block"
            submitBooking={submitBooking}
          />
        </Col>
        <Col md={4} lg={4} sm={4} xs={12} className="text-center">
          <LastBooking
            movieName={lastBooking.movie}
            finishLoading={lastBooking.isFinishLoading}
            timing={lastBooking.slots}
            seat={lastBooking.seats}
            lastBookingPresent={lastBooking.dataPresent}
            errorMsg={lastBooking?.error}
            loading={lastBooking.isLoading}
          />
        </Col>
      </Row>
    </Container>
  );
}
