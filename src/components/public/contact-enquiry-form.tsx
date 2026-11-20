
"use client";

import type { FormEvent } from "react";

import {
  ArrowUpRight,
  Mail,
  Send,
  ShieldCheck,
} from "lucide-react";

// ======================================================
// SCHOOL EMAIL
// ======================================================

const SCHOOL_EMAIL =
  "doribabsschool@gmail.com";

// ======================================================
// FORM SUBMISSION
// ======================================================

export default function ContactEnquiryForm() {
  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget
    );

    const name = String(
      formData.get("name") ?? ""
    ).trim();

    const email = String(
      formData.get("email") ?? ""
    ).trim();

    const phone = String(
      formData.get("phone") ?? ""
    ).trim();

    const subject = String(
      formData.get("subject") ?? ""
    ).trim();

    const message = String(
      formData.get("message") ?? ""
    ).trim();

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return;
    }

    const emailSubject =
      `Doribabs Website Enquiry: ${subject}`;

    const emailBody = [
      "Hello Doribabs School Complex,",
      "",
      message,
      "",
      "------------------------------",
      "CONTACT INFORMATION",
      "------------------------------",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Enquiry Type: ${subject}`,
      "",
      "Sent from the Doribabs website enquiry form.",
    ].join("\n");

    const mailto = [
      `mailto:${SCHOOL_EMAIL}`,
      `?subject=${encodeURIComponent(emailSubject)}`,
      `&body=${encodeURIComponent(emailBody)}`,
    ].join("");

    // Open the visitor's email application.
    // The visitor must send the message there.
    window.location.href = mailto;
  }

  const inputClass =
    "mt-2 h-13 w-full rounded-xl border border-slate-200 bg-[#FAFCFA] px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#176B49] focus:ring-2 focus:ring-green-100";

  const labelClass =
    "block text-sm font-bold text-slate-800";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className={labelClass}
          >
            Full Name
            <span className="ml-1 text-orange-600">
              *
            </span>
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="Enter your full name"
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className={labelClass}
          >
            Email Address
            <span className="ml-1 text-orange-600">
              *
            </span>
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={150}
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="contact-phone"
          className={labelClass}
        >
          Phone Number
          <span className="ml-2 text-xs font-normal text-slate-400">
            Optional
          </span>
        </label>

        <input
          id="contact-phone"
          name="phone"
          type="tel"
          maxLength={30}
          autoComplete="tel"
          placeholder="+233 XX XXX XXXX"
          className={inputClass}
        />
      </div>

      {/* Enquiry category */}
      <div>
        <label
          htmlFor="contact-subject"
          className={labelClass}
        >
          Enquiry Type
          <span className="ml-1 text-orange-600">
            *
          </span>
        </label>

        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Select your enquiry type
          </option>

          <option value="Admissions">
            Admissions & Enrolment
          </option>

          <option value="Academic Programmes">
            Academic Programmes
          </option>

          <option value="School Fees">
            School Fees & Payments
          </option>

          <option value="Boarding">
            Boarding Information
          </option>

          <option value="Transportation">
            School Transportation
          </option>

          <option value="School Visit">
            School Visit
          </option>

          <option value="General Enquiry">
            General Enquiry
          </option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className={labelClass}
        >
          Your Message
          <span className="ml-1 text-orange-600">
            *
          </span>
        </label>

        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={6}
          placeholder="How can we assist you?"
          className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-[#FAFCFA] px-4 py-4 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#176B49] focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Submission */}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#176B49] px-7 py-4 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#105638] hover:shadow-lg sm:w-auto"
      >
        <Send size={19} />
        Continue in Email App
        <ArrowUpRight size={17} />
      </button>

      <div className="space-y-3 border-t border-slate-100 pt-6">
        <p className="flex items-start gap-3 text-xs leading-6 text-slate-500">
          <Mail
            size={17}
            className="mt-1 shrink-0 text-[#176B49]"
          />

          Clicking the button opens your email
          application with the message prepared.
          Please send it from there to complete
          your enquiry.
        </p>

        <p className="flex items-start gap-3 text-xs leading-6 text-slate-500">
          <ShieldCheck
            size={17}
            className="mt-1 shrink-0 text-[#176B49]"
          />

          Your message is not stored in the
          website database by this form.
          Please avoid including sensitive
          personal information.
        </p>
      </div>
    </form>
  );
}
