import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Button, TextField } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify"; // Import react-toastify

const Login = () => {
  const { auth, setAuth, api } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP input
  const [isOtpSent, setIsOtpSent] = useState(false); // State to show OTP input
  const [buttonText, setButtonText] = useState("Send OTP"); // State for button text

  const handleOTP = async () => {
    setButtonText("Sending OTP..."); // Change button text
    try {
      const res = await axios.post(`${api}/auth/otp`, { email });
      console.log(res);
      setButtonText("OTP Sent");
      setIsOtpSent(true); // Show OTP input field
      toast.success("OTP sent successfully to your email!");
    } catch (error) {
      console.log(error);
      setButtonText("Send OTP");
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const validateOTP = async () => {
    try {
      console.log(email,otp)
      const res = await axios.post(`${api}/auth/login`, { email, otp });
      console.log(res);

      if (res.data.success) {
        setAuth({
          ...auth,
          token: res.data.token,
        });
        toast.success("Login successful!");
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/home"); 
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during validation.");
    }
  };
  useEffect(() => {
    if (auth.token) {
      navigate("/home");
    }
  }, [navigate, auth,location]);

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          height: "87vh",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "24px 40px 40px",
            width: "520px",
            height: isOtpSent ? "480px" : "400px", // Adjust height dynamically
            background:
              "linear-gradient(138.97deg, #111214 5.16%, #121212 105.18%)",
            border: "1px solid #343A40",
            borderRadius: "17px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "155%",
              color: "#FFFFFF",
              marginTop: 30,
            }}
          >
            <VpnKeyIcon
              style={{
                position: "relative",
                top: 4,
                fontSize: 40,
              }}
            />{" "}
            LOGIN
          </div>
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 6 }}>
            <ContactMailIcon
              sx={{ color: "white", scale: 2, mr: 3, my: 0.5, mb: 2 }}
            />
            <TextField
              id="input-with-sx"
              label="Enter your E-mail"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              InputProps={{
                style: { color: "white" }, // Changes text color
              }}
              InputLabelProps={{
                style: { color: "white" }, // Changes label color
              }}
              sx={{
                width: "380px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "gray", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Border color when focused
                  },
                },
              }}
            />
          </Box>
          {isOtpSent && ( // Render OTP input field if OTP is sent
            <Box sx={{ display: "flex", alignItems: "flex-end", mt: 3 }}>
              <VpnKeyIcon
                sx={{ color: "white", scale: 2, mr: 3, my: 0.5, mb: 2 }}
              />
              <TextField
                id="otp-input"
                label="Enter OTP"
                variant="outlined"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                InputProps={{
                  style: { color: "white" }, // Changes text color
                }}
                InputLabelProps={{
                  style: { color: "white" }, // Changes label color
                }}
                sx={{
                  width: "380px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "gray", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused
                    },
                  },
                }}
              />
            </Box>
          )}
          {!isOtpSent ? (
            <Button
              onClick={handleOTP}
              style={{
                width: "195px",
                height: "48px",
                display: "flex",
                alignItems: "flex-start",
                padding: "13px 15px",
                background:
                  "linear-gradient(91.73deg, #4B63DD -2.99%, rgba(5, 36, 191, 0.99) 95.8%)",
                borderRadius: "4px",
                fontFamily: "Open Sans",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "155%",
                color: "#FFFFFF",
                marginTop: 45,
              }}
            >
              {buttonText}
            </Button>
          ) : (
            <Button
              onClick={validateOTP}
              style={{
                width: "195px",
                height: "48px",
                display: "flex",
                alignItems: "flex-start",
                padding: "13px 15px",
                background:
                  "linear-gradient(91.73deg, #4B63DD -2.99%, rgba(5, 36, 191, 0.99) 95.8%)",
                borderRadius: "4px",
                fontFamily: "Open Sans",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "155%",
                color: "#FFFFFF",
                marginTop: 45,
              }}
            >
              Validate OTP
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
