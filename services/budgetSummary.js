export const budgetSummary = async (data) => {
  // console.log(data.tickets.length);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: data.sessionId,
      name: data.name,
      email: data.email,
      artist: data.artist,
      location: data.location,
      venue: data.venue,
      capacity: Number(data.capacity),
      date: data.date,
      currency: data.currency,
      tickets: data.tickets,
      expenses: data.expenses,
    }),
  };

  try {
    const response = await fetch(
      import.meta.env.VITE_BUDGET_URL,
      requestOptions
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.response.error || "Something went wrong");
    }
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
