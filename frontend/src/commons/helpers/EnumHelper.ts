import { UrlTypeEnum } from "../types/Url";

export default function enumToArray(
  enumObj: any
): { id: string; value: string }[] {
  return Object.keys(enumObj).map((key) => {
    return {
      id: key.toUpperCase(),
      value: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    };
  });
}
