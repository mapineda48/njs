import detail from "./detail.json";
import opportunity from "./oportunity.json";
import { fetchDetail, fetchOpportunity } from ".";

const isReject = false;

const delay = 2000;

function mockPromise<T>(value: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isReject) {
        return reject(new Error("im a mock error"));
      }

      resolve(value);
    }, delay);
  });
}

const fetchMockOpportunity: typeof fetchOpportunity = (startRecordNumber) => {
  return mockPromise(opportunity.oppHits);
};

const fetchMockDetail: typeof fetchDetail = (id) => {
  return mockPromise(detail);
};

export default {
  fetchOpportunity: fetchMockOpportunity,
  fetchDetail: fetchMockDetail,
};
