import React from 'react';

export type SelectProps = {
  options: string[];
  value: string;
  updateValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  index: string;
}

const Select: React.SFC<SelectProps> = ({ options, updateValue, value, index }) => (
  <select onChange={updateValue} value={value} id={index}>
    {options.map((item, i) => (
      <option key={i} value={item}>
        {item}
      </option>       
    ))}
  </select>
);


export default React.memo(Select);
