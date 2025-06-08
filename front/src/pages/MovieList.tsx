import { Flex, InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react';
import { MovieCardContainer } from '../components/MovieCardContainer';
import { CustomInput } from '../components/CustomInput';
import { SecondaryButton } from '../components/Buttons/SecondaryButton';
import { PrimaryButton } from '../components/Buttons/PrimaryButton';
import Search from '../components/Icons/Search';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AddMovieDrawer } from '../components/Drawers/AddMovieDrawer';
import { getMoviesPaginated } from '../services/api';
import type { MovieCardSummary } from '../types/movie';

export default function MovieListPage() {
    const { isDark } = useContext(ThemeContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const data = await getMoviesPaginated({
                    page: 1,
                    pageSize: 10,
                    // você pode passar filtros aqui se quiser, ex:
                    // minDuration: 60,
                    // maxDuration: 180,
                    // startDate: '2024-01-01',
                    // endDate: '2024-12-31',
                });

                setMovies(
                    data.map((movie: MovieCardSummary) => ({
                        id: movie.id,
                        title: movie.title,
                        grade: movie.grade,
                        genres: movie.genres,
                        imgUrl: movie.previewUrl,
                    }))
                );
            } catch (error) {
                console.error("Erro ao buscar filmes paginados:", error);
            }
        }

        fetchMovies();
    }, []);


    return (
        <>
            <Flex flexDir={'column'} w={'full'}>
                <Flex flexDir={{ base: 'column', md: 'row' }} gap={'10px'} w={'full'} justifyContent={'end'} p={{ base: '16px', md: '24px' }} >
                    <Flex w={'full'} maxW={'488px'}>
                        <InputGroup>
                            <CustomInput placeholder={'Pesquise por filmes'} w={'full'} />
                            <InputRightElement _hover={{ cursor: 'pointer' }}>
                                <Search color={isDark ? '#B5B2BC' : '#121113'} />
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                    <Flex w={{ base: 'full', md: 'max-content' }} gap={{ base: '2px', md: '10px' }} >
                        <SecondaryButton w={{ base: 'full', md: '85px' }} h={'44px'} >
                            <Text>Filtros</Text>
                        </SecondaryButton>
                        <PrimaryButton onClick={() => onOpen()} w={{ base: 'full', md: '151px' }} h={'44px'}>
                            <Text>Adicionar Filme</Text>
                        </PrimaryButton>
                    </Flex>
                </Flex>
                <MovieCardContainer movieCards={movies} />
            </Flex>

            <AddMovieDrawer title="" isOpen={isOpen} onClose={onClose}>{<></>}</AddMovieDrawer >
        </>
    );
}