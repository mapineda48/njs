import http from "https";

const url =
  "https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json";

/**
 * redirect sigma api data
 */
export default async function colombia(): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data: any = "";

      res.on("data", (chunk) => {
        /**
         *Will be optimized at some point
         */
        data += chunk;
      });

      res.on("close", () => {
        try {
          const json = JSON.parse(data);

          resolve(json);
        } catch (error) {
          console.log(data);
          throw error;
        }
      });

      res.on("error", (err) => reject(err));
    });
  });
}