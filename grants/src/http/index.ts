import axios from "axios";
import { RestOpportunity, RestDetail } from "shared";
import mock from "./mock";

export async function fetchOpportunity(startRecordNum: number) {
  const url = "api/rest/search";

  const { data } = await axios.post<RestOpportunity>(url, { startRecordNum });

  return data.oppHits;
}

export async function fetchDetail(id: number) {
  const url = "api/rest/detail";

  const { data } = await axios.post<RestDetail>(url, { id });

  return data;
}

const http = { fetchOpportunity, fetchDetail };

export default process.env.NODE_ENV === "development" ? mock : http;
