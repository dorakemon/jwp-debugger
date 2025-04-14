export const Header = () => {
  return (
    <header className="border-gray-200 border-b bg-white py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="font-bold text-2xl text-blue-600">JWP</h1>
          </div>
          <nav className="flex space-x-8">
            <a
              href="https://datatracker.ietf.org/doc/html/draft-ietf-jose-json-web-proof"
              className="text-gray-600 transition-colors hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spec
            </a>
            <a
              href="https://github.com/Cybersecurity-LINKS/json-proof-token/blob/main/README.md#supported-features"
              className="text-gray-600 transition-colors hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Supported Algorithms
            </a>
            <a
              href="https://github.com/dorakemon/jwp-debugger"
              className="text-gray-600 transition-colors hover:text-blue-600"
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
