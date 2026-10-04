const ADMIN_SUCCESS_TOAST_KEY = "admin-success-toast";

export const setAdminSuccessToast = (message: string) => {
  try {
    sessionStorage.setItem(ADMIN_SUCCESS_TOAST_KEY, message);
  } catch {
    // The toast should never block the main action.
  }
};

export const consumeAdminSuccessToast = () => {
  try {
    const message = sessionStorage.getItem(ADMIN_SUCCESS_TOAST_KEY);

    if (!message) {
      return null;
    }

    sessionStorage.removeItem(ADMIN_SUCCESS_TOAST_KEY);

    return message;
  } catch {
    return null;
  }
};
