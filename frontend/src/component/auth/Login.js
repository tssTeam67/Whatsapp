import React, { useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Fill the details correctly",

        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const userData = {
        email,
        password,
      };

      const response = await axios.post("/api/login", userData);

      console.log("Login successful:", response.data);

      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error.message);
      setLoading(false);
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <VStack spacing="4" align="center" p="8">
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleLogin} disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Login"}
          </Button>
        </VStack>
        <h1>
          For Registered <Link to="/signup">Click Here</Link>
        </h1>
      </Box>
    </Flex>
  );
}

export default Login;
