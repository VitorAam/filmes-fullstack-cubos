import type { ComponentProps } from "react";
import { CustomDrawer } from "./Drawer";
import { Checkbox, CheckboxGroup, DrawerBody, DrawerFooter, Flex, Select, SimpleGrid, Text, useToken } from "@chakra-ui/react";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { FormContainer } from "../Form/FormContainer";
import { FormField } from "../Form/FormField";
import { CustomInput } from "../CustomInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema } from "../../schemas/movieSchema";
import type { MovieFormData } from "../../schemas/movieSchema";
import { CustomTextarea } from "../CustomTextarea";
import { genresOptions } from "../../data/genresOptions";
import { statusOptions } from "../../data/statusOptions";
import { UploadImage } from "../Form/UploadImage";


export const AddMovieDrawer = (props: ComponentProps<typeof CustomDrawer>) => {
    const formMethods = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: {
            genres: [],
            previewUrl: "",
            trailerUrl: "",
        },
    });
    const { register, handleSubmit, formState: { errors, isSubmitting }, control } = formMethods;
    const [bgOption, textColorOption] = useToken("colors", ["mauve.2", "mauve.12"]);

    const onSubmit = (data: MovieFormData) => {
        console.log("Dados do filme:", data);

        props.onClose?.();
    };

    return (
        <CustomDrawer {...props} title={"Adicionar Filme"}>
            <FormProvider {...formMethods}>
                <FormContainer onSubmit={handleSubmit(onSubmit)} mx={0} w={'full'} >
                    <DrawerBody as={Flex} flexDir="column" gap="16px" py="16px">
                        <Flex flexDir={{ base: 'column', md: 'row' }} gap={'16px'} >
                            <FormField
                                label="Título"
                                error={!!errors.title}
                                errorMessage={errors.title?.message ?? ""}
                            >
                                <CustomInput {...register("title")} placeholder="Digite o título" />
                            </FormField>
                            <FormField
                                label="Descrição"
                                error={!!errors.description}
                                errorMessage={errors.description?.message ?? ""}
                            >
                                <CustomInput {...register("description")} placeholder="Digite a descrição" />
                            </FormField>
                        </Flex>

                        <FormField
                            label="Sinopse"
                            error={!!errors.synopsis}
                            errorMessage={errors.synopsis?.message ?? ""}
                        >
                            <CustomTextarea {...register("synopsis")} placeholder="Digite a sinopse" />
                        </FormField>

                        <FormField
                            label="Imagem do Preview"
                            error={!!errors.previewUrl}
                            errorMessage={errors.previewUrl?.message ?? ""}
                        >
                            <UploadImage
                                name={"previewUrl"}
                                uploadUrl={"http://localhost:3333/api/upload"}
                            />
                        </FormField>

                        <Flex flexDir={{ base: 'column', md: 'row' }} gap={'16px'}>
                            <FormField
                                label="Idioma"
                                error={!!errors.language}
                                errorMessage={errors.language?.message ?? ""}
                            >
                                <CustomInput {...register("language")} placeholder="Idioma" />
                            </FormField>
                            <FormField
                                label="Orçamento (USD)"
                                error={!!errors.budget}
                                errorMessage={errors.budget?.message ?? ""}
                            >
                                <CustomInput {...register("budget")} type="number" placeholder="Orçamento" />
                            </FormField>
                        </Flex>

                        <Flex flexDir={{ base: 'column', md: 'row' }} gap={'16px'}>
                            <FormField
                                label="Votos"
                                error={!!errors.votes}
                                errorMessage={errors.votes?.message ?? ""}
                            >
                                <CustomInput {...register("votes")} type="number" placeholder="Votos" />
                            </FormField>
                            <FormField
                                label="Popularidade"
                                error={!!errors.popularity}
                                errorMessage={errors.popularity?.message ?? ""}
                            >
                                <CustomInput {...register("popularity")} type="number" placeholder="Popularidade" />
                            </FormField>
                        </Flex>

                        <Flex flexDir={{ base: 'column', md: 'row' }} gap={'16px'}>
                            <FormField
                                label="Receita (USD)"
                                error={!!errors.revenue}
                                errorMessage={errors.revenue?.message ?? ""}
                            >
                                <CustomInput {...register("revenue")} type="number" placeholder="Receita" />
                            </FormField>

                            <FormField
                                label="URL do Trailer"
                                error={!!errors.trailerUrl}
                                errorMessage={errors.trailerUrl?.message ?? ""}
                            >
                                <CustomInput
                                    {...register("trailerUrl")}
                                    placeholder="URL do trailer"
                                />
                            </FormField>
                        </Flex>

                        <FormField
                            label="Status"
                            error={!!errors.status}
                            errorMessage={errors.status?.message ?? ""}
                        >
                            <Select
                                border="1px solid"
                                borderColor="mauve.6"
                                borderRadius="4px"
                                bgColor="mauve.2"
                                color="mauve.12"
                                _placeholder={{ color: "mauve.9", fontWeight: 400 }}
                                _hover={{ borderColor: "mauve.6" }}
                                _focus={{ borderColor: "purple.8", boxShadow: "none" }}
                                {...register("status")}
                            >
                                {statusOptions.map((status) => (
                                    <option
                                        key={status}
                                        value={status}
                                        style={{
                                            backgroundColor: bgOption,
                                            color: textColorOption,
                                        }}
                                    >
                                        {status}
                                    </option>
                                ))}
                            </Select>
                        </FormField>

                        <FormField
                            label="Duração (minutos)"
                            error={!!errors.duration}
                            errorMessage={errors.duration?.message ?? ""}
                        >
                            <CustomInput {...register("duration")} type="number" placeholder="Duração" />
                        </FormField>

                        <FormField
                            label="Data de Lançamento"
                            error={!!errors.launch}
                            errorMessage={errors.launch?.message ?? ""}
                        >
                            <CustomInput {...register("launch")} type="date" placeholder="Data de lançamento" />
                        </FormField>

                        <FormField
                            label="Gêneros"
                            error={!!errors.genres}
                            errorMessage={errors.genres?.message ?? ""}
                        >
                            <Controller
                                control={control}
                                name="genres"
                                render={({ field }) => (
                                    <CheckboxGroup {...field} colorScheme="purple">
                                        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
                                            {genresOptions.map((genre) => (
                                                <Checkbox key={genre} value={genre} color={'mauve.12'} >
                                                    {genre}
                                                </Checkbox>
                                            ))}
                                        </SimpleGrid>
                                    </CheckboxGroup>
                                )}
                            />
                        </FormField>

                        <FormField
                            label="Nota (0-100)"
                            error={!!errors.grade}
                            errorMessage={errors.grade?.message ?? ""}
                        >
                            <CustomInput {...register("grade")} type="number" placeholder="Nota" />
                        </FormField>
                    </DrawerBody>

                    <DrawerFooter as={Flex} gap="16px">
                        <SecondaryButton onClick={() => props.onClose?.()}>
                            <Text>Cancelar</Text>
                        </SecondaryButton>
                        <PrimaryButton type="submit" isLoading={isSubmitting}>
                            <Text>Adicionar Filme</Text>
                        </PrimaryButton>
                    </DrawerFooter>
                </FormContainer>
            </FormProvider>
        </CustomDrawer>
    );
};