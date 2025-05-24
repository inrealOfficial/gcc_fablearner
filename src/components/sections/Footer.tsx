export const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">
            The #1 Family-Centred Ed-Tech Provider in India
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300">
                  Who We Are
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300">
                  FAB Masterclass
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <address className="not-italic">
              B5 Sheetal Apartment,
              <br />
              New Hall Road Kurla (West),
              <br />
              Mumbai, 400070,
              <br />
              India
            </address>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-purple-300">
          <p>© 2025 FAB Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
