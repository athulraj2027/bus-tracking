"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-sm border border-border shadow-sm">
        {/* Header */}
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold text-primary tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>Login to continue tracking buses</CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent>
          <form className="space-y-5">
            {/* Email */}
            <Input type="email" placeholder="Email" />

            {/* Password */}
            <Input type="password" placeholder="Password" />

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          {/* Footer */}
          <p className="text-sm text-muted-foreground text-center mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-foreground hover:underline">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
