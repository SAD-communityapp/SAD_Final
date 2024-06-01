export async function createAnnouncement(data) {
    const res = await fetch("localhost:3000/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to create new announcement");
    }
  
    return res.json();
}
  
export async function getAnnouncement(announcementID) {
    const res = await fetch("localhost:3000/announcements/id=:" + announcementID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to get announcement");
    }
  
    return res.json();
}
  
export async function getAnnouncements(userID) {
    const res = await fetch(
      "localhost:3000/announcements",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: "Bearer " + token,
        },
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to get announcements");
    }
  
    return res.json();
}

export async function getCalendarAnnouncement(userID) {
    const res = await fetch(
      "localhost:3000/announcements/calender",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: "Bearer " + token,
        },
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to get announcements for calendar");
    }
  
    return res.json();
}

export async function createAnnouncementComment(data) {
    const res = await fetch("localhost:3000/announcements/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to create new comment");
    }
  
    return res.json();
}