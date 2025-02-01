import { useReducer } from "react";

type FormReducerAction =
  | {
      type: "change_value";
      payload: {
        inputName: string;
        inputValue: string;
      };
    }
  | {
      type: "clear";
    }
  | {
      type: "set_values";
      payload: Record<string, any>;
    };

const formReducer = <T>(
  state: T,
  action: FormReducerAction
): T => {
  switch (action.type) {
    case "change_value":
      const { inputName, inputValue } = action.payload;
      return {
        ...state,
        [inputName]: inputValue,
      };
    case "clear":
      return {} as T;
    case "set_values":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const useForm = <T>(initialState: T) => {
  return useReducer<typeof formReducer<T>>(formReducer, initialState);
};

export default useForm;
