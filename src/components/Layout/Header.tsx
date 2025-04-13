export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">JWP</h1>
          </div>
          <nav className="flex space-x-8">
            <a
              href="https://datatracker.ietf.org/doc/html/draft-ietf-jose-json-web-proof"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spec
            </a>
            <a
              href="https://github.com/Cybersecurity-LINKS/json-proof-token/blob/main/README.md#supported-features"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Supported Algorithms
            </a>
            <a
              href="https://github.com/dorakemon/jwp-debugger"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
