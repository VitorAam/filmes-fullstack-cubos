import { Box, Flex, Text } from "@chakra-ui/react"
import { MovieCard, type MovieCardProps } from "./Cards/MovieCard"

interface MovieCardContainerProps {
    movieCards: MovieCardProps[]
}

export const MovieCardContainer = ({ movieCards }: MovieCardContainerProps) => {
    return (
        <Flex justifyContent={'center'} maxW={'1322px'} borderRadius={'4px'} flexWrap={'wrap'} m={'auto'} p={{ base: '16px', md: '24px' }} bgColor={'mauveAlpha.3'} gap={{ base: '16px', md: '24px' }} >
            {movieCards.length < 1 ? (
                <Box color={'mauve.12'} >
                    <Text fontWeight={600} fontSize={'32px'} >Nenhum filme por aqui ainda.</Text>
                    <Text>Que tal ser o primeiro a adicionar um filme? Ou tente ajustar seus filtros e busca.</Text>
                </Box>) : movieCards.map((movie) => {
                    return <MovieCard genres={movie.genres} grade={movie.grade} id={movie.id} imgUrl={movie.imgUrl} title={movie.title} key={movie.id} />
                })
            }
        </Flex >
    )
}