import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanPath(item: string) {
  if (!item || typeof item !== "string") return "";

  return item.split("/").slice(0, -1).join("/");
}

export const copyToClipboard = async (item: string | undefined) => {
  if (!item) {
    toast.error("Nothing to copy!");
    return;
  }
  await navigator.clipboard.writeText(item);
  setTimeout(() => {
    toast.success("Copied to Clipboard.");
  }, 90)
};
