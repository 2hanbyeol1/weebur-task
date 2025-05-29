"use server";
import { cookies } from "next/headers";

import { isELayout } from "@/types/mode";
import { getRandomLayout } from "@/util/util";

const cookieName = "layout_mode";

export async function getLayoutCookie() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);
  if (!cookie || !isELayout(cookie.value)) return;
  return cookie.value;
}

export async function setLayoutCookie() {
  const cookieStore = await cookies();
  const newValue = getRandomLayout();
  cookieStore.set({
    name: cookieName,
    value: newValue,
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  });
  return newValue;
}
