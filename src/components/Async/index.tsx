import { TIMEOUT } from "dns";
import { useEffect, useState } from "react";

export function Async() {
  const [buttonIsVisible, setButtonIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setButtonIsVisible(true);
    }, 1000);
  }, []);

  return (
    <div>
      Hello world!
      {buttonIsVisible && <button>button</button>}
    </div>
  );
}
