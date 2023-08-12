export const isSvgUrl = (url: string) => {
  const extension = url.split(".").pop()?.toLowerCase();
  return extension === "svg";
};
