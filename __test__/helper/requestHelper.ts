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
    .expect("Content-type", /application\/json/)
    .expect(statusCode);
};
