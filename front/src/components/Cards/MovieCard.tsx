import { Box, Flex, Text } from "@chakra-ui/react";
import { GradeGraphic } from "../GradeGraphic";
import { useNavigate } from "react-router-dom";

export interface MovieCardProps {
    imgUrl: string;
    genres: Array<string>;
    title: string;
    grade: number;
    id: string;
}

export const MovieCard = ({ imgUrl, title, genres, grade, id }: MovieCardProps) => {
    const router = useNavigate()

    return (
        <Flex
            position="relative"
            flexDir="column"
            alignItems="center"
            justifyContent="flex-end"
            bgImage={`url(${imgUrl})`}
            backgroundSize="cover"
            backgroundPosition='center'
            backgroundRepeat="no-repeat"
            w={{ base: "183px", md: "235px" }}
            h={{ base: "281px", md: "355px" }}
            borderRadius="8px"
            overflow="hidden"
            cursor="pointer"
            sx={{
                "&:hover .gradeGraphic": {
                    opacity: 1,
                },
                "&:hover .genresText": {
                    maxHeight: "40px",
                    marginTop: "8px",
                },
            }}
            onClick={() => router(`/filmes/${id}`)}
        >
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                height="50%"
                bgGradient="linear(to-b, rgba(0,0,0,0), rgba(0,0,0,0.5), rgba(0,0,0,1))"
                zIndex={1}
            />
            <Flex
                position="relative"
                zIndex={2}
                flexDir={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"full"}
                h={"full"}
                p={4}
            >
                <Box
                    className={"gradeGraphic"}
                    opacity={0}
                    transition={"opacity 0.3s ease"}
                    my={'auto'}
                >
                    <GradeGraphic grade={grade} />
                </Box>

                <Box>
                    <Text
                        fontSize={"16px"}
                        fontWeight={600}
                        color={"rgba(238, 238, 238, 1)"}
                        mb={2}
                        textAlign={"start"}
                    >
                        {title.toUpperCase()}
                    </Text>
                    <Text
                        className={"genresText"}
                        color={"rgba(180, 180, 180, 1)"}
                        fontSize={"12px"}
                        textAlign={"start"}
                        maxHeight={0}
                        overflow={"hidden"}
                        transition={"max-height 0.3s ease, margin 0.3s ease"}
                    >
                        {genres.map((genre, index) => (
                            <Text as="span" key={genre}>
                                {index === 0 ? genre : ", " + genre}
                            </Text>
                        ))}
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
};