import React, {FC, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons"

type SelectPropsType = {
    selectHandler(option: any): void,
    options: {
        label: string,
        value: any
    }[]
}

export const Select: FC<SelectPropsType> = (props) => {
    const {selectHandler, options} = props
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)
    const [selectedOptionId, setSelectedOptionId] = useState(0)

    const setSelectedThenCloseDropdown = (index: number) => {
        setSelectedOptionId(index)
        selectHandler(options[index].value)
        setIsOptionsOpen(false)
    }

    const mouseListener = (event: MouseEvent) => {
        const element = event.target as Element
        if (!element.classList.contains('options') && !element.classList.contains('select-button')) {
            setIsOptionsOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', mouseListener)
    }, [window.onload])

    return (
        <div className={"select-wrapper flex-container align-items-center"}>
            <div className={"select-container"}>
                <button type={"button"} aria-haspopup={"listbox"} aria-expanded={isOptionsOpen} className={"select-button " + (isOptionsOpen ? "expanded" : "")} onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                    {options[selectedOptionId].label}
                </button>
                <ul className={`options ${isOptionsOpen ? "show" : ""}`} role={"listbox"} aria-activedescendant={options[selectedOptionId].label} tabIndex={-1}>
                    {
                        options.map((option, index) => (
                            <li key={index} id={option.label} role={"option"} aria-selected={selectedOptionId == index} tabIndex={0} onClick={() => setSelectedThenCloseDropdown(index)}>
                                {option.label}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <FontAwesomeIcon icon={faCaretDown} className={'icon'} />
        </div>
    )
}