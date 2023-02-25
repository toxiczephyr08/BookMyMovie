import { Input, TextField, Button, InputLabel } from "@material-ui/core";
import { Card, CardContent, FormControl, Typography } from "@mui/material";
import React, { useState } from "react";
import "./ReleasedMovieFilterForm.css";

const ReleasedMovieFilterForm = (classes) => {

    const [movieName, setMovieName] = useState("");
    const [releaseDateStart, setReleaseDateStart] =useState("");
    const [releaseDateEnd, setReleaseDateEnd] =useState("");
    const [movieFilterData, setMovieFilterData] = useState();

    const movieNameHandler = (event) => {
        setMovieName(event.target.value);
    }

    const releaseDateStartHandler = (event) => {
        setReleaseDateStart(event.target.value);
    }

    const releaseDateEndHandler = (event) => {
        setReleaseDateEnd(event.target.value);
    }
    const movieFilterHandler = () => {
        const movieFilterInfo = {
            movieName: movieName,
            releaseDateStart : releaseDateStart,
            releaseDateEnd : releaseDateEnd
        };

        setMovieFilterData([movieFilterData]);

        console.log(movieFilterInfo);
    }

    return (
        <div float="right">
            <Card className="movie-filter-container">
                <CardContent>
                    <FormControl margin="theme.spacing.unit" sx={{ minWidth: 240, maxWidth: 240 }}>
                        <Typography color="theme.palette.primary.light" component="span" >
                            FIND MOVIES BY:
                        </Typography><br />

                        <FormControl >
                            <TextField className="label"
                                id="standard-basic"
                                label="Movie Name"
                                variant="standard"
                                onChange={movieNameHandler} /><br />
                        </FormControl>

                        <FormControl >
                            <Input id="genres"
                                placeholder="Generes" /><br />
                        </FormControl>

                        <FormControl >
                            <Input id="artists"
                                placeholder="Artists" /><br />
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
                            <Button variant="contained" color="primary" onClick={movieFilterHandler}>
                                APPLY
                            </Button>
                        </FormControl>
                    </FormControl>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReleasedMovieFilterForm;