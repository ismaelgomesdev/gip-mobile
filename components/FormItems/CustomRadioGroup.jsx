import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const CustomRadioGroup = ({ name, label, options }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide mt-2">
        {options.map((option, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-center p-4 min-w-[100px] rounded-md cursor-pointer transition-all ease-in-out duration-300 ${
              field.value === option.value
                ? 'bg-orange-500 text-white shadow-lg font-bold'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => helpers.setValue(option.value)}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={field.value === option.value}
              onChange={() => helpers.setValue(option.value)}
              className="absolute opacity-0 cursor-pointer"
            />
            <span className="flex items-center">
              <span
                className={`relative w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  field.value === option.value ? 'border-white' : 'border-gray-500'
                }`}
              >
                {field.value === option.value && (
                  <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                )}
              </span>
              <span className="ml-2">{option.label}</span>
            </span>
          </div>
        ))}
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

CustomRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

CustomRadioGroup.defaultProps = {
  label: 'Selecione uma opção',
};

export default CustomRadioGroup;
