import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReleasedMovieFilterForm from "../ReleasedMovieFilterForm/ReleasedMovieFilterForm";
import "./ReleasedMovieGridList.css"
import { withRouter } from "react-router-dom";

const ReleasedMovieGridList = (props) => {

    const [releasedMovies, setReleasedMovies] = useState([]);

    useEffect(() => {
        const getReleasedMovies = async () => {
            const response = await fetch(
                `${props.baseUrl}movies?status=RELEASED`
            );
            const data = await response.json();
            setReleasedMovies(data.movies);
        };

        getReleasedMovies();

    }, []);
    

    const movieClickHandler = (movieId) => {
        props.history.push("/movie/" + movieId);
      };

      const movieFilterHandler = (movieData) => {      
            setReleasedMovies(movieData);
      };

    return (
        <div>
            <div>
                <GridList className="flex-container released-movie-grid" cols={4} cellHeight={350}>
                    {releasedMovies.map((movie) => (
                        <GridListTile key={"released" + movie.id}
                            onClick={() => movieClickHandler(movie.id)}>
                            <img className="change-pointer" src={movie.poster_url} alt={movie.title} />
                            <GridListTileBar
                                title={movie.title}
                                subtitle={
                                    <span>
                                        Release Date:{" "}
                                        {new Date(movie.release_date).toDateString()}
                                    </span>}
                            />
                        </GridListTile>
                    ))}
                </GridList>
                <ReleasedMovieFilterForm baseUrl={props.baseUrl} onMovieFilter={movieFilterHandler}></ReleasedMovieFilterForm>
            </div>

        </div>
    );

};

export default withRouter(ReleasedMovieGridList);