import React from "react";
import { useEffect } from "react";

const FilterType = ({ id, filterType, updateFilterType }) => {
  useEffect(() => {
    const container = document.getElementById(`filterType-radio-container${id}`);
    const matches = container.querySelectorAll("input");
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].value === filterType) {
        matches[i].setAttribute("checked", true);
        return;
      }
    }
  }, [filterType]);
  return (
    <div style={{ background: "white", textAlign: "left", border: "1px solid black" }} id={`filterType-radio-container${id}`}>
      <div>
        <input type="radio" id={`radio-grayscale` + id} value="grayscale" name={`filterType` + id} onChange={() => updateFilterType("grayscale")} />
        <label htmlFor={`radio-grayscale` + id}>grayscale</label>
        <input type="radio" id={`radio-invert` + id} value="invert" name={`filterType` + id} onChange={() => updateFilterType("invert")} />
        <label htmlFor={`radio-invert` + id}>invert</label>
      </div>
      <input type="radio" id={`radio-none` + id} value="none" name={`filterType` + id} onChange={() => updateFilterType("none")} />
      <label htmlFor={`radio-none` + id}>none</label>
    </div>
  );
};

export default FilterType;
