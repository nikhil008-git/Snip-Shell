import { Alert, Stack } from "@chakra-ui/react"

interface add {
    add: string;
}
const BlueAlert = ({add} : add) => { 
  return (
    <Stack gap="4">
      <Alert.Root status="success" variant="subtle">
        <Alert.Indicator />
        <Alert.Title>{add}</Alert.Title>
      </Alert.Root>
    </Stack>
  )
}
export default BlueAlert;