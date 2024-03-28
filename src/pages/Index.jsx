import React, { useState, useEffect } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaUser, FaComment } from "react-icons/fa";

const Index = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [username, setUsername] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const states = [
    { name: "California", latlng: { latitude: 37.7749, longitude: -122.4194 } },
    { name: "New York", latlng: { latitude: 40.7128, longitude: -74.006 } },
    { name: "Texas", latlng: { latitude: 31.9686, longitude: -99.9018 } },
    // Add more states here
  ];

  const handleStatePress = (state) => {
    setSelectedState(state);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        user: isAnonymous ? "Anonymous" : username,
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <Box flex={1}>
      {selectedState ? (
        <VStack flex={1} p={4} spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            {selectedState.name} Chat Room
          </Text>
          <Box flex={1} w="100%" borderWidth={1} borderRadius="md" p={2}>
            {messages.map((message) => (
              <Text key={message.id}>
                <Text as="span" fontWeight="bold">
                  {message.user}:
                </Text>{" "}
                {message.text}
              </Text>
            ))}
          </Box>
          <Input value={inputMessage} onChangeText={setInputMessage} placeholder="Type a message..." />
          <Button leftIcon={<FaComment />} onPress={handleSendMessage}>
            Send
          </Button>
        </VStack>
      ) : (
        <Box flex={1}>
          <Box h="400px" w="100%" borderWidth={1}>
            {}
            {states.map((state) => (
              <Button key={state.name} leftIcon={<FaMapMarkerAlt />} onClick={() => handleStatePress(state)} m={2}>
                {state.name}
              </Button>
            ))}
          </Box>
          <Box p={4}>
            {isAnonymous ? (
              <Button leftIcon={<FaUser />} onPress={() => setIsAnonymous(false)}>
                Sign In
              </Button>
            ) : (
              <Input value={username} onChangeText={setUsername} placeholder="Enter your username" />
            )}
            <Button mt={2} onPress={() => setIsAnonymous(!isAnonymous)} variant="link">
              {isAnonymous ? "Sign In" : "Continue as Anonymous"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Index;
