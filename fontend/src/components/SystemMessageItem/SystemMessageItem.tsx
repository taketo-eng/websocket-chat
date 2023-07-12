import { Message } from "@/types/Message"
import { formatDate } from "@/utils/date"
import React, { FC } from "react"

export const SystemMessageItem: FC<Message> = ({ message, sendTime }) => {
    return (
        <li className="text-sm text-gray-600 text-center my-3">
            --{message} : {formatDate(sendTime, "yyyy.MM.dd.HH.mm")}--
        </li>
    )
}
