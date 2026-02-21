import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const { seacrhParams } = new URL(request.url);
  const slug = seacrhParams.get("slug");

  (await draftMode()).enable();
  redirect(`/${slug}?${seacrhParams.toString()}`);
};