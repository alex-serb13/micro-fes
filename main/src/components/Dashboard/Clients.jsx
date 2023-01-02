import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  HStack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import useSWR from "swr";

const fetcher = () =>
  fetch("https://63b291865e490925c51bcf91.mockapi.io/api/clients").then((res) =>
    res.json()
  );

const columns = [
  {
    key: "name",
    label: "Client",
  },
  {
    key: "clientCode",
    label: "Code",
  },
  {
    key: "country",
    label: "Country",
  },
  {
    key: "city",
    label: "City",
  },
  {
    key: "address",
    label: "Street",
  },
];

const Loading = () => {
  return (
    <Box
      height="570px"
      width="100%"
      display="flex"
      justifyContent="center"
      position="absolute"
      top={0}
    >
      <HStack zIndex={1}>
        <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
      </HStack>
      <Box
        height="570px"
        width="100%"
        bg={useColorModeValue("gray.300", "gray.600")}
        opacity="0.5"
        display="flex"
        justifyContent="center"
        position="absolute"
      />
    </Box>
  );
};

export const DashboardClients = () => {
  const {
    data,
    isLoading: loading,
    isValidating,
  } = useSWR("clients", fetcher, {
    revalidateOnMount: true,
    keepPreviousData: false,
  });
  const isLoading = loading || isValidating;

  return (
    <TableContainer position="relative" width="100%" mt={14}>
      <Table variant="striped" position="relative">
        <Thead>
          <Tr>
            {columns.map(({ label }) => (
              <Th>{label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((row) => {
            return (
              <Tr>
                {columns.map(({ key }) => (
                  <Td>{row[key]}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
        {isLoading && <Loading />}
      </Table>
    </TableContainer>
  );
};
