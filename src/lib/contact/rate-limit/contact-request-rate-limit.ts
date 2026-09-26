import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const contactRequestRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  prefix: "contact-request",
});

export const checkContactRequestRateLimit = async (identifier: string) =>
  contactRequestRateLimit.limit(identifier);
