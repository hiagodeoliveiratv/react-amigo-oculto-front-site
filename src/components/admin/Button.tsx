type Props = {
    value: string;
    onClick: () => void;
    disabled?: boolean;
}

export const Button = ( { value, onClick, disabled } : Props) => {

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full my-3 p-2 rounded bg-gray-700 text-white font-bold uppercase hover:bg-gray-600
            border-b-4 border-white/10 text-center"
        >
            {value}
        </button>
    );
}