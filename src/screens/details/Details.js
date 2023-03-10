import {
    GridList,
    GridListTile,
    GridListTileBar,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import Header from "../../common/header/Header";
import "./Details.css";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";

const starIconsInitial = [
    {
        id: 1,
        stateId: "star1",
        color: "black",
    },
    {
        id: 2,
        stateId: "star2",
        color: "black",
    },
    {
        id: 3,
        stateId: "star3",
        color: "black",
    },
    {
        id: 4,
        stateId: "star4",
        color: "black",
    },
    {
        id: 5,
        stateId: "star5",
        color: "black",
    },
];

const videoStyle = {
    height: "300",
    width: "700",
    playerVars: {
        autoplay: 1,
    },
};

const movieInitial = {
    genres: [],
    trailer_url: "",
    artists: [],
};

const Details = (props) => {

    const [movie, setMovie] = useState(movieInitial);
    const [starIcons, setStarIcons] = useState(starIconsInitial);
    const [value, setValue] = React.useState(0);
    const [loggedInStatus, setLoggedInStatus] = useState(false);

    useEffect(() => {
        const loggedInUser = (sessionStorage.getItem("access-token") == null ? false : true);
       
        if (loggedInUser) {
          setLoggedInStatus(true);
        }
      }, []);

    const getMovie = async () => {
        try {

            const response = await fetch(`${props.baseUrl}movies/${props.match.params.id}`);
            const data = await response.json();
            
            setMovie(data);
            
        } catch (e) {
            console.error(e.toString);
        }
    };

    useEffect(() => {
        getMovie();
    }, []);

    const starClickHandler = (id) => {
        let starIconList = [];
        for (let star of starIcons) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = "yellow";
            } else {
                starNode.color = "black";
            }
            starIconList.push(starNode);
        }
        setStarIcons(starIconList);
    };

    return (
        <div>
            <Header 
            id={props.match.params.id}
            movieId={movie.uuid}
            baseUrl={props.baseUrl}
            showBookShowButton loggedInStatus></Header>

            <div className="back-button">
                <Typography component="span">
                    <Link to="/"> &#60; Back to Home</Link>
                </Typography>
            </div>
            <div className="flex-container-details">
                <div className="details-page-left">
                    <img src={movie.poster_url} alt=""/>
                </div>
                <div className="details-page-middle">
                    <div>
                        <Typography variant="headline" component="h2">
                            <span>{movie.title}</span>
                        </Typography>
                    </div>
                    <br />
                    <div>
                        <Typography><span className="bold">
                            Genres:{(movie.genres.join(", "))}
                        </span>
                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">
                            Duration:{movie.duration}</span>
                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">
                            Release Date:{new Date(movie.release_date).toDateString()}</span>
                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">
                            Rating:{movie.critics_rating}</span>
                        </Typography>
                    </div>
                    <div className="marginTop16">
                        <Typography><span className="bold">
                            Plot:<a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline}</span>
                        </Typography>
                    </div>
                    <div className="trailerContainer">
                        <Typography>
                            <span className="bold">
                                Trailer:</span>
                        </Typography>
                                <YouTube
                                    videoId={String(movie.trailer_url).split("?v=")[1]}
                                    opts={videoStyle}
                                    onReady={this._onReady}
                                />                        
                    </div>

                </div>
                <div className="details-page-right floatRight">
                    <Typography>
                        <span className="bold">Rate this movie:</span>
                        <Rating
                            defaultValue={0}
                            emptyIcon={
                                <StarBorderIcon fontSize="inherit" color="white" />
                            }
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Typography>


                    <Typography className="bold marginBottom16 marginTop16" >
                        <span className="bold">Artists:</span>
                        <GridList cellHeight={160} cols={2}>
                            {movie.artists != null &&
                                movie.artists.map((artist) => (
                                    <GridListTile
                                        className="gridTile"
                                        key={artist.id}
                                    >
                                        <img
                                            src={artist.profile_url}
                                            alt={artist.first_name + " " + artist.last_name}
                                        />
                                        <GridListTileBar
                                            title={artist.first_name + " " + artist.last_name}
                                        />
                                    </GridListTile>
                                ))}
                        </GridList>
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default Details;