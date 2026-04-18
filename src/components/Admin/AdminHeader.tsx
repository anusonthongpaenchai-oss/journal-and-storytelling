import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

type AdminHeaderProps = {
    title: string,
    button_1: boolean,
    buttonLabel_1: string,
    icon_1?: ReactNode,
    variant_1: string,
    onClick_1: () => void,
    button_2?: boolean,
    buttonLabel_2?: string,
    icon_2?: ReactNode,
    variant_2?: string,
    onClick_2?: () => void,
}

function AdminHeader({
    title,
    button_1,
    buttonLabel_1,
    icon_1,
    variant_1,
    onClick_1,
    button_2,
    buttonLabel_2,
    icon_2,
    variant_2,
    onClick_2,
}: AdminHeaderProps) {
    return (
        <header className="flex flex-row items-center justify-between gap-[40px] border-b border-brown-300 bg-white px-[60px] py-[24px]">
            <span className="text-headline-3 text-brown-600">
                {title}
            </span>

            <div className="flex flex-row gap-[8px]">
            {button_1 && (
                <Button
                    label={buttonLabel_1} 
                    icon={icon_1}
                    variant={variant_1 as "primary" | "secondary"}
                    onClick={onClick_1} />
            )}

            {button_2 && (
                <Button
                    label={buttonLabel_2}
                    icon={icon_2} 
                    variant={variant_2 as "primary" | "secondary"}
                    onClick={onClick_2} />
            )}
            </div>

        </header>
    )
}

export default AdminHeader;