import React, { useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { RegisterUser } from "../../action/userAction";
import axios from "axios";

function Signup() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [companyName, setCompanyName] = useState();
  const [email, setEmail] = useState();
  const [contact,setContact]=useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [uuid, setUuid] = useState();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || !companyName || !uuid) {
      toast({
        title: "Fill the details correctly",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Not Matched",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      // const formData = new FormData();
      const formData = {
        email,
        password,
        companyName,
        contact,
        uuid,
      };
      // formData.set("email", email);
      // formData.set("password", password);
      // formData.set("companyName", companyName);
      // formData.set("uuid", uuid);
      // console.log("Form Data:", formData);
      await axios.post("/api/signup", formData);

      setLoading(false);
      navigate("/login");
    } catch (err) {
      toast({
        title: `Error: ${err.response.data.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        backgroundColor="rgba(255, 255, 255, 0.8)"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      >
        <VStack spacing="4" align="center" p="8">
          <FormControl id="companyName" isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Contact</FormLabel>
            <Input
              type="number"
              placeholder="Enter Your Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </FormControl>
          <FormControl id="uuid" isRequired>
            <FormLabel>Uuid</FormLabel>
            <Input
              type="text"
              placeholder="Enter uuid"
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
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
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleSignup} disabled={loading}>
            {loading ? <Spinner size="sm" /> : "SignUp"}
          </Button>
        </VStack>
        <h1>
          Already have an account? <Link to="/login">Click Here</Link>
        </h1>
      </Box>
    </Flex>
  );
}

export default Signup;
