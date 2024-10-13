import request from "supertest";

import app from "../../../app";

export const requestAPIWithAuth = ({
  method,
  endPoint,
  statusCode,
  cookie,
}: {
  method: "get" | "post" | "put" | "delete";
  endPoint: string;
  statusCode: number;
  cookie: string;
}) => {
  return request(app)
    [method](endPoint)
    .set("Accept", "application/json")
    .set("Cookie", cookie)
    .expect("Content-type", /application\/json/)
    .expect(statusCode);
};
