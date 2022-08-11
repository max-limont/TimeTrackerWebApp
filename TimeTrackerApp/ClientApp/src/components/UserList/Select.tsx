import React, {FC, useState} from 'react';

interface Prop{
    selectHandler(option: any): void,
    options: {label: string, value: any}[]
}

const Select: FC<Prop> = ({selectHandler, options}) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)
    const [selectedOptionId, setSelectedOptionId] = useState(0)

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen)
    }

    const setSelectedThenCloseDropdown = (index: number) => {
        setSelectedOptionId(index)
        selectHandler(options[selectedOptionId].value)
        setIsOptionsOpen(false)
    }

    const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLLIElement>) => {
        switch (e.key) {
            case " ":
            case "SpaceBar":
            case "Enter":
                e.preventDefault()
                setSelectedThenCloseDropdown(index)
                break
            default:
                break
        }
    }

    const handleListKeyDown = (e: React.KeyboardEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLUListElement>) => {
        switch (e.key) {
            case "Escape":
                e.preventDefault()
                setIsOptionsOpen(false)
                break
            case "ArrowUp":
                e.preventDefault()
                setSelectedOptionId(
                    selectedOptionId - 1 >= 0 ? selectedOptionId - 1 : options.length - 1
                )
                break
            case "ArrowDown":
                e.preventDefault()
                setSelectedOptionId(
                    selectedOptionId == options.length - 1 ? 0 : selectedOptionId + 1
                )
                break
            default:
                break
        }
    }

    return (
        <div className="selectWrapper">
            <div className="selectContainer">

                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOptionsOpen}
                    className={"selectBtn " + (isOptionsOpen ? "expanded" : "")}
                    onClick={toggleOptions}
                    onKeyDown={handleListKeyDown}
                >
                    {options[selectedOptionId].label}
                </button>

                <ul
                    className={`options 
                    ${isOptionsOpen ? "show" : ""}`}
                    role="listbox"
                    aria-activedescendant={options[selectedOptionId].label}
                    tabIndex={-1}
                    onKeyDown={handleListKeyDown}
                >
                    {options.map((option, index) => (
                        <li
                            key={index}
                            id={option.label}
                            role="option"
                            aria-selected={selectedOptionId == index}
                            tabIndex={0}
                            onKeyDown={handleKeyDown(index)}
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