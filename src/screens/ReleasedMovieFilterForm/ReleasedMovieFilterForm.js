import { Input, TextField, Button, InputLabel, MenuItem, Checkbox, ListItemText, Select, withStyles, FormControl } from "@material-ui/core";
import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ReleasedMovieFilterForm.css";

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240,
    },
    title: {
        color: theme.palette.primary.light,
    },
});

const ReleasedMovieFilterForm = (props) => {

    const [movieName, setMovieName] = useState("");
    const [releaseDateStart, setReleaseDateStart] = useState("");
    const [releaseDateEnd, setReleaseDateEnd] = useState("");
    const [movieFilterData, setMovieFilterData] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [artistsList, setArtistsList] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);

    useEffect(() => {
        const getGenresList = async () => {
            const response = await fetch(
                `${props.baseUrl}genres`
            );
            const data = await response.json();
            setGenresList(data.genres);
        };

        getGenresList();

    }, []);


    useEffect(() => {
        const getArtistsList = async () => {
            const response = await fetch(
                `${props.baseUrl}artists`
            );
            const data = await response.json();
            setArtistsList(data.artists);
        };

        getArtistsList();

    }, []);

    const genreSelectHandler = (event) => {
        const value = event.target.value;
        
        setSelectedGenres(value);
        //setChecked(event.target.checked);
    };

    const artistSelectHandler = (event) => {
        setSelectedArtists(event.target.value);
    };

    const movieNameHandler = (event) => {
        setMovieName(event.target.value);
    }

    const releaseDateStartHandler = (event) => {
        setReleaseDateStart(event.target.value);
    }

    const releaseDateEndHandler = (event) => {
        setReleaseDateEnd(event.target.value);
    }

    const movieFilterApplyHandler = async () => {
        let queryString = "?status=RELEASED";
        if (movieName !== "") {
            queryString += "&title=" + movieName;
        }
        if (selectedGenres.length > 0) {
            queryString += "&genre=" + selectedGenres.toString();
        }
        if (selectedArtists.length > 0) {
            queryString += "&artists=" + selectedArtists.toString();
        }
        if (releaseDateStart !== "") {
            queryString += "&start_date=" + releaseDateStart;
        }
        if (releaseDateEnd !== "") {
            queryString += "&end_date=" + releaseDateEnd;
        }
        const response = await fetch(`${props.baseUrl}movies${encodeURI(queryString)}`);
        const data = await response.json();
        if (response.status === 200) {
            setMovieFilterData(data.movies);
            props.onMovieFilter(data.movies);
        }
    };

    return (
        <div float="right">
            <Card className="movie-filter-container">
                <CardContent>
                    <FormControl className={props.classes.formControl}>
                        <Typography className={props.classes.title} component="span" >
                            FIND MOVIES BY:
                        </Typography>

                        <FormControl className={props.classes.formControl}>
                            <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                            <Input className="label"
                                id="standard-basic"
                                variant="standard"
                                onChange={movieNameHandler}></Input>
                        </FormControl>

                        <FormControl className={props.classes.formControl}>
                            <InputLabel id="mutiple-select-label" htmlFor="select-multiple-checkbox">Genres</InputLabel>
                            <Select
                                labelId="mutiple-select-label"
                                multiple
                                value={selectedGenres}       
                                onChange={genreSelectHandler}  
                                renderValue={(selected) => selected.join(", ")}       
                            >
                                {genresList.map((genre) => (
                                    <MenuItem key={genre.id}
                                        value={genre.genre}>
                                        <Checkbox
                                            checked={selectedGenres.indexOf(genre.genre) > -1}/>
                                        <ListItemText
                                            primary={genre.genre} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className={props.classes.formControl}>
                            <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                            <Select
                                multiple
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={(selected) => selected.join(",")}
                                value={selectedArtists}
                                onChange={artistSelectHandler}
                            >
                                {artistsList.map((artist) => (
                                    <MenuItem key={artist.id}
                                        value={artist.first_name + " " + artist.last_name}>
                                        <Checkbox
                                            checked={
                                                selectedArtists.indexOf(
                                                    artist.first_name + " " + artist.last_name
                                                ) > -1
                                            } />
                                        <ListItemText
                                            primary={artist.first_name + " " + artist.last_name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl >
                            <TextField
                                id="releaseDateStart"
                                label="Release Date Start"
                                type="date"
                                defaultValue=""
                                InputLabelProps={{ shrink: true }}
                                onChange={releaseDateStartHandler}

                            /><br />
                        </FormControl>

                        <FormControl >
                            <TextField
                                id="releaseDateEnd"
                                label="Release Date End"
                                type="date"
                                defaultValue=""
                                InputLabelProps={{ shrink: true }}
                                onChange={releaseDateEndHandler}
                            />
                        </FormControl><br /><br />

                        <FormControl >
                            <Button variant="contained" color="primary" onClick={movieFilterApplyHandler}>
                                APPLY
                            </Button>
                        </FormControl>
                    </FormControl>
                </CardContent>
            </Card>
        </div>
    );
};

export default withStyles(styles)(ReleasedMovieFilterForm);