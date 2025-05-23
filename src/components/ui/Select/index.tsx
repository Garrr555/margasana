type Option = {
    label: string
    value: string
    selected?: boolean
}

type Propstype = {
  label?: string;
  name: string;
  defaultValue?: string;
  disable?: boolean;
  options: Option[] | any
};

export default function Select(props: Propstype) {

    const {label, name, defaultValue, disable, options} = props
    console.log(options)

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
        className="py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-third bg-primary rounded-xl"
      >
        {options.map((option: Option) => (
          <option key={option.label} value={option.value} selected={option.selected}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
