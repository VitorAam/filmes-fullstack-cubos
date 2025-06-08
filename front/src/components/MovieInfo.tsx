import { Box, Flex, Text } from "@chakra-ui/react";
import type { MovieDetails } from "../types/movie";
import { InfoContainer } from "./InfoContainer";
import { GradeGraphic } from "./GradeGraphic";
import { currencyInput, hourAndMinutesInput, orderedDate, thousandSeparator } from "../utils/input-masks";

interface MovieInfoProps {
    data: MovieDetails;
}

export const MovieInfo = ({ data }: MovieInfoProps) => {
    return (
        <Flex flexDir="column" gap={6} w="full">
            <Flex
                alignItems="center"
                flexDir={{ base: "column-reverse", md: "row" }}
                justifyContent="space-between"
                gap={6}
            >
                <Box w="full">
                    <Text
                        color="mauve.12"
                        fontStyle="italic"
                        textAlign={{ base: "center", md: "left" }}
                    >
                        {data.description}
                    </Text>
                </Box>
                <Flex
                    alignItems="center"
                    gap={4}
                    justifyContent={{ base: "center", md: "flex-end" }}
                >
                    <InfoContainer title="popularidade" info={thousandSeparator(String(data.popularity))} />
                    <InfoContainer title="votos" info={thousandSeparator(String(data.votes))} />
                    <GradeGraphic grade={data.grade} mobileSize />
                </Flex>
            </Flex>
            <Flex w="full" wrap={'wrap'} gap={4} justifyContent={{base:'center', lg: 'start'}} >
                <Flex flexDir="column" gap={4} maxW={'416px'} >
                    <InfoContainer title="sinopse" info={data.synopsis} />
                    <InfoContainer title="gêneros" info={data.genres} type="genres" />
                </Flex>

                <Flex flexDir="column" gap={4} w={'full'} maxW={'416px'} >
                    <Flex justifyContent={'flex-end'} flexDir={{ base: "column", md: "row" }} gap={4} flexWrap="wrap">
                        <InfoContainer maxW="200px" title="lançamento" info={orderedDate(data.launch)} desktopSize="full" />
                        <InfoContainer maxW="200px" title="duração" info={hourAndMinutesInput(data.duration)} desktopSize="full" />
                    </Flex>
                    <Flex justifyContent={'flex-end'} flexDir={{ base: "column", md: "row" }} gap={4} flexWrap="wrap">
                        <InfoContainer maxW="200px" title="situação" info={data.status} desktopSize="full" />
                        <InfoContainer maxW="200px" title="idioma" info={data.language} desktopSize="full" />
                    </Flex>
                    <Flex justifyContent={'flex-end'} flexDir={{ base: "column", md: "row" }} gap={4} flexWrap="wrap">
                        <InfoContainer maxW="128px" title="orçamento" info={currencyInput(String(data.budget))} desktopSize="full" />
                        <InfoContainer maxW="128px" title="receita" info={currencyInput(String(data.revenue))} desktopSize="full" />
                        <InfoContainer maxW="128px" title="lucro" info={currencyInput(String(data.revenue - data.budget))} desktopSize="full" />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};