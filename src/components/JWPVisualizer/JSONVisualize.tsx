export const JSONVisualize = ({
  jsonData,
  className,
}: { jsonData: string; className?: string }) => {
  const parseJSON = (data: string) => {
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (e) {
        return { error: "Invalid JSON string" };
      }
    }
    return data;
  };

  const parsedData = parseJSON(jsonData);

  const renderValue = (
    value: string | number | boolean | object,
    level = 0,
  ) => {
    const indent = level * 20; // インデント幅

    if (value === null) {
      return <span className="text-purple-600">null</span>;
    }

    switch (typeof value) {
      case "string":
        return <span className="black">"{value}"</span>;
      case "number":
        return <span className="text-purple-600">{value}</span>;
      case "boolean":
        return <span className="text-pink-600">{String(value)}</span>;
      case "object": {
        if (Array.isArray(value)) {
          return (
            <div style={{ marginLeft: indent }}>
              <span className="text-gray-600">[</span>
              <div className="ml-4">
                {value.map((item, index) => (
                  <div key={index}>
                    {renderValue(item, level + 1)}
                    {index < value.length - 1 && (
                      <span className="text-gray-600">,</span>
                    )}
                  </div>
                ))}
              </div>
              <span className="text-gray-600">]</span>
            </div>
          );
        }
        const keys = Object.keys(value);
        return (
          <div style={{ marginLeft: indent }}>
            <span className="text-gray-600">{"{"}</span>
            <div className="ml-4">
              {keys.map((key, index) => (
                <div key={key}>
                  <span className="text-yellow-700">"{key}"</span>
                  <span className="text-gray-600">: </span>
                  {renderValue(value[key as keyof typeof value], level + 1)}
                  {index < keys.length - 1 && (
                    <span className="text-gray-600">,</span>
                  )}
                </div>
              ))}
            </div>
            <span className="text-gray-600">{"}"}</span>
          </div>
        );
      }
      default:
        return <span className="text-gray-800">{String(value)}</span>;
    }
  };

  if (parsedData.error) {
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded">
        {parsedData.error}
      </div>
    );
  }

  return (
    <div
      className={`font-mono text-sm overflow-auto max-h-screen ${className}`}
    >
      {renderValue(parsedData)}
    </div>
  );
};
