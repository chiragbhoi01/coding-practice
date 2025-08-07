import { useState } from "react";

export function useToggle(intialValue = false) {
    const [value , setValue] = useState<boolean>(intialValue)
    const toggle = () => setValue((prevValue) => !prevValue );
    return [toggle , value] as const;
}