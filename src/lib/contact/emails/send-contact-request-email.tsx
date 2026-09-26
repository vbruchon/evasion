import { Resend } from "resend";

import { ContactRequestEmail } from "@/lib/contact/emails/contact-request-email";
import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";

type SendContactRequestEmailParams = {
  firstName: string | null;
  email: string;
  subject: ContactRequestValues["subject"];
  accommodationName: string | null;
  message: string;
};

export const sendContactRequestEmail = async ({
  firstName,
  email,
  subject,
  accommodationName,
  message,
}: SendContactRequestEmailParams) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error("Contact email configuration is missing.");
  }

  const resend = new Resend(apiKey);

  const emailSubject = accommodationName
    ? `[Évasion] Nouvelle demande — ${accommodationName}`
    : "[Évasion] Nouvelle demande de contact";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: emailSubject,
    react: (
      <ContactRequestEmail
        firstName={firstName}
        email={email}
        subject={subject}
        accommodationName={accommodationName}
        message={message}
      />
    ),
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
};
