import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetails } from "../types/movie";
import { getMovieById, updateMovie } from "../services/api";
import { Box, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { DetailsHeader } from "../components/DetailsHeader";
import { MovieInfo } from "../components/MovieInfo";
import { EditMovieDrawer } from "../components/Drawers/EditMovieDrawer";
import type { MovieFormData } from "../schemas/movieSchema";
import { movieDetailsToFormData } from "../utils/helpers";

export default function MovieDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()

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

    const handleUpdateMovie = async (data: MovieFormData) => {
        try {
            const updatedMovie = await updateMovie(movie!.id, data);

            setMovie(updatedMovie);

            toast({
                title: "Filme atualizado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            onClose();
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro ao atualizar filme.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };


    if (!movie) {
        return null;
    }

    return (
        <>
            <Flex maxW={'1305px'} mx={'auto'} gap={'16px'} p={{ base: '16px', md: '32px' }} w={'full'} flexDir={'column'} alignItems={'center'}  >
                <Box display={{ base: 'inline', lg: 'none' }} backgroundImage={movie.previewUrl} mx={'center'} backgroundSize={'cover'} backgroundPosition={'center'} w={'382px'} h={'582px'} maxW={'full'} />
                <DetailsHeader data={movie} onEditClick={onOpen} />

                <Flex gap={4} w={'full'} >
                    <Box display={{ base: 'none', lg: 'inline' }} backgroundImage={movie.previewUrl} mx={'center'} backgroundSize={'cover'} backgroundPosition={'center'} minW={'374px'} maxW={'374px'} minH={'542px'} maxH={'542px'} />
                    <MovieInfo data={movie} />
                </Flex>
            </Flex>
            <EditMovieDrawer
                isOpen={isOpen}
                onClose={onClose}
                movieData={movieDetailsToFormData(movie)}
                onSubmit={handleUpdateMovie}
                title=""
            ><></></EditMovieDrawer>
        </>
    );
}
