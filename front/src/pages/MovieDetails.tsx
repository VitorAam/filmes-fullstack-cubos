import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetails } from "../types/movie";
import { getMovieById } from "../services/api";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { DetailsHeader } from "../components/DetailsHeader";
import { MovieInfo } from "../components/MovieInfo";

export default function MovieDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetails | null>(null);

    useEffect(() => {
        async function fetchMovie() {
            if (!id) return;
            try {
                const data = await getMovieById(id);
                setMovie(data);
            } catch (error) {
                console.error("Erro ao buscar filme:", error);
            }
        }

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <Heading size="lg">Carregando detalhes...</Heading>;
    }

    return (
        <Flex maxW={'1305px'} mx={'auto'} gap={'16px'} p={{ base: '16px', md: '32px' }} w={'full'} flexDir={'column'} alignItems={'center'}  >
            <Box display={{ base: 'inline', lg: 'none' }} backgroundImage={movie.previewUrl} mx={'center'} backgroundSize={'cover'} backgroundPosition={'center'} w={'382px'} h={'582px'} maxW={'full'} />
            <DetailsHeader id={movie.id} title={movie.title} />

            <Flex gap={4} w={'full'} >
                <Box display={{ base: 'none', lg: 'inline' }} backgroundImage={movie.previewUrl} mx={'center'} backgroundSize={'cover'} backgroundPosition={'center'} minW={'374px'} maxW={'374px'} minH={'542px'} maxH={'542px'} />
                <MovieInfo data={movie} />
            </Flex>
        </Flex>
    );
}
