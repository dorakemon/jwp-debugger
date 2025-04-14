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
        <div className="py-2 pl-4 font-medium text-sm">{title}</div>
      }
      BodyComponent={children}
      isActive={isActive}
      disabled={disabled}
      onClick={onClick}
    />
  );
};
