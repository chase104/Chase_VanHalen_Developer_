import React, { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !message) {
      setErrorMessage("Please fill out both your email and message.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      // 1. Submit form directly to Formspree
      const response = await fetch("https://formspree.io/f/meqyropg", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
          _subject: `📬 Portfolio Contact Form Message from ${email}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setMessage("");

        // 2. Also notify backend API server if running
        fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, message }),
        }).catch(() => {});
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(
          data.error || "Something went wrong sending your message via Formspree. Please try again."
        );
        setStatus("error");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setErrorMessage("Failed to send message. Please check your internet connection.");
      setStatus("error");
    }
  };

  return (
    <div id="contact" className="min-vh-100 bg-light py-6 text-center">
      <div className="container">
        <div className="text-center">
          <h4 className="text-uppercase fw-bold text-primary">Contact</h4>
          <hr className="w-25 mx-auto" />
          <h2 className="mb-4">Let's see what we can do together!</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center w-100 max-w-lg mx-auto p-4 bg-white rounded shadow-sm"
          style={{ maxWidth: "600px" }}
        >
          {status === "success" && (
            <div className="alert alert-success w-100 text-start mb-3" role="alert">
              <strong>Success!</strong> Your message has been sent to Formspree & Chase's inbox. Thank you!
            </div>
          )}

          {status === "error" && (
            <div className="alert alert-danger w-100 text-start mb-3" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="mb-3 w-100 text-start">
            <label htmlFor="email" className="form-label fw-bold">
              Your Email Address:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "sending"}
            />
          </div>

          <div className="mb-3 w-100 text-start">
            <label htmlFor="message" className="form-label fw-bold">
              Your Message:
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              className="form-control"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={status === "sending"}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary px-5 py-2 fw-bold"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
