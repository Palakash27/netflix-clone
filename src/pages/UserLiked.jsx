import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikedMovies } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function UserLiked() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const movies = useSelector((state) => state.netflix.movies);

    const [email, setEmail] = useState(undefined);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            setEmail(currentUser.email);
        } else {
            navigate("/login");
        }
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (email) {
            dispatch(getUserLikedMovies(email));
        }
    }, [email, dispatch]);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true);
            return () => (window.onscroll = null);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [isScrolled]);

    return (
        <Container>
            <NavBar isScrolled={isScrolled} />
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {movies.map((movie, index) => {
                        return (
                            <Card
                                movieData={movie}
                                index={index}
                                key={movie.id}
                                isLiked={true}
                            />
                        );
                    })}
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    .content {
        margin: 2.3rem;
        margin-top: 8rem;
        gap: 3rem;
        h1 {
            margin-left: 3rem;
        }
        .grid {
            flex-wrap: wrap;
            gap: 1rem;
        }
    }
`;
