export default function Select({label, name, disable, defaultValue, options}){
    return (
      <div className="flex flex-col my-4">
        <label htmlFor={name} className="mx-2">
          {label}
        </label>
        <select
          name={name}
          id={name}
          defaultValue={defaultValue}
          disabled={disable}
          className="py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-white/80 bg-primary rounded-xl"
        >
          {options.map((option, i) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
}