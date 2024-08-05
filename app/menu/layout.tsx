"use client";
import { CornerDownRight } from "lucide-react";
import React from "react";

export default function MenuPageLayour({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
