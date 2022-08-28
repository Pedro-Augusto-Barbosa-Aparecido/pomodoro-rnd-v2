import { Center, Spinner as NativeBaseSpinner } from "native-base";

export function Spinner () {
  return (
    <Center
      flex={1}
    >
      <NativeBaseSpinner color={"green.700"} size={36} />
    </Center>
  );
}