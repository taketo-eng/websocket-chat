import React, { FC } from "react"

export const Header: FC = () => {
    return (
        <header className="fixed left-0 right-0 top-0 bg-black/90 backdrop-blur-sm h-14">
            <div className="flex items-center justify-center h-full w-full px-4">
                <h1 className="text-white font-bold text-2xl">Websocket Chat</h1>
            </div>
        </header>
    )
}
