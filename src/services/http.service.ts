const ENDPOINT = "http://localhost:5000";

export const httpJoinChat = async (
  username: string
): Promise<{
  username: string;
  message: string;
}> => {
  const joinPromise = await fetch(ENDPOINT + "/join", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username.trim() }),
  });

  const response = (await joinPromise.json()) as {
    username: string;
    message: string;
  };

  return response;
};

export {};
