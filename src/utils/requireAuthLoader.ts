import { redirect } from "react-router";

import { queryClient } from "./queryClient";
import { fetchMe } from "../queries/me";

export async function requireAuthLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const returnTo = url.pathname + url.search;

  try {
    const me = await queryClient.ensureQueryData({
        queryKey: ["me"],
        queryFn: fetchMe,
    });

    if (!me) {
        throw redirect(`/login?returnTo=${encodeURIComponent(returnTo)}`);
    }

    return null;
  }
  catch (err) {
    if (err instanceof Response) {
      throw err;
    }

    throw redirect("/error");
  }
}