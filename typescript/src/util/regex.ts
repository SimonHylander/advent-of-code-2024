export const extractEqualValue = (str: string, key: string) => {
  const regex = new RegExp(`${key}=(.*?)(;|$)`, "g");
  const match = regex.exec(str);
  return match ? match[1] : null;
};
