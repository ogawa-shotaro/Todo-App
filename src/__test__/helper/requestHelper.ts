import request from "supertest";

import app from "../../app";

export const requestAPI = ({
  method,
  endPoint,
  statusCode,
}: {
  method: "get" | "post" | "put" | "delete";
  endPoint: string;
  statusCode: number;
}) => {
  return request(app)
    [method](endPoint)
    .set("Accept", "application/json")
    .set("Cookie", [
      "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    ])
    .expect("Content-type", /application\/json/)
    .expect(statusCode);
};
