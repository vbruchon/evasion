const getAdminEmails = () => {
  const value = process.env.ADMIN_EMAILS;

  if (!value) {
    throw new Error("ADMIN_EMAILS is not defined");
  }

  const emails = value
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (emails.length === 0) {
    throw new Error("ADMIN_EMAILS must contain at least one email address");
  }

  return emails;
};

export const isAdminEmail = (email: string): boolean => {
  return getAdminEmails().includes(email.trim().toLowerCase());
};
