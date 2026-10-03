import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const accessCodeInput = z.object({
  code: z.string().min(1).max(256),
});

/** Validate the admin access code without exposing it to the browser bundle. */
export const verifyAdminAccess = createServerFn({ method: "POST" })
  .inputValidator(accessCodeInput)
  .handler(({ data }) => {
    const configuredCode = process.env.ADMIN_ACCESS_CODE;
    return Boolean(configuredCode && data.code === configuredCode);
  });
