export const BenefitsSection = () => {
  const benefits = [
    {
      title: "Learn to Teach Your Child with Confidence",
      description:
        "Joining the masterclass will help you understand how your child learns and get simple, effective strategies to teach them better.",
    },
    {
      title: "Put an End to Your Worrying Thoughts",
      description:
        "This masterclass replaces your uncertainty with a clear, step-by-step roadmap that will make a difference.",
    },
    {
      title: "Turn Your Child into a Lifelong Learner",
      description:
        "What you'll learn will not only benefit your child now, but will invest in your child's future with a love for learning.",
    },
    {
      title: "Give Your Child a Head Start",
      description:
        "Early reading gives your child an advantage in school and life. Strong reading skills lead to better grades and opportunities.",
    },
    {
      title: "Strengthen Your Family Bond",
      description:
        "Teaching your child strengthens your bond and shows them you're their biggest supporter in their learning journey.",
    },
    {
      title: "See Real, Fast Results",
      description:
        "Learn the exact methods that have helped thousands of children read up to 27,000 English words in just 90 days.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="inline-block relative text-3xl md:text-4xl font-bold">
            WHY YOU'LL LOVE IT
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 to-orange-400"></div>
          </h2>
          <p className="text-gray-600 mt-2">AND WHAT YOU CAN EXPECT FROM IT</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-700">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
