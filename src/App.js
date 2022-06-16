import "./assets/stylesheets/App.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { CardContent, CardMedia } from "@mui/material";

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
      <Card
        sx={{
          width: "90vw",
          display: "flex",
          flexDirection: "column",
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
    </div>
  );
}

export default App;
