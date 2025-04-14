import { BaseCard } from "./BaseCard";

type CardWithTextTitleProps = {
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const CardWithTextTitle: React.FC<CardWithTextTitleProps> = ({
  title,
  children,
  isActive,
  disabled,
  onClick,
}) => {
  return (
    <BaseCard
      TitleComponent={
        <div className="text-sm font-medium pl-4 py-2">{title}</div>
      }
      BodyComponent={children}
      isActive={isActive}
      disabled={disabled}
      onClick={onClick}
    />
  );
};
