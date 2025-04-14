type StatusType = "success" | "warning" | "error";

interface StatusBannerProps {
  status: StatusType;
  children?: React.ReactNode;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({
  status,
  children,
}) => {
  const colorProfile = {
    success: {
      bg: "bg-green-100",
      text: "text-green-800",
    },
    warning: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
    error: {
      bg: "bg-red-100",
      text: "text-red-800",
    },
  };

  return (
    <div className={`font-sans ${colorProfile[status].bg} border-b text-sm`}>
      <div className={`px-4 py-2 ${colorProfile[status].text}`}>{children}</div>
    </div>
  );
};
