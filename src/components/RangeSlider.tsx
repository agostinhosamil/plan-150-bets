import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

type RangeSliderProps = {
  onChange?: (event: ChangeResult) => void;
};

export const RangeSlider = ({ onChange }: RangeSliderProps) => {
  const multiRangeSliderInputHandler = (e: ChangeResult) => {
    if (typeof onChange === "function") {
      onChange(e);
    }
  };

  return (
    <div className="w-full [&_*]:!shadow-none [&_*]:!border-none [&_*]:after:!border-none [&_*]:before:!border-none [&_*]:after:!shadow-none [&_*]:before:!shadow-none">
      <MultiRangeSlider
        onChange={multiRangeSliderInputHandler}
        style={{
          border: "none",
          boxShadow: "none",
          padding: "0px",
          backgroundColor: "red",
        }}
        ruler={false}
        label={false}
        barInnerColor="#ef4444"
        thumbLeftColor="#ef4444"
        thumbRightColor="#ef4444"
        barLeftColor="#d0d0d0"
        barRightColor="#d0d0d0"
        className="bg-pink-500"
      />
    </div>
  );
};
