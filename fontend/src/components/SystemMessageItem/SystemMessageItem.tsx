import React, { FC } from "react"

type Props = {
    message: string
}

export const SystemMessageItem: FC<Props> = ({ message }) => {
    return <li className="text-sm text-gray-600 text-center my-3">--{message}--</li>
}
