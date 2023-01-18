import axios from "axios";
import { readFileSync } from "fs";
import { isAbsolute, join } from "path";

export const fetchRef = async ({ $ref }: TServiceEndPointResponseRef) => {
  let payload = null;

  try {
    let { status, data } = await axios.get($ref);
    if (status === 200) {
      payload = JSON.parse(JSON.stringify(data)) || payload;
    } else {
      payload = data.error || payload;
    }
  } catch (error) {
    try {
      if (!isAbsolute($ref)) {
        $ref = join(process.cwd(), $ref);
      }
      payload = JSON.parse(readFileSync($ref).toString()) || payload;
    } catch (error) {
      payload = { error: `${(error as any).message}` };
    }
  }
  return payload;
};

export default fetchRef;
