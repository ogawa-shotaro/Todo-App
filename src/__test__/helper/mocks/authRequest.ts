import { AuthenticatedRequest } from "../../../types/users/UserAuthRequest.type";

type MockAuthenticatedRequestArgMap = {
  cookies?: Record<string, string>;
  user?: {
    id: number;
  };
};

export const createMockAuthenticatedRequest = ({
  cookies,
  user,
}: MockAuthenticatedRequestArgMap): AuthenticatedRequest => {
  return {
    cookies: cookies ?? {},
    user: user ?? {},
  } as AuthenticatedRequest;
};
