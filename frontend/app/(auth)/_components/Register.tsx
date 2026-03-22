"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [role, setRole] = useState("PASSENGER");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-sm border border-border shadow-sm">
        {/* Header */}
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold text-primary tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription>Start tracking buses in real-time</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">
            {/* Role Selector (BETTER UX) */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Select Role</p>

              <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-md">
                <button
                  type="button"
                  onClick={() => setRole("PASSENGER")}
                  className={`text-sm py-2 rounded-md transition ${
                    role === "PASSENGER"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  Passenger
                </button>

                <button
                  type="button"
                  onClick={() => setRole("DRIVER")}
                  className={`text-sm py-2 rounded-md transition ${
                    role === "DRIVER"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  Driver
                </button>
              </div>
            </div>

            {/* Inputs */}
            <Input placeholder="Full Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />

            {/* Submit */}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>

          {/* Footer */}
          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-foreground hover:underline">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
