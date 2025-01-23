import { useState } from "react";

const useToggle = (defaultValue = false): [boolean, () => void] => {

  const [value, setValue] = useState<boolean>(defaultValue);
  const toggleValue = () => {
    setValue((prev) => !prev);
  }
  return [value, toggleValue]
}

export default useToggle