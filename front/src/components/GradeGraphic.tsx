import { Flex, Text } from "@chakra-ui/react";

interface GradeGraphicProps {
  grade: number;
}

export const GradeGraphic = ({ grade }: GradeGraphicProps) => {
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (grade / 100) * circumference;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      position="relative"
      h={{ base: "98px", md: `${size}px` }}
      w={{ base: "98px", md: `${size}px` }}
      bgColor={'rgba(0,0,0,0.5)'}
      borderRadius={'100%'}
      m={'auto'}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={"rgba(255, 255, 255, 0.1)"}
          strokeWidth={strokeWidth}
          fill={"transparent"}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 224, 0, 1)"
          strokeWidth={strokeWidth}
          fill={"transparent"}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
      </svg>

      <Text
        position="absolute"
        color="white"
        fontSize={{ base: "20px", md: "28px" }}
        fontWeight="bold"
      >
        {grade}%
      </Text>
    </Flex>
  );
};