const ENDPOINT = "http://localhost5000";

const httpJoinChat = async (username: string) => {
  try {
    const joinResponse = await fetch(`${ENDPOINT}/join`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
  } catch (error) {}
};

export {};
