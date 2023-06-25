import { ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
    titleCenter?: boolean;
};

const Card = ({ title, children, titleCenter }: Props) => {
    return (
        <div
            className={`block border rounded-lg p-6 shadow ${
                titleCenter && "text-center"
            }`}
        >
            <p className="text-2xl tracking-tight mb-2">{title}</p>
            <div className="">{children}</div>
        </div>
    );
};

export default Card;
