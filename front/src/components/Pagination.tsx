import { Flex, Text } from "@chakra-ui/react";
import ChevronRight from "./Icons/ChevronRight";
import ChevronLeft from "./Icons/ChevronLeft";
import { PrimaryButton } from "./Buttons/PrimaryButton";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <Flex justifyContent="center" alignItems="center" gap={2} mb={{ base: '16px', md: '24px' }}>
            <PrimaryButton
                onClick={() => onPageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
            ><ChevronLeft /></PrimaryButton>
            {pages.map((page) => (
                <PrimaryButton
                    key={page}
                    onClick={() => onPageChange(page)}
                    isDisabled={page === currentPage}
                >
                    <Text>{page}</Text>
                </PrimaryButton>
            ))}
            <PrimaryButton
                onClick={() => onPageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
            ><ChevronRight /></PrimaryButton>
        </Flex>
    );
};