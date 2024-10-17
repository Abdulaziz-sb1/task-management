import React from 'react';

type Props = {
    name: string;
    buttonComponent?: React.ReactNode; // Allows for any renderable React node
    isSmallText?: boolean;
};

const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
    return (
        <div className='flex justify-between'>
            <h1 className={`text-gray-400 ${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}>
                {name}
            </h1>
            {buttonComponent} {/* Render the button component directly */}
        </div>
    );
}

export default Header;
