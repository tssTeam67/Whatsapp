import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  Circle,
  Center,
} from "@chakra-ui/react";

const UserProfile = ({ profile }) => {
  return (
    <Center>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        boxShadow="lg"
      >
     
        <Flex direction="column" align="center">
          <Circle size="100px" overflow="hidden">
            <Avatar name="" src="" size="full" />
          </Circle>
          <VStack spacing={2} mt={4}>
            <Text fontWeight="bold" fontSize="lg">
              {profile?.name}
            </Text>
            <Text color="gray.500">email:-{profile?.email}</Text>
            <Text color="gray.500">uuid:-{profile?.uuid}</Text>
          </VStack>
        </Flex>
      </Box>
    </Center>
  );
};

export default UserProfile;
