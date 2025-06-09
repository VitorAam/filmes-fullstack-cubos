import {
    Modal,
    Flex,
    Text,
    Checkbox,
    CheckboxGroup,
    SimpleGrid,
} from "@chakra-ui/react";
import type { ComponentProps } from "react";
import { Controller, useForm } from "react-hook-form";
import { genresOptions } from "../../data/genresOptions";
import { CustomModal } from ".";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { CustomInput } from "../CustomInput";

interface FilterValues {
    minDuration: number | undefined;
    maxDuration: number | undefined;
    startDate: string;
    endDate: string;
    genres: string[];
}

interface FilterModalProps extends ComponentProps<typeof Modal> {
    onApplyFilters: (filters: FilterValues) => void;
}

export const FilterModal = ({ isOpen, onClose, onApplyFilters }: FilterModalProps) => {
    const { register, handleSubmit, control, reset } = useForm<FilterValues>({
        defaultValues: {
            minDuration: undefined,
            maxDuration: undefined,
            startDate: "",
            endDate: "",
            genres: [],
        },
    });

    const onSubmit = (data: FilterValues) => {
        onApplyFilters(data);
        onClose?.();
    };

    const handleReset = () => {
        reset();
        onApplyFilters({
            minDuration: undefined,
            maxDuration: undefined,
            startDate: "",
            endDate: "",
            genres: [],
        });
        onClose?.();
    };

    return (
        <CustomModal title={''} isOpen={isOpen} onClose={onClose} isCentered>{

            <Flex flexDir="column" gap={4}>

                <Flex flexDir="column" gap={2}>
                    <Text>Duração (minutos)</Text>
                    <Flex gap={2}>
                        <CustomInput
                            placeholder="Mínima"
                            type="number"
                            {...register("minDuration", { valueAsNumber: true })}
                        />
                        <CustomInput
                            placeholder="Máxima"
                            type="number"
                            {...register("maxDuration", { valueAsNumber: true })}
                        />
                    </Flex>
                </Flex>

                <Flex flexDir="column" gap={2}>
                    <Text>Data de lançamento</Text>
                    <Flex gap={2}>
                        <CustomInput type="date" {...register("startDate")} />
                        <CustomInput type="date" {...register("endDate")} />
                    </Flex>
                </Flex>

                <Flex flexDir="column" gap={2}>
                    <Text>Gêneros</Text>
                    <Controller
                        name="genres"
                        control={control}
                        render={({ field }) => (
                            <CheckboxGroup {...field}>
                                <SimpleGrid columns={2} spacing={2}>
                                    {genresOptions.map((genre) => (
                                        <Checkbox
                                            key={genre}
                                            value={genre}
                                            color={"mauve.12"}
                                            borderColor={"mauve.12"}
                                            colorScheme="purple"
                                        >
                                            {genre}
                                        </Checkbox>
                                    ))}
                                </SimpleGrid>
                            </CheckboxGroup>
                        )}
                    />
                </Flex>

                <Flex w={'full'} justifyContent={'end'} gap={2} >
                    <SecondaryButton onClick={handleReset}>
                        <Text>Limpar</Text>
                    </SecondaryButton>
                    <PrimaryButton onClick={handleSubmit(onSubmit)}>
                        <Text>Filtrar</Text>
                    </PrimaryButton>
                </Flex>
            </Flex>
        }
        </CustomModal>
    );
};
