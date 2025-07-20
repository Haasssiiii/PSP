
import React, { useState } from "react";
import { auth, GoogleAuthProvider, RecaptchaVerifier } from "./firebaseConfig";
import { signInWithPopup, signInWithPhoneNumber } from "firebase/auth";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const sendOTP = async () => {
    const formatted = phone.startsWith("+92") ? phone : `+92${phone}`;
    window.recaptchaVerifier = new RecaptchaVerifier("recaptcha", {}, auth);
    const result = await signInWithPhoneNumber(auth, formatted, window.recaptchaVerifier);
    setConfirmationResult(result);
  };

  const verifyOTP = async () => {
    if (confirmationResult) await confirmationResult.confirm(otp);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button onClick={signInWithGoogle} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
        Sign in with Google
      </button>
      <input type="text" placeholder="Phone Number (3001234567)" className="border px-3 py-2 mb-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <div id="recaptcha" className="mb-2"></div>
      <button onClick={sendOTP} className="bg-green-600 text-white px-4 py-2 rounded">Send OTP</button>
      {confirmationResult && (
        <>
          <input type="text" placeholder="Enter OTP" className="border px-3 py-2 mt-3" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={verifyOTP} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default Login;
