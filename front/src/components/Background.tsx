import { Box, Flex } from "@chakra-ui/react"
import { memo, useEffect, useState } from "react"

export const Background = memo(() => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = '/background.webp';
        img.onload = () => setIsLoaded(true);
    }, []);

    return (
        <Flex flexDir="column" position="fixed" zIndex={-1}>
            <Box w="100vw" h="50svh" position="relative" bgColor={'mauve.1'}>
                <Box
                    w={"100%"}
                    h={"100%"}
                    backgroundImage={"url('/background.webp')"}
                    backgroundPosition="center"
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    transition={"opacity 0.5s ease-in-out"}
                    opacity={isLoaded ? 1 : 0}
                    zIndex={0}
                />
                <Box
                    w={"100%"}
                    h={"100%"}
                    bgGradient="linear(to-b, mauve.1, backgroundLayer, mauve.1)"
                    position="absolute"
                    top={0}
                    left={0}
                    zIndex={1}
                    pointerEvents={"none"}
                />
            </Box>
            <Box bgColor="mauve.1" w="100svw" h="100svh" />
        </Flex>
    )
})