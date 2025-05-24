export const ScheduleSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-red-500 transform hover:-translate-y-1 transition-transform">
            <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              DAY 1
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              7 DEADLY MISTAKES THAT STOP KIDS FROM LEARNING TO READ
            </h3>
            <p className="text-gray-600">
              Most parents make these without even realizing it.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 transform hover:-translate-y-1 transition-transform">
            <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              DAY 2
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              THE 15-MINUTE METHOD TO TEACH READING BEFORE AGE 3
            </h3>
            <p className="text-gray-600">
              Used by 2,000+ parents — no tutors, no stress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
