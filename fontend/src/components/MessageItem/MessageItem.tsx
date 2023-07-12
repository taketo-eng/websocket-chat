import React, { FC } from "react"

type Props = {
    name: string
    message: string
    isMine: boolean
}

export const MessageItem: FC<Props> = ({ name, message, isMine }) => {
    return (
        <li className={`max-w-[80%] ${isMine ? "ml-auto" : "mr-auto"}`}>
            {!isMine && <p className="ml-3 mb-1 font-medium">{name}</p>}
            <div className={`relative p-3 rounded-2xl text-sm md:text-base ${isMine ? "bg-green-300" : "bg-gray-300"}`}>{message}</div>
        </li>
    )
}
