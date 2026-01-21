import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import { CheckIcon } from '@chakra-ui/icons'

function Registration() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center gap-[40px] bg-brown-200 w-[798px] px-[120px] py-[60px] rounded-[16px]">
            <div className="bg-brand-green rounded-full p-[16px]">
                <CheckIcon className="text-white  text-[48px]" />
            </div>

            <h2 className="text-headline-2"> Registration Success </h2>
            <Button label='Continue' variant="primary" width='w-[158px]' onClick={() => navigate('/')} />
        </div>
    )
}

export default Registration;