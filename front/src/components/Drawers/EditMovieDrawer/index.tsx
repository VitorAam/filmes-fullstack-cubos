import { useEffect, type ComponentProps } from "react";
import { CustomDrawer } from "../Drawer";
import { DrawerBody, DrawerFooter, Flex } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema } from "../../../schemas/movieSchema";
import type { MovieFormData } from "../../../schemas/movieSchema";
import { FormContainer } from "../../Form/FormContainer";
import { EditMovieFormFields } from "./EditMovieFormFields";
import { EditMovieFormFooter } from "./EditMovieFormFooter";

interface EditMovieDrawerProps extends ComponentProps<typeof CustomDrawer> {
    movieData: MovieFormData;
    onSubmit: (data: MovieFormData) => Promise<void>;
}
export const EditMovieDrawer = ({ movieData, onSubmit, ...props }: EditMovieDrawerProps) => {
    const formMethods = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: {
            genres: [],
            previewUrl: "",
            trailerUrl: "",
        },
    });

    const { handleSubmit, formState: { isSubmitting }, reset } = formMethods;

    useEffect(() => {
        if (props.isOpen && movieData) {
            reset(movieData);
        }
    }, [props.isOpen, movieData, reset]);

    return (
        <CustomDrawer {...props} title={"Editar Filme"}>
            <FormProvider {...formMethods}>
                <FormContainer onSubmit={handleSubmit(onSubmit)} mx={0} w={'full'}>
                    <DrawerBody as={Flex} flexDir="column" gap="16px" py="16px">
                        <EditMovieFormFields />
                    </DrawerBody>

                    <DrawerFooter as={Flex} gap="16px">
                        <EditMovieFormFooter onClose={props.onClose} isSubmitting={isSubmitting} />
                    </DrawerFooter>
                </FormContainer>
            </FormProvider>
        </CustomDrawer>
    );
};