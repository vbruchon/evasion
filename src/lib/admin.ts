const adminEmails =
  process.env.ADMIN_EMAILS?.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean) ?? [];

export const isAdminEmail = (email: string): boolean => {
  return adminEmails.includes(email.trim().toLowerCase());
};
