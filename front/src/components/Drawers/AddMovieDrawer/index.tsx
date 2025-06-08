import type { ComponentProps } from "react";
import { CustomDrawer } from "../Drawer";
import { DrawerBody, DrawerFooter, Flex, useToast } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema } from "../../../schemas/movieSchema";
import type { MovieFormData } from "../../../schemas/movieSchema";
import { FormContainer } from "../../Form/FormContainer";
import { AddMovieFormFields } from "./AddMovieFormFields";
import { AddMovieFormFooter } from "./AddMovieFormFooter";
import { registerMovie } from "../../../services/api";

export const AddMovieDrawer = (props: ComponentProps<typeof CustomDrawer>) => {
    const formMethods = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: {
            genres: [],
            previewUrl: "",
            trailerUrl: "",
        },
    });

    const { handleSubmit, formState: { isSubmitting } } = formMethods;

    const toast = useToast()

    const onSubmit = async (data: MovieFormData) => {
        try {
            const { error } = await registerMovie(data);

            if (error) {
                throw new Error('Erro ao registrar o filme')
            }

            toast({
                title: 'Filme cadastrado com sucesso!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            props.onClose?.();
        } catch (error) {
            console.error("Erro ao enviar:", error);
        }
    };

    return (
        <CustomDrawer {...props} title={"Adicionar Filme"}>
            <FormProvider {...formMethods}>
                <FormContainer onSubmit={handleSubmit(onSubmit)} mx={0} w={'full'}>
                    <DrawerBody as={Flex} flexDir="column" gap="16px" py="16px">
                        <AddMovieFormFields />
                    </DrawerBody>

                    <DrawerFooter as={Flex} gap="16px">
                        <AddMovieFormFooter onClose={props.onClose} isSubmitting={isSubmitting} />
                    </DrawerFooter>
                </FormContainer>
            </FormProvider>
        </CustomDrawer>
    );
};