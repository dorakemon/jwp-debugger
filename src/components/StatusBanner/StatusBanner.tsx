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
    <div className={`font-sans ${colorProfile[status].bg} text-sm border-b`}>
      <div className={`py-2 px-4 ${colorProfile[status].text}`}>{children}</div>
    </div>
  );
};
