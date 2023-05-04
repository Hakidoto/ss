import { useState } from "react";
import Select from "react-select";

//options prop example
/* const options = [
  { value: 'opcion1', label: 'Opción 1' },
  { value: 'opcion2', label: 'Opción 2' },
  { value: 'opcion3', label: 'Opción 3' },
  { value: 'opcion4', label: 'Opción 4' },
]; */

const MultiSelect = ({ options, ...props }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    props?.defaultValue || [],
  );

  const handleChange = (selected) => {
    props.getValue && props?.getValue(selected.value);
    setSelectedOptions(selected);
  };

  return (
    <div className="w-full max-w-xs">
      <Select
        options={options}
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        className="w-full"
        classNamePrefix="select"
        {...props}
      />
    </div>
  );
};

export default MultiSelect;
