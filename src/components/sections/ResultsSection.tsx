export const ResultsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="inline-block relative text-3xl md:text-4xl font-bold mb-4">
            REAL CHILDREN, REAL RESULTS
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 to-orange-400"></div>
            <span className="block text-lg text-gray-600 mt-2">
              (here's the proof)
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "TRINESH",
            "NIKITA",
            "DHANYA",
            "ARCHANA",
            "PREETHI",
            "RIDDHI",
            "AKSHARA",
            "HUSSNAIN",
            "PRIYANSH",
          ].map((name) => (
            <div key={name} className="relative group">
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-shadow">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-transparent"></div>
                <span className="relative text-white font-semibold">
                  {name}'s Story
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-8 border-t-4 border-b-4 border-l-purple-600 border-t-transparent border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <p className="font-medium">{name}'s Reading Journey</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
