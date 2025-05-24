export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="inline-block relative text-3xl md:text-4xl font-bold">
            DOES IT REALLY WORK?
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 to-orange-400"></div>
          </h2>
          <p className="text-gray-600 mt-2">
            JUST READ WHAT PARENTS SAY ABOUT FAB MASTERCLASS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                  P{num}
                </div>
                <div className="ml-4">
                  <div className="text-yellow-400">★★★★★</div>
                  <p className="text-sm text-gray-500">
                    Parent of a 3-year-old
                  </p>
                </div>
              </div>
              <p className="text-gray-700">
                "This program transformed how I teach my child! The methods are
                simple yet incredibly effective. My child is now reading beyond
                their age level."
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
