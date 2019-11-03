import React, { useState } from "react";
import { LabeledComponent, InputField } from "../common";
import { useTranslation, withTranslation } from "react-i18next";
import { convertTemp } from "../../utils";
import { useInputField } from "../../hooks";
import { useEffect } from "react";

const ConversionCalculator = () => {
  const { t } = useTranslation();
  const [tempType, setTempType] = useState("F");
  const [convertedTemp, setConvertedTemp] = useState(
    convertTemp("32", tempType)
  );
  const tempInput = useInputField("32");
  useEffect(() => {
    if (tempInput.value) {
      setConvertedTemp(convertTemp(tempInput.value, tempType));
    }
  }, [tempInput.value]);

  const setTemperature = () => {
    if (tempInput.value) {
      if (tempType === "F") {
        setTempType("C");
        setConvertedTemp(convertTemp(tempInput.value, "C"));
        return;
      }
      setTempType("F");
      setConvertedTemp(convertTemp(tempInput.value, "F"));
    }
    // setTempType(tempType === "F" ? "C" : "F");
    // setConvertedTemp(convertTemp("32", tempType));
  };
  return (
    <>
      {/* <div className="calculatorContainer"> */}
      <LabeledComponent label={t("TEMPERATURE")}>
        <InputField
          type="number"
          inputClassname="currentBalance"
          onChange={tempInput.onChange}
          value={tempInput.value}
          autoFocus={true}
        />
      </LabeledComponent>
      <button onClick={setTemperature} disabled={!tempInput.value}>
        {tempType === "F" ? t("SHOW_FAHRENHEIT") : t("SHOW_CELSIUS")}
      </button>
      {/* </div> */}
      <div>{tempInput.value && convertedTemp}</div>
    </>
  );
};

export default withTranslation()(ConversionCalculator);
