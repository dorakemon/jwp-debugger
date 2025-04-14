type BaseCardProps = {
  isActive?: boolean;
  disabled?: boolean;
  TitleComponent: React.ReactNode;
  BodyComponent: React.ReactNode;
  onClick?: () => void;
};

export const BaseCard: React.FC<BaseCardProps> = ({
  isActive = false,
  disabled = false,
  TitleComponent,
  BodyComponent,
  onClick,
}) => {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={`cursor-pointer overflow-hidden rounded-lg border border-gray-200 font-mono outline-4 ${
        isActive ? " outline-blue-600" : "outline-transparent"
      } ${disabled ? "bg-gray-100" : ""} `}
      onClick={onClick}
    >
      <div className="border-gray-200 border-b">{TitleComponent}</div>
      <div>{BodyComponent}</div>
    </div>
  );
};
