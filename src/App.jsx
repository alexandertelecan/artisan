import { useState } from "react";
import { Heading, Text } from "@chakra-ui/react";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Heading>Hello World</Heading>
      <Text>Hello world!</Text>
    </>
  );
}

export default App;
