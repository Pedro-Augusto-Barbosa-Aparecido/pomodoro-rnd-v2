import { Center, Spinner as NativeBaseSpinner } from "native-base";

interface SpinnerProps {
  background?: boolean
}

export function Spinner ({ background = false }: SpinnerProps) {
  if (background) {
    return (
      <Center
        flex={1}
        bgColor="gray.700"
      >
        <NativeBaseSpinner color={"green.700"} size={36} />
      </Center>
    );
  }
  
  return (
    <Center
      flex={1}
    >
      <NativeBaseSpinner color={"green.700"} size={36} />
    </Center>
  );
}