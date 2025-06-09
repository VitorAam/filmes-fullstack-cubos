import { Flex, InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react';
import { MovieCardContainer } from '../components/MovieCardContainer';
import { CustomInput } from '../components/CustomInput';
import { SecondaryButton } from '../components/Buttons/SecondaryButton';
import { PrimaryButton } from '../components/Buttons/PrimaryButton';
import Search from '../components/CustomIcons/Search';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AddMovieDrawer } from '../components/Drawers/AddMovieDrawer';
import { getMoviesPaginated } from '../services/api';
import type { MovieCardSummary } from '../types/movie';
import { FilterModal } from '../components/Modals/FilterModal';
import type { FilterValues } from '../types/filter';
import { Pagination } from '../components/Pagination';


export default function MovieListPage() {
    const { isDark } = useContext(ThemeContext);
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
    const { isOpen: isFilterOpen, onOpen: onFilterOpen, onClose: onFilterClose } = useDisclosure();

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<FilterValues>({
        minDuration: undefined,
        maxDuration: undefined,
        startDate: '',
        endDate: '',
        genres: [],
    });

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const data = await getMoviesPaginated({
                    page,
                    pageSize: 10,
                    search: searchTerm,
                    minDuration: filters.minDuration,
                    maxDuration: filters.maxDuration,
                    startDate: filters.startDate,
                    endDate: filters.endDate,
                    genres: filters.genres,
                });

                setMovies(
                    data.movies.map((movie: MovieCardSummary) => ({
                        id: movie.id,
                        title: movie.title,
                        grade: movie.grade,
                        genres: movie.genres,
                        imgUrl: movie.previewUrl,
                    }))
                );

                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Erro ao buscar filmes paginados:", error);
            }
        }

        fetchMovies();
    }, [page, searchTerm, filters]);

    return (
        <>
            <Flex flexDir={'column'} w={'full'}>
                <Flex flexDir={{ base: 'column', md: 'row' }} gap={'10px'} w={'full'} justifyContent={'end'} p={{ base: '16px', md: '24px' }} >
                    <Flex w={'full'} maxW={'488px'}>
                        <InputGroup>
                            <CustomInput
                                placeholder="Pesquise por filmes"
                                w="full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <InputRightElement>
                                <Search color={isDark ? '#B5B2BC' : '#121113'} />
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                    <Flex w={{ base: 'full', md: 'max-content' }} gap={{ base: '2px', md: '10px' }} >
                        <SecondaryButton w={{ base: 'full', md: '85px' }} h={'44px'} onClick={onFilterOpen}>
                            <Text>Filtros</Text>
                        </SecondaryButton>
                        <PrimaryButton onClick={onAddOpen} w={{ base: 'full', md: '151px' }} h={'44px'}>
                            <Text>Adicionar Filme</Text>
                        </PrimaryButton>
                    </Flex>
                </Flex>
                <MovieCardContainer movieCards={movies} />
                {totalPages > 1 ? <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPage(newPage)}
                /> : null}
            </Flex>

            <AddMovieDrawer title="" isOpen={isAddOpen} onClose={onAddClose}>{<></>}</AddMovieDrawer>

            <FilterModal
                isOpen={isFilterOpen}
                onClose={onFilterClose}
                onApplyFilters={(newFilters) => setFilters(newFilters)}
            ><></></FilterModal>
        </>
    );
}