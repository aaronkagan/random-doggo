import "./assets/stylesheets/App.css";
import { useEffect, useState } from "react";
import getRandomFact from "./functions/getRandomFact";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { AppBar, Avatar, CardContent, CardMedia } from "@mui/material";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";

import Container from "@mui/material/Container";

// Modal
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// END Modal

function App() {
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // END Modal

  const [doggo, setDoggo] = useState(null);
  const [doggoFact, setDoggoFact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDoggoPic = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDoggo(data["message"]);
        setIsLoading(true);
      });
  };

  const fetchDoggoFact = () => {
    setDoggoFact(getRandomFact());
    // fetch("https://dog-api.kinduff.com/api/facts")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setDoggoFact(data["facts"][0]);
    //   });
  };

  useEffect(() => {
    fetchDoggoPic();
    fetchDoggoFact();
  }, []);

  return (
    <div className="App">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AppBar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          {/* <Toolbar sx={{ display: "flex", justifyContent: "spaceBetween" }}> */}

          <Typography
            variant="h5"
            sx={{
              marginLeft: "1rem",
              fontFamily: "'Kdam Thmor Pro', sans-serif;",
            }}
          >
            Doggo Randomizer
          </Typography>
          {/* <Box sx={{ width: "20vw" }} /> */}
          <a
            href="https://www.linkedin.com/in/aaron-kagan/"
            target="_blank"
            rel="noreferrer"
            sx={{ marginRight: "0" }}
          >
            <Avatar
              alt="Aaron Kagan"
              src={require("./assets/images/me.jpeg")}
              sx={{ marginRight: "1rem" }}
            />
          </a>
          {/* </Toolbar> */}
        </AppBar>

        <Card
          sx={{
            width: "90vw",
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            marginTop: "5rem",
          }}
        >
          {isLoading ? (
            <>
              <CardMedia
                component="img"
                alt="doggo"
                image={doggo}
                height="300"
                sx={{ width: "300px", objectFit: "cover" }}
                onClick={handleOpen}
              />
            </>
          ) : (
            <Skeleton
              variant="rectangle"
              animation="wave"
              height={300}
              width={300}
              onClick={handleOpen}
            />
          )}
          <CardContent sx={{ maxWidth: "300px" }}>
            <Typography
              align="center"
              variant="h5"
              gutterBottom={true}
              sx={{ fontFamily: "'Kdam Thmor Pro', sans-serif;" }}
            >
              Fun Doggo Fact
            </Typography>
            <Typography align="center" variant="body1">
              {JSON.stringify(doggoFact)}
            </Typography>
          </CardContent>
        </Card>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {isLoading ? (
                <>
                  <CardMedia
                    component="img"
                    alt="doggo"
                    image={doggo}
                    height="300"
                    sx={{ width: "300px", objectFit: "cover" }}
                  />
                </>
              ) : (
                <Skeleton
                  variant="rectangle"
                  animation="wave"
                  height={300}
                  width={300}
                />
              )}
            </Box>
          </Modal>
        </div>

        <Button
          sx={{
            marginTop: "3vh",
            fontFamily: "'Kdam Thmor Pro', sans-serif;",
          }}
          variant="contained"
          startIcon={<PetsOutlinedIcon />}
          onClick={() => {
            fetchDoggoPic();
            fetchDoggoFact();
          }}
        >
          Next Doggo
        </Button>
      </Container>
    </div>
  );
}

export default App;
