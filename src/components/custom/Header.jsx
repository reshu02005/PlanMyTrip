import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    },
    onError: () => {
      console.log("Login Failed ❌");
    },
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between items-center px-5 h-16">
        {/* Logo Section */}
        <h2 className="text-xl font-bold p-2 flex items-center">
          <img src="/logo-icon.png" alt="logo" className="w-6 me-1" />
          PlanItAI
        </h2>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full border"
              />
              <span
                className="text-sm font-medium underline cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {user.name}
              </span>
            </div>
          ) : (
            <Button size="sm" onClick={login}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;