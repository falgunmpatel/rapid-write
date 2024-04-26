import React, {useId} from 'react'

function Select({
    options = [],
    label,
    className = '',
    ...props
}, ref) {
    const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={`px-3 py-2 bg-white text-black outline-none border focus:bg-stone-50 border-stone-200 w-full duration-200 rounded  ${className}`}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
