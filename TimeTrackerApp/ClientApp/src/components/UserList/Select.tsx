import React, {FC, useState} from 'react';

interface Prop{
    selectHandler(option: any): void,
    options: {label: string, value: any}[]
}

const Select: FC<Prop> = ({selectHandler, options}) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)
    const [selectedOptionId, setSelectedOptionId] = useState(0)

    const setSelectedThenCloseDropdown = (index: number) => {
        setSelectedOptionId(index)
        console.log(options)
        console.log(index)
        selectHandler(options[index].value)
        setIsOptionsOpen(false)
    }

    return (
        <div className="selectWrapper">
            <div className="selectContainer">

                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOptionsOpen}
                    className={"selectBtn " + (isOptionsOpen ? "expanded" : "")}
                    onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                >
                    {options[selectedOptionId].label}
                </button>

                <ul
                    className={`options 
                    ${isOptionsOpen ? "show" : ""}`}
                    role="listbox"
                    aria-activedescendant={options[selectedOptionId].label}
                    tabIndex={-1}
                >
                    {options.map((option, index) => (
                        <li
                            key={index}
                            id={option.label}
                            role="option"
                            aria-selected={selectedOptionId == index}
                            tabIndex={0}
                            onClick={() => {
                                setSelectedThenCloseDropdown(index);
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Select;