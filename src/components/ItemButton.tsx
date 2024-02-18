import { IconType } from "react-icons";
import Link from "next/link";

type Props = {
    IconElement?: IconType;
    label?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    replace?: boolean; // Redireciona sem colocar no histórico
}


export const ItemButton = ( { IconElement, label, onClick, href, target, replace} : Props) => {

    const content = (
        <div className="p-3 flex flex-col justify-center items-center gap-2 md:flex-row">
            <div>{IconElement && <IconElement />}</div>
            {label && <div>{label}</div>}
        </div>
    );

    return (
        <div className="rounded hover:bg-gray-800">
            {href && !onClick &&
                <Link
                    href={href}
                    target={target}
                    replace={replace}
                >{content}</Link>
            }

            {!href && onClick &&
                <div onClick={onClick} className="cursor-pointer">{content}</div>
            }
        </div>
    )
}