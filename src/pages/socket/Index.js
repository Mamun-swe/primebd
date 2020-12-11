import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";


const Index = () => {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT)
        console.log(socket)
        socket.on("connection", data => {
            setResponse(data)
            console.log(data)
        });
    }, []);

    return (
        <div>
            <p>
                It's <time dateTime={response}>{response}</time>
            </p>
        </div>
    );
};

export default Index;