import LoginForm from "./components/auth/LoginForm";
import ResetPasswordForm from "./components/auth/ResetPasswordForm";
import React from "react";
function Auth() {
  const [step, setStep] = React.useState(1);
  const navStep = (step) => {
    if (step === 1 || step === 2) {
      setStep(step);
    }
  };
  return step === 1 ? (
    <LoginForm navStep={navStep} />
  ) : (
    <ResetPasswordForm navStep={navStep} />
  );
}

export default Auth;
