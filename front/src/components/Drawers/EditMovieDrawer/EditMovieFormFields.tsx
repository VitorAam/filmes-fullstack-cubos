import { useFormContext, Controller } from "react-hook-form";
import { FormField } from "../../Form/FormField";
import { CustomInput } from "../../CustomInput";
import { CustomTextarea } from "../../CustomTextarea";
import { UploadImage } from "../../Form/UploadImage";
import { Select, Flex, SimpleGrid, Checkbox, CheckboxGroup, useToken } from "@chakra-ui/react";
import { currencyInput, numericInput, numericLimitInput } from "../../../utils/input-masks";
import { genresOptions } from "../../../data/genresOptions";
import { statusOptions } from "../../../data/statusOptions";
import type { MovieFormData } from "../../../schemas/movieSchema";

export const EditMovieFormFields = () => {
    const { control, register, formState: { errors } } = useFormContext<MovieFormData>();
    const [bgOption, textColorOption] = useToken("colors", ["mauve.2", "mauve.12"]);

    return (
        <>
            <Flex flexDir={{ base: 'column', md: 'row' }} gap={'16px'}>
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
                    label="URL do Trailer"
                    error={!!errors.trailerUrl}
                    errorMessage={errors.trailerUrl?.message ?? ""}
                >
                    <CustomInput {...register("trailerUrl")} placeholder="URL do trailer" />
                </FormField>
            </Flex>

            <Flex flexDir={{ base: 'column', md: 'row' }} gap={'16px'}>
                <FormField
                    label="Votos"
                    error={!!errors.votes}
                    errorMessage={errors.votes?.message ?? ""}
                >
                    <CustomInput
                        onInput={(e) => {
                            const element = e.target as HTMLInputElement;
                            element.value = numericInput(element.value);
                        }}
                        {...register("votes", { valueAsNumber: true })}
                        type="number"
                        placeholder="Votos"
                    />
                </FormField>

                <FormField
                    label="Popularidade"
                    error={!!errors.popularity}
                    errorMessage={errors.popularity?.message ?? ""}
                >
                    <CustomInput
                        onInput={(e) => {
                            const element = e.target as HTMLInputElement;
                            element.value = numericInput(element.value);
                        }}
                        {...register("popularity", { valueAsNumber: true })}
                        type="number"
                        placeholder="Popularidade"
                    />
                </FormField>
            </Flex>

            <Flex flexDir={{ base: 'column', md: 'row' }} gap={'16px'}>
                <Controller
                    control={control}
                    name="revenue"
                    render={({ field }) => {
                        return (
                            <FormField
                                label="Receita (USD)"
                                error={!!errors.revenue}
                                errorMessage={errors.revenue?.message ?? ""}
                            >
                                <CustomInput
                                    value={currencyInput(String(field.value ?? ''))}
                                    onChange={(e) => {
                                        const rawInput = e.target.value;
                                        const cleanValue = rawInput.replace(/\D/g, '');
                                        const parsed = (parseFloat(cleanValue) / 100) || 0;
                                        field.onChange(parsed);
                                    }}
                                    placeholder="$0.00"
                                />
                            </FormField>
                        )
                    }}
                />

                <Controller
                    control={control}
                    name="budget"
                    render={({ field }) => (
                        <FormField
                            label="Orçamento (USD)"
                            error={!!errors.budget}
                            errorMessage={errors.budget?.message ?? ""}
                        >
                            <CustomInput
                                value={currencyInput(String(field.value ?? ''))}
                                onChange={(e) => {
                                    const rawInput = e.target.value;
                                    const cleanValue = rawInput.replace(/\D/g, '');
                                    const parsed = (parseFloat(cleanValue) / 100) || 0;
                                    field.onChange(parsed);
                                }}
                                placeholder="$0.00"
                            />
                        </FormField>
                    )}
                />
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
                <CustomInput onInput={(e) => {
                    const element = e.target as HTMLInputElement;
                    element.value = numericInput(element.value);
                }} {...register("duration", { valueAsNumber: true })} type="number" placeholder="Duração" />
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
                                    <Checkbox
                                        key={genre}
                                        value={genre}
                                        color={'mauve.12'}
                                    >
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
                <CustomInput onInput={(e) => {
                    const element = e.target as HTMLInputElement;
                    element.value = numericLimitInput(element.value, 100);
                }} {...register("grade", { valueAsNumber: true })} type="number" placeholder="Nota" />
            </FormField>
        </>
    );
};