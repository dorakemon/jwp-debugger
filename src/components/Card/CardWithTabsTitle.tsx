import { BaseCard } from "./BaseCard";

type CardWithTabsTitleProps = {
  activeTabKey: string;
  tabTitles: Record<string, string>;
  onTabClick?: (tabTitle: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
};

export const CardWithTabsTitle: React.FC<CardWithTabsTitleProps> = ({
  activeTabKey,
  tabTitles,
  onTabClick = () => {},
  disabled = false,
  children,
}) => {
  return (
    <BaseCard
      TitleComponent={
        <div className="flex">
          {Object.entries(tabTitles).map(([key, tabTitle]) => (
            <button
              key={key}
              className={`py-2 px-4 mr-2 text-sm ${
                activeTabKey === key
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => onTabClick(key)}
            >
              {tabTitle}
            </button>
          ))}
        </div>
      }
      BodyComponent={children}
      disabled={disabled}
    />
  );
};
