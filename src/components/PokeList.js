import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Stack } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PokeType } from './PokeType';

const styles = {
    container: {
        padding: "0!important",
        marginBottom: "2rem"
    },
    search: {
        position: "relative",
        backgroundColor: "gray",
        paddingY: "2rem",
    },
    pokeBox: {
        backgroundColor: "white",
        backgroundImage: "url('/images/container_bg.png')",
        paddingBottom: "1rem"
    },
    textSearch: {
        position: "absolute",
        zIndex: 10,
        color: "white",
        left: "50%",
        transform: 'translateX(-50%)',
        bottom: "-1rem",
        backgroundColor: "gray",
        width: "40%",
        textAlign: "center",
        paddingBottom: "0.5rem",
        fontSize: 20,
        "&:after": {
            content: '""',
            position: "absolute",
            bottom: "-1px", right: 0,
            width: 0,
            borderTop: "17px solid transparent",
            borderRight: "60px solid white"
        },
        "&:before": {
            content: '""',
            position: "absolute",
            bottom: "-1px", left: 0,
            width: 0,
            borderTop: "17px solid transparent",
            borderLeft: "60px solid white"
        }
    },
    pokeContainer: {
        margin: "auto!important",
        paddingTop: "2rem",
        backgroundColor: "white",
        position: "relative",
        backgroundColor: "white"
    },
    foot: {
        position: "absolute",
        content: "''",
        width: "calc(100% - 1rem)",
        margin: "auto",
        height: "2.5rem",
        backgroundColor: "white",
        left: 0,
        bottom: "-2.5rem",
        right: 0,
        "&:after": {
            position: "absolute",
            content: "''",
            width: 0,
            borderBottom: "0.5rem solid transparent",
            borderRight: "0.5rem solid white",
            bottom: 0,
            top: 0,
            left: "-0.5rem",
            border: "none"
        },
        "&:before": {
            position: "absolute",
            content: "''",
            borderBottom: "0.5rem solid transparent",
            borderLeft: "0.5rem solid white",
            top: 0,
            bottom: 0,
            right: "-0.5rem",
            border: "none"
        }
    },
    loadmore: {
        height: "2rem",
        backgroundColor: "blue",
        margin: "1rem auto",
        backgroundColor: "#30a7d7",
        color: "#fff",
        ":hover": {
            backgroundColor: "#1b82b1",
        }
    }
}

export default function PokeList() {
    const [pokemons, setPokemons] = useState([])
    const [page, setPage] = useState(1)
    const [next, setNext] = useState(false)

    useEffect(() => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/pokemons?page=${page}`
        console.log(url)
        try {

            const fetchPokemons = async () => {
                const res = await fetch(url)
                const data = await res.json()
                console.log(data)
                setPokemons([...pokemons, ...data.data])
            }
            fetchPokemons()
        } catch (err) {
            console.log(err)
        }
    }, [page])



    return (
        <Container maxWidth="lg" sx={styles.container}>
            <Box sx={styles.search}>
                <Box sx={styles.textSearch} >Show Advanced Search</Box>
            </Box>
            <Box sx={styles.pokeBox}>
                {pokemons.length && (<InfiniteScroll
                    style={{ paddingBottom: "1rem", overflow: "visible!important" }}
                    dataLength={pokemons.length}
                    next={() => setPage(page + 1)}
                    hasMore={next}
                    loader={<Container maxWidth="md" sx={{ backgroundColor: "white", textAlign: "center", height: "2.5rem" }} > <img className='loading' src="./images/pokeball_gray.png" /></Container>}
                >
                    <Grid container maxWidth="md" sx={styles.pokeContainer} spacing={{ xs: 0, md: 3 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}  >

                        {pokemons.map(pokemon => (
                            <Grid sx={{ display: "flex", justifyContent: "center", paddingLeft: "0!important" }} item xs={12} sm={6} md={4} lg={3} key={pokemon.Name}>
                                <Card sx={{ width: "12rem", height: "19rem" }} elevation={0}>
                                    <div style={{ backgroundColor: "#F2F2F2", borderRadius: 5, padding: 30 }}>
                                        <CardMedia
                                            component="img"
                                            image={`${pokemon.url}`}
                                            alt="Paella dish"
                                            sx={{ margin: "auto", objectFit: "contain", width: "100%", borderRadius: 5 }}
                                        />
                                    </div>
                                    <CardContent sx={{ paddingBottom: 0 }}>
                                        <Typography variant='small' color="gray">#{`00${pokemon.index}`.slice(-3)}</Typography>
                                        <Typography variant="h5" >
                                            {pokemon.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing sx={{ padding: "1rem" }}>
                                        <Stack direction="row" spacing={1}>
                                            {pokemon.types.map(type => <PokeType type={type} />)}
                                        </Stack>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        <Grid sx={{ textAlign: "center" }} item xs={12} sm={12} md={12} >
                            <Box sx={{ ...styles.foot, bottom: next ? "-5rem" : "-2.5rem" }}></Box>
                            <Button sx={{ ...styles.loadmore, display: next ? "none" : "inline-block" }} onClick={() => setNext(true)}>Load more Pokémon</Button>
                        </Grid>
                    </Grid >
                </InfiniteScroll>)}

            </Box>
        </Container>)
}


