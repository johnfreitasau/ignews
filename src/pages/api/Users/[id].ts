import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "John F", age: 36 },
    { id: 2, name: "John F", age: 36 },
    { id: 3, name: "John F", age: 36 },
    { id: 4, name: "John F", age: 36 },
  ];

  return response.json(users);
};
