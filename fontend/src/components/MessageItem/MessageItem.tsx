import { Message } from "@/types/Message"
import { formatDate } from "@/utils/date"
import React, { FC } from "react"

type Props = {
    isMine: boolean
} & Message

export const MessageItem: FC<Props> = ({ name, message, sendTime, isMine }) => {
    return (
        <li className={`max-w-[80%] ${isMine ? "ml-auto" : "mr-auto"}`}>
            <div className="flex gap-2">
                {!isMine && <p className="ml-3 mb-1 font-medium">{name}</p>}
                <span>{formatDate(sendTime, "yyyy.MM.dd.HH.mm")}</span>
            </div>
            <div className={`relative p-3 rounded-2xl text-sm md:text-base ${isMine ? "bg-green-300" : "bg-gray-300"}`}>{message}</div>
        </li>
    )
}
