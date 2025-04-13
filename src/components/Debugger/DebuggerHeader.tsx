export const DebuggerHeader = () => {
  return (
    <header className="mb-10">
      <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-900 bg-clip-text text-transparent">
        JSON Web Proof (JWP) Debugger
      </h1>
      <p className="mt-2 text-gray-500">
        Created by{" "}
        <a
          href="https://github.com/dorakemon"
          className="underline underline-offset-2 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          @dorakemon
        </a>
        , Inspired by{" "}
        <a
          href="https://jwt.io"
          className="underline underline-offset-2 font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          jwt.io
        </a>
      </p>
    </header>
  );
};
