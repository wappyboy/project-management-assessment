import { clsx, type ClassValue } from "clsx";
import { rwMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}