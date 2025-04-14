import { AlertTriangleIcon } from "lucide-react";

const SpecList = [
  {
    name: "JSON Web Proof",
    url: "https://datatracker.ietf.org/doc/html/draft-ietf-jose-json-web-proof",
  },
  {
    name: "JSON Proof Algorithms",
    url: "https://datatracker.ietf.org/doc/html/draft-ietf-jose-json-proof-algorithms",
  },
  {
    name: "JSON Proof Token",
    url: "https://datatracker.ietf.org/doc/html/draft-ietf-jose-json-proof-token",
  },
];

export const DebuggerDescription = () => {
  return (
    <div className="mb-8 flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-4 lg:p-6">
      <span>
        JSON Web Proof (JWP) is a specification under development by the IETF
        JOSE Working Group.
      </span>
      <span>JWP and its related specifications are listed below.</span>
      <ul className="my-4 pl-4">
        {SpecList.map((spec) => (
          <li key={spec.url} className="text-gray-700">
            <a
              href={spec.url}
              className="text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {spec.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangleIcon className="h-5 w-5 text-yellow-800" />
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-sm text-yellow-800">
              Important Notice
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                JWP is currently under development and this implementation may
                not reflect the latest specification changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
