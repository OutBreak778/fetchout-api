export function GetInitial(item: string) {
  return item
    .split(" ")
    .map((item) => item.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
