import { Box, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { SecondaryButton } from "./Buttons/SecondaryButton";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { deleteMovie } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CustomModal } from "./Modal";
import type { MovieDetails } from "../types/movie";

interface DetailsHeaderProps {
    data: MovieDetails
    onEditClick: () => void
}

export const DetailsHeader = ({ data, onEditClick }: DetailsHeaderProps) => {
    const navigate = useNavigate();
    const toast = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteMovie(data.id);

            toast({
                title: "Filme deletado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/filmes");
        } catch (error) {
            onClose()
            console.error(error)
            toast({
                title: "Erro ao deletar filme.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Flex
            h="min-content"
            alignItems="center"
            w="full"
            justifyContent="space-between"
            flexDir={{ base: "column-reverse", md: "row" }}
            gap={2}
        >
            <Box textAlign={{ base: "center", md: "left" }}>
                <Text color="mauve.12" fontSize="32px" fontWeight={600}>
                    {data.title}
                </Text>
                <Text
                    fontSize={{ base: "14px", md: "16px" }}
                    color={{ base: "mauve.11", md: "mauve.12" }}
                >
                    Título original: {data.title}
                </Text>
            </Box>

            <Flex
                gap={{ base: 2, md: 4 }}
                w={{ base: "full", md: "max-content" }}
                justifyContent="center"
            >
                <SecondaryButton
                    maxW="91px"
                    fontWeight={400}
                    onClick={onOpen}
                    isLoading={isDeleting}
                >
                    <Text>Deletar</Text>
                </SecondaryButton>

                <PrimaryButton
                    w="full"
                    maxW={{ base: "283px", md: "82px" }}
                    onClick={onEditClick}
                >
                    <Text>Editar</Text>
                </PrimaryButton>
            </Flex>


            <CustomModal title={'Deletar filme?'} isOpen={isOpen} onClose={onClose}  >
                <Flex flexDir={'column'} gap={4} >
                    <Text>Você tem certeza que deseja prosseguir com a <Text as={'span'} color={'red.500'} fontWeight={600} >exclusão</Text> desse filme?</Text>
                    <Flex w={'full'} gap={2} justifyContent={'flex-end'} >
                        <SecondaryButton onClick={onClose} >
                            <Text>Cancelar</Text>
                        </SecondaryButton>
                        <PrimaryButton onClick={handleDelete} bgColor={'red.500'} _hover={{ bgColor: 'red.600' }} _active={{ bgColor: 'red.400' }} >
                            <Text>Excluir</Text>
                        </PrimaryButton>
                    </Flex>
                </Flex>
            </CustomModal>
        </Flex>
    );
};