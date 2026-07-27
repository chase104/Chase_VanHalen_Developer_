export const trackVisit = async () => {
  try {
    // Check if visit was already notified in this browser session
    if (sessionStorage.getItem("portfolio_visit_notified")) {
      return;
    }

    // Set flag immediately to prevent duplicate notifications during page render
    sessionStorage.setItem("portfolio_visit_notified", "true");

    const visitData = {
      _subject: "👀 Portfolio Visit Alert!",
      timestamp: new Date().toLocaleString(),
      url: window.location.href,
      referrer: document.referrer || "Direct / Bookmark",
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || "Unknown",
    };

    // 1. Send visit notification directly to Formspree (works on static sites)
    fetch("https://formspree.io/f/meqyropg", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitData),
    }).catch((err) => console.warn("Formspree visit notification notice:", err));

    // 2. Also notify backend API server if running
    fetch("/api/notify-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitData),
    }).catch(() => {});
  } catch (error) {
    console.error("Failed to send portfolio visit notification:", error);
  }
};
