"use client"
import React from "react";

export default function Button(fn, children) {
    return (
        <>
            <button onClick={fn}>
                {children}
            </button>
        </>
    )
}