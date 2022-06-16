import "./assets/stylesheets/App.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";

function App() {
  const [doggo, setDoggo] = useState();

  const fetchData = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDoggo(data["message"]);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Card variant="outlined">
        <img src={doggo}></img>
        <Button variant="contained" onClick={fetchData}>
          Next Doggo
        </Button>
      </Card>
    </div>
  );
}

export default App;
