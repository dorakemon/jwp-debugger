import { CardWithTextTitle } from "@/components/Card";
import { JSONVisualize } from "@/components/JWPVisualizer";

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
  <div className="flex flex-col space-y-4">
    <CardWithTextTitle title={title} disabled>
      <div className="p-4">{value && <JSONVisualize jsonData={value} />}</div>
    </CardWithTextTitle>
  </div>;
};
