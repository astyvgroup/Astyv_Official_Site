// =====================================================================
//  ASTYV — CONTACT PAGE CONTENT
// =====================================================================

const contact = {
  hero: {
    overline: "Get in Touch",
    headline: "Let's Build\nSomething.",
    subheadline:
      "Whether you have a defined project, an early-stage idea, or a talent gap to fill — we'd love to hear from you. No sales pitch. Just a real conversation about how Astyv can help.",
  },

  form: {
    heading: "Tell Us About Your Project",
    subheading: "Astyv responds within 24 hours, often the same day.",
    fields: {
      name:    { label: "Full Name",    placeholder: "John Doe",        required: true },
      email:   { label: "Work Email",   placeholder: "john@company.com",required: true },
      company: { label: "Company",      placeholder: "Your Company",    required: true },
      phone:   { label: "Phone (Optional)", placeholder: "+91 98765 43210", required: false },
      service: {
        label: "What are you interested in?",
        required: true,
        options: [
          "Product Innovation",
          "IT Consulting",
          "IT Services / Software Development",
          "Staffing Solutions",
          "Multiple / Not Sure Yet",
          "Partnership / Other",
        ],
      },
      budget: {
        label: "Estimated Budget Range",
        required: false,
        options: ["Under $50K", "$50K - $150K", "$150K - $500K", "$500K+", "Let's discuss"],
      },
      message: {
        label: "Tell us about your project",
        placeholder: "Share any details about your goals, timeline, or challenges...",
        required: true,
      },
    },
    submitButton: "Send Message",
    successMessage: "Thank you for reaching out. Astyv will review your inquiry and respond within 24 hours.",
    errorMessage: "Something went wrong. Please try again or email us directly at hr@astyv.com.",
  },

  info: {
    heading: "Other Ways to Reach Astyv",
    items: [
      { icon: "Mail",     label: "Email",    value: "hr@astyv.com",                                       link: "mailto:hr@astyv.com" },
      { icon: "Phone",    label: "Phone",    value: "+91 9177681010",                                     link: "tel:+919177681010" },
      { icon: "MapPin",   label: "Office",   value: "WeWork, Financial District, Hyderabad",              link: "https://maps.google.com/?q=WeWork+Raja+Pushpa+Summit+Financial+District+Hyderabad" },
      { icon: "Linkedin", label: "LinkedIn", value: "/company/astyv",                                     link: "https://linkedin.com/company/astyv" },
    ],
  },

  // Quick-response promise (NEW)
  promise: {
    overline: "Our Promise",
    heading: "Real Replies. Fast.",
    items: [
      { icon: "Clock",        title: "24-Hour Response",     description: "Astyv replies to every inquiry within one business day, often within hours." },
      { icon: "MessageSquare",title: "Real Humans, Always",  description: "No chatbots, no auto-responders, no qualification gauntlets. Just a real person who's read your message." },
      { icon: "ShieldCheck",  title: "No Pitch Theater",     description: "If we're not the right fit for what you need, we'll say so — and tell you who to talk to instead." },
    ],
  },
};

export default contact;
