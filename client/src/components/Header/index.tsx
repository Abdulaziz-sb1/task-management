import React from 'react'

type Props = {
    name: string;
    buttonComponent?: any; // its a component
    isSmallText?: boolean;
}

const Header = ({name, buttonComponent, isSmallText = false}: Props) => {
    return (
        <div className='flex justify-between'>
            <h1 className={`text-gray-400 ${isSmallText ? "text-lg":"text-2xl"}
             font-semibold dark:text-white`}>
                {name}
            </h1>
            {buttonComponent}
        </div>
    )
}

export default Header; 