"use server";

import { submitContactRequest } from "@/lib/contact/commands/submit-contact-request";
import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";

export const submitContactForm = async (values: ContactRequestValues) => {
  return submitContactRequest(values);
};
