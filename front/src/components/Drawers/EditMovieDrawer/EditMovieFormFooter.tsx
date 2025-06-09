import { PrimaryButton } from "../../Buttons/PrimaryButton";
import { SecondaryButton } from "../../Buttons/SecondaryButton";
import { Text } from "@chakra-ui/react";

export const EditMovieFormFooter = ({ onClose, isSubmitting }: { onClose?: () => void; isSubmitting: boolean; }) => {
    return (
        <>
            <SecondaryButton onClick={() => onClose?.()}>
                <Text>Cancelar</Text>
            </SecondaryButton>
            <PrimaryButton type="submit" isLoading={isSubmitting}>
                <Text>Editar Filme</Text>
            </PrimaryButton>
        </>
    );
};