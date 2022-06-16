import "./assets/stylesheets/App.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { AppBar, CardContent, CardMedia } from "@mui/material";
import Container from "@mui/material/Container";

function App() {
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
    fetch("https://dog-api.kinduff.com/api/facts")
      .then((response) => response.json())
      .then((data) => {
        setDoggoFact(data["facts"][0]);
      });
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
        <Typography align="center" variant="h5" gutterBottom={true}>
          Doggo Randomizer
        </Typography>

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
          }}
        >
          {isLoading ? (
            <CardMedia
              component="img"
              alt="doggo"
              image={doggo}
              height="300"
              sx={{ width: "300px", objectFit: "cover" }}
            />
          ) : (
            <Skeleton
              variant="rectangle"
              animation="wave"
              height={300}
              width={300}
            />
          )}
          <CardContent sx={{ maxWidth: "300px" }}>
            <Typography align="center" variant="h5" gutterBottom={true}>
              Fun Doggo Fact
            </Typography>
            <Typography align="center" variant="body1">
              {JSON.stringify(doggoFact)}
            </Typography>
          </CardContent>
        </Card>
        <Button
          sx={{ marginTop: "3vh" }}
          variant="contained"
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
