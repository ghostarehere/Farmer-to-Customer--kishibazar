import { useState } from "react";
import { C } from "../styles/theme";

// ══════════════════════════════════════════════════════════════
// Stars — Star rating display, or interactive rating input
// when `onChange` is supplied.
// ══════════════════════════════════════════════════════════════
export default function Stars({ value, onChange, size = 20 }) {
  const [hover, setHover] = useState(0);
  return (
    <span>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            fontSize: size,
            cursor: onChange ? "pointer" : "default",
            color: (hover || value) >= s ? C.harvest : "#ddd",
          }}
          onClick={() => onChange && onChange(s)}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      ))}
    </span>
  );
}
