import React from "react";

const Contact = () => {
  return (
    <div id="contact" className=" min-vh-100 bg-light py-6 text-center">
      <div className="container">
        <div className="text-center">
          <h4 className="text-uppercase fw-bold text-primary">Contact</h4>
          <hr className="w-25 mx-auto" />
          <h2 className="mb-4">Let's see what we can do together!</h2>
        </div>
        <form
          action="https://formspree.io/f/meqyropg"
          className="d-flex flex-column align-items-center w-50  mx-auto"
          method="POST"
        >
          <div className="mb-3 w-100 w-md-50">
            <label htmlFor="email" className="form-label">
              Your email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
            />
          </div>
          <div className="mb-3 w-100">
            <label for="message" className="form-label">
              Your message:
            </label>
            <textarea
              name="message"
              id="message"
              className="form-control"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
