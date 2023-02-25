import React from "react";
import Header from "../../common/header/Header";
import Details from "../details/Details";
import ReleasedMovieGridList from "../releasedMoviesGridList/ReleasedMovieGridList";
import UpcomingMovies from "../upcomingMovies/UpcomingMovies";
import UpcomingMoviesGridList from "../upcomingMoviesGridList/UpcomingMoviesGridList";

const Home = (props) => {

    return (
        <div>
            <Header baseUrl={props.baseUrl}></Header>
            <UpcomingMovies></UpcomingMovies>
            <UpcomingMoviesGridList baseUrl={props.baseUrl}></UpcomingMoviesGridList>
            <ReleasedMovieGridList baseUrl={props.baseUrl}></ReleasedMovieGridList>
        </div>
    );
};

export default Home;