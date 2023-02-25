import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import "./UpcomingMoviesGridList.css"
import { withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";

const styles = {
    root: {
        flexWrap: "nowrap"
      }
    };

const UpcomingMoviesGridList = (props) => {

    const { baseUrl, classes } = props;
    
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        const getUpcomingMovies = async () => {
          const response = await fetch(
            `${baseUrl}movies?PUBLISHED`
          );
          const data = await response.json();
          setUpcomingMovies(data.movies);
        };
    
        getUpcomingMovies();
        
      }, []);

      
    return (

        <div >
            <GridList cols={5} cellHeight={250} className={classes.root + " grid-list"} >
                {upcomingMovies.map((movie) => (
                    <GridListTile key={"upcoming" + movie.id} >
                        <img src={movie.poster_url} alt={movie.title} />
                        <GridListTileBar
                            title={movie.title}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
};


export default withStyles(styles)(UpcomingMoviesGridList);