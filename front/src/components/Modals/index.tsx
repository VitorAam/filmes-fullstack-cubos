import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import type { ComponentProps } from "react";

type CustomModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string
} & ComponentProps<typeof Modal>

export const CustomModal = ({ isOpen, onClose, title, ...rest
}: CustomModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bgColor="mauve.3" color="mauve.12">
                <ModalHeader fontSize="lg" fontWeight="bold">
                    {title}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {rest.children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};