import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

export interface Position {
  left: number;
  width: number;
  opacity: number;
}

export const SlideTabs = () => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  // State to track the currently selected tab, defaulting to the first tab (index 0)
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  // This effect runs when the component mounts or when the selected tab changes.
  // It calculates the position of the selected tab and sets the cursor.
  useEffect(() => {
    const updatePosition = () => {
      const selectedTab = tabsRef.current[selected];
      if (selectedTab) {
        const { width } = selectedTab.getBoundingClientRect();
        setPosition({
          left: selectedTab.offsetLeft,
          width,
          opacity: 1,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [selected]);

  return (
    <ul
      onMouseLeave={() => {
        // When the mouse leaves the container, reset the cursor
        // to the position of the currently selected tab.
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect();
          setPosition({
            left: selectedTab.offsetLeft,
            width,
            opacity: 1,
          });
        }
      }}
      className="relative mx-auto flex w-fit min-w-[320px] sm:min-w-[460px] md:min-w-[580px] lg:min-w-[660px] justify-between items-center rounded-full border-[1.5px] border-white/60 bg-black/40 backdrop-blur-md shadow-lg shadow-black/40 p-1"
    >
      {["Home", "Portfolio", "Sell/Buy", "Agents"].map((tab, i) => (
        <Tab
          key={tab}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          setPosition={setPosition}
          onClick={() => setSelected(i)}
        >
          {tab}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  onClick: () => void;
}

// The Tab component is wrapped in forwardRef to accept a ref from its parent.
const Tab = React.forwardRef<HTMLLIElement, TabProps>(({ children, setPosition, onClick }, ref) => {
  const localRef = useRef<HTMLLIElement | null>(null);

  return (
    <li
      ref={(node) => {
        localRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLLIElement | null>).current = node;
        }
      }}
      onClick={onClick}
      onMouseEnter={() => {
        const target = localRef.current;
        if (!target) return;

        const { width } = target.getBoundingClientRect();

        setPosition({
          left: target.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 flex-1 block cursor-pointer px-3 py-1.5 text-[11px] uppercase tracking-wider text-white mix-blend-difference sm:px-5 sm:text-xs md:px-7 md:py-2 md:text-xs font-semibold whitespace-nowrap text-center select-none"
    >
      {children}
    </li>
  );
});

Tab.displayName = "Tab";

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute inset-y-1 z-0 rounded-full bg-black dark:bg-white"
    />
  );
};

export default SlideTabs;
