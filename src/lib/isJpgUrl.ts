export const isJpgUrl = (url: string) => {
  const extension = url.split(".").pop()?.toLowerCase();
  return extension === "jpg";
};
