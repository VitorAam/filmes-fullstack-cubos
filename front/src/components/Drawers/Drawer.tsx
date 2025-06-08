import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, Flex } from "@chakra-ui/react"
import { useContext, type ComponentProps } from "react"
import { ThemeContext } from "../../context/ThemeContext"

type CustomDrawerProps = {
    title: string
} & ComponentProps<typeof Drawer>

export const CustomDrawer = ({ title, isOpen, onClose, children }: CustomDrawerProps) => {
    const { isDark } = useContext(ThemeContext)

    return (
        <Drawer
            isOpen={isOpen}
            placement={'right'}
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent w={'full'} maxW={'565px'} bgColor={'mauve.3'} >
                <DrawerHeader color={'mauve.11'}>
                    {title}
                    <DrawerCloseButton color={isDark ? 'white' : 'black'} mt={2} />
                </DrawerHeader>
                <Flex flexDir={'column'} flex={1} overflowY={'auto'}>{children}</Flex>
            </DrawerContent>
        </Drawer>
    )
}