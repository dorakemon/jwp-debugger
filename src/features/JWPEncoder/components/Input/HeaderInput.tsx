import { CardWithTextTitle } from "@/components/Card";
import { EditableJSON } from "@/components/JWPVisualizer";
import { StatusBanner } from "@/components/StatusBanner";

type HeaderInputProps = {
  title: string;
  value?: string;
  onChange?: (value: string) => void;
  isValid?: boolean;
  validationError?: string;
};

export const HeaderInput: React.FC<HeaderInputProps> = ({
  title,
  value,
  onChange,
  isValid,
  validationError,
}) => {
  return (
    <CardWithTextTitle title={title}>
      {!isValid && (
        <StatusBanner status="error">{validationError}</StatusBanner>
      )}
      <div className="p-4">
        <EditableJSON jsonData={value ?? ""} onChange={onChange} />
      </div>
    </CardWithTextTitle>
  );
};
