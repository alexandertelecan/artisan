import * as yup from "yup";
const validation = (name, errorMessage, callbackFn) => {
  console.log(callbackFn);
  return { [name]: yup.string()[callbackFn(errorMessage)] };
};

export default validation;
