export async function createReservation(data) {
    const res = await fetch("localhost:3000/utility/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to create new reservation");
    }
  
    return res.json();
}
  
export async function getReservations(userID) {
    const res = await fetch(
      "localhost:3000/utility/user=:"+userID,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: "Bearer " + token,
        },
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to get reservations");
    }
  
    return res.json();
}