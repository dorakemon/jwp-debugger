export const DebuggerHeader = () => {
  return (
    <header className="mb-10">
      <h1 className="bg-gradient-to-r from-blue-600 to-indigo-900 bg-clip-text font-extrabold text-4xl text-transparent tracking-tight">
        JSON Web Proof (JWP) Debugger
      </h1>
      <p className="mt-2 text-gray-500">
        Created by{" "}
        <a
          href="https://github.com/dorakemon"
          className="font-bold underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          @dorakemon
        </a>
        , Inspired by{" "}
        <a
          href="https://jwt.io"
          className="font-bold underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          jwt.io
        </a>
      </p>
    </header>
  );
};
