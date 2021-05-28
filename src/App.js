import './App.css';
import Navbar from './Components/Navbar';
import React, { Fragment, useEffect, useState } from "react";
import { getMatches } from './api/Api';
import MyCard from './Components/MyCard';
import { Grid, Typography } from "@material-ui/core";

function App() 
{
  const [matches, setMatches] = useState([]);

  useEffect(() => 
  {
    getMatches().then((data) => setMatches(data.matches) )
                .catch((error) => alert("Could not load data!"));
  }, [])

  return (
    <div className="App">
      <Navbar />
      
      <Typography variant="h3" style={{ marginTop: 20 }}>Welcome to Live Score</Typography>
      
      <Grid container>
        <Grid item sm={2}></Grid>
        <Grid item sm={8}>
          {
            matches.map((match) => 
            { 
                return (<Fragment key={match.unique_id}>
                  { (match.type === "Twenty20") ? <MyCard match={match} />  : "" }
                </Fragment> )
            })
          }
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
