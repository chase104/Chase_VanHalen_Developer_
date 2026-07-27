export const trackVisit = async () => {
  try {
    // Check if visit was already notified in this browser session
    if (sessionStorage.getItem("portfolio_visit_notified")) {
      return;
    }

    // Set flag immediately to prevent duplicate notifications during page render
    sessionStorage.setItem("portfolio_visit_notified", "true");

    const visitData = {
      timestamp: new Date().toLocaleString(),
      url: window.location.href,
      referrer: document.referrer || "Direct / Bookmark",
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || "Unknown",
    };

    const response = await fetch("/api/notify-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitData),
    });

    if (!response.ok) {
      console.warn("Portfolio visit notification response status:", response.status);
    }
  } catch (error) {
    console.error("Failed to send portfolio visit notification:", error);
  }
};
