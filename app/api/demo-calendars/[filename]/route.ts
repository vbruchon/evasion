import { getDemoAccommodationIcal } from "@/lib/accommodations/availability/get-demo-accommodation-ical";

type DemoCalendarRouteProps = {
  params: Promise<{
    filename: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: DemoCalendarRouteProps,
) {
  const { filename } = await params;

  const content = getDemoAccommodationIcal(filename);

  if (!content) {
    return new Response("Calendar not found", {
      status: 404,
    });
  }

  return new Response(content, {
    status: 200,

    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
