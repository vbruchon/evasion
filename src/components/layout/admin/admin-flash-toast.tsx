"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { consumeAdminSuccessToast } from "@/lib/admin/admin-success-toast";

export const AdminFlashToast = () => {
  useEffect(() => {
    const message = consumeAdminSuccessToast();

    if (message) {
      toast.success(message);
    }
  }, []);

  return null;
};
