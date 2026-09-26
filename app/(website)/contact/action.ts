"use server";

import { headers } from "next/headers";

import { submitContactRequest } from "@/lib/contact/commands/submit-contact-request";
import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";

const getClientIp = async () => {
  const requestHeaders = await headers();

  const forwardedFor = requestHeaders.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return requestHeaders.get("x-real-ip") ?? "unknown";
};

export const submitContactForm = async (values: ContactRequestValues) => {
  const ipAddress = await getClientIp();

  return submitContactRequest(values, {
    ipAddress,
  });
};
