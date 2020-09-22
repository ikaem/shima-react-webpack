// const ENDPOINT = "http://localhost:5000";
const ENDPOINT = process.env.API_ENDPOINT as string;

export const httpJoinChat = async (
  username: string
): Promise<{
  username: string;
  message?: string;
}> => {
  try {
    const joinPromise = await fetch(ENDPOINT + "join", {
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

    if (response.message === "This username is taken") throw response.message;

    return { username: response.username };
  } catch (error) {
    if (error === "This username is taken") return { username, message: error };

    return {
      username,
      message:
        "There was an issue joining the chat. Please refresh the page and try again.",
    };
  }
};

/* const ENDPOINT = process.env.API_ENDPOINT as string;

export const httpJoinChat = async (
  username: string
): Promise<{
  username: string;
  message?: string;
}> => {

  const joinPromise = await fetch(ENDPOINT + "join", {
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

  if (response.message === "This username is taken")
    return { message: response.message, username: response.username };

  return { username: response.username };
}; */
