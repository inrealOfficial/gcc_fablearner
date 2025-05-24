export const FaqSection = () => {
  const faqs = [
    {
      question: "Will I get a recording if I miss the session?",
      answer:
        "Please attend live to gain full benefits of the live masterclass. Recordings will be provided to those who ask for it.",
    },
    {
      question: "How long is the session?",
      answer:
        "Each session lasts 90 minutes (6:00 PM to 7:30 PM) on May 24th and 25th, 2025.",
    },
    {
      question: "Why is this so cheap?",
      answer:
        "We believe every child deserves the gift of reading. Our mission is to make high-quality education accessible to all families.",
    },
    {
      question: "Do I need any experience to teach my child?",
      answer:
        "No prior teaching experience is required. Our step-by-step method is designed for all parents, regardless of background.",
    },
    {
      question: "What happens after I register?",
      answer:
        "You'll receive a confirmation email with the link to join the masterclass and all necessary materials to prepare.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="inline-block relative text-3xl md:text-4xl font-bold">
            WE'VE GOT ALL THE ANSWERS FOR YOU!
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 to-orange-400"></div>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <details className="group">
                <summary className="flex justify-between items-center font-semibold cursor-pointer p-6">
                  <span>
                    {index + 1}. {faq.question}
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                </summary>
                <div className="p-6 pt-0 border-t border-gray-100">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
