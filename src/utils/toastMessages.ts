import Toast, { ToastShowParams } from "react-native-toast-message";

type IShowToastMessageParams = ToastShowParams & {
  title: string;
  message: string;
}

export function showToastMessage ({ title, message, ...rest }: IShowToastMessageParams) {
  Toast.show({
    text1: title,
    text2: message,
    ...rest
  });
}
