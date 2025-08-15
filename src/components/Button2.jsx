import React from "react";
// import { Button as Button_1 } from "@/components/ui/button"

export default function Button2({
    children, // emni naam dise children 
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}
