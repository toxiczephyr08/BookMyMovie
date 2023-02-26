import { Checkbox, FormControl, Input, InputLabel, ListItemText, MenuItem, Select } from "@material-ui/core";
import React from "react";
import Header from "../../common/header/Header";
import ReleasedMovieGridList from "../releasedMoviesGridList/ReleasedMovieGridList";
import UpcomingMovies from "../upcomingMovies/UpcomingMovies";
import UpcomingMoviesGridList from "../upcomingMoviesGridList/UpcomingMoviesGridList";


const Home = (props) => {
    const [personName, setPersonName] = React.useState([]);

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
      ];

      

      const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    return (
        <div>
            <Header baseUrl={props.baseUrl}></Header>
            <UpcomingMovies></UpcomingMovies>
            <UpcomingMoviesGridList baseUrl={props.baseUrl}></UpcomingMoviesGridList>
            <ReleasedMovieGridList baseUrl={props.baseUrl}></ReleasedMovieGridList>
            <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </div>
    );
};

export default Home;