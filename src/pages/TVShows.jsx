import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";

export default function TVShows() {
    const [isScrolled, setIsScrolled] = useState(false);
    const dispatch = useDispatch();
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ type: "tv" }));
        }
    }, [genresLoaded]);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true);
            return () => (window.onscroll = null);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [isScrolled]);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        // if (!currentUser) {
        //     navigate("/login");
        // }
    });

    return (
        <Container>
            <div className="navbar">
                <NavBar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <SelectGenre genres={genres} type="tv" />
                {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
            </div>
        </Container>
    );
}

const Container = styled.div`
    .data {
        margin-top: 8rem;
        .not-available {
            text-align: center;
            color: white;
            margin-top: 4rem;
        }
    }
`;
