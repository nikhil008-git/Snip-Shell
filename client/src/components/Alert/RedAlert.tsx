import { Alert } from "@chakra-ui/react"
interface add{
  add : string;
}

export  const RedAlert = ({add}: add) => {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{add}</Alert.Title>
      </Alert.Content>
    </Alert.Root>
  )
}

export default RedAlert;

