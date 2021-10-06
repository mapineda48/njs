import express from "express";
import baseUrl from "./baseUrl";
import { createDemo } from "./router";

export = function grants() {
  return express.Router().use(baseUrl, createDemo());
};
