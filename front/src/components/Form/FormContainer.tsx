import { Flex } from "@chakra-ui/react"
import type { ReactElement, ComponentProps } from "react"

type FormContainerProps = {
  children: ReactElement | ReactElement[]
} & Omit<ComponentProps<typeof Flex>, "as"> & {
  as?: "form"
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  onReset?: React.FormEventHandler<HTMLFormElement>
}

export const FormContainer = ({ children, ...rest }: FormContainerProps) => {
  return (
    <Flex
      as="form"
      bgColor="mauve.3"
      p={4}
      gap={4}
      flexDir="column"
      w="412px"
      m="auto"
      {...rest}
    >
      {children}
    </Flex>
  )
}