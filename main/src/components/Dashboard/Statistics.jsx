import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Skeleton,
  Heading,
  Text,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

import useSWR from "swr";

function StatsCard(props) {
  const { title, stat, icon, isLoading } = props;
  return (
    <Skeleton isLoaded={!isLoading}>
      <Stat
        px={{ base: 2, md: 4 }}
        py={"5"}
        shadow={"md"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.500", "gray.200")}
        rounded={"lg"}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={"auto"}
            color={useColorModeValue("gray.800", "gray.200")}
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    </Skeleton>
  );
}

const fetcher = () =>
  fetch("https://63b291865e490925c51bcf91.mockapi.io/api/statistics/1").then(
    (res) => res.json()
  );

export function DashboardStatistics() {
  const {
    data,
    isLoading: loading,
    isValidating,
  } = useSWR("statistics", fetcher, {
    revalidateOnMount: true,
    keepPreviousData: false,
  });
  const isLoading = loading || isValidating;

  return (
    <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
      <Box textAlign="center" py={10} px={6}>
        <InfoOutlineIcon boxSize={"50px"} color={"blue.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          This is the headline
        </Heading>
        <Text color={"gray.500"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Box>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        pb={10}
        fontWeight={"bold"}
      >
        Our company is expanding, you could be too.
      </chakra.h1>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Users"}
          stat={data?.users}
          icon={<BsPerson size={"3em"} />}
          isLoading={isLoading}
        />
        <StatsCard
          title={"Servers"}
          stat={data?.servers}
          icon={<FiServer size={"3em"} />}
          isLoading={isLoading}
        />
        <StatsCard
          title={"Datacenters"}
          stat={data?.datacenters}
          icon={<GoLocation size={"3em"} />}
          isLoading={isLoading}
        />
      </SimpleGrid>
    </Box>
  );
}
