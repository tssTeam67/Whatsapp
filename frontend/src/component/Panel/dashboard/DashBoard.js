import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
} from '@chakra-ui/react';

const DashBoard = () => {
  // Hardcoded data for demonstration
  const data = [
    { label: 'Total Users', value: 1000 },
    { label: 'Total Orders', value: 500 },
    { label: 'Total Revenue', value: 100000 },
   
    { label: 'New Customers', value: 200 },
    { label: 'Pending Orders', value: 50 },
    { label: 'Average Order Value', value: 200 },
  ];

  return (
    <Box p={4}>
      <Heading mb={4}>Dashboard</Heading>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {data.map((item, index) => (
          <Stat key={index}>
            <StatLabel>{item.label}</StatLabel>
            <StatNumber>{item.value}</StatNumber>
          </Stat>
        ))}
      </SimpleGrid>

     
      <Flex mt={8} direction="column">
        <Heading size="md" mb={4}>
          Recent Activity
        </Heading>
       
        <Box p={4} boxShadow="md" borderRadius="md" bg="white">
         
          Example Recent Activity Content
        </Box>
      </Flex>
    </Box>
  );
};

export default DashBoard;
