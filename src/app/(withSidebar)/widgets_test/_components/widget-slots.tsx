"use client";
import React, { useEffect, useRef, useState } from "react";
import Widget from "./widget";

import { Button } from "@/components/ui/button";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import { Lock, Unlock } from "lucide-react";
import { HeaderAction } from "../../_site-header-provider/header-action";

let grid: GridStack;

export default function WidgetSlots() {
  const [items, setItems] = useState([0, 1, 2]);
  const [locked, setLocked] = useState<boolean>(true);

  useEffect(() => {
    grid = GridStack.init({ float: true });
  }, []);

  useEffect(() => {
    grid.updateOptions({ staticGrid: locked });
  }, [locked]);

  const itemRef = useRef(new Map());

  function getMap() {
    return itemRef.current;
  }

  return (
    <>
      <HeaderAction>
        <Button
          variant="ghost"
          asChild
          size="sm"
          className="hidden sm:flex"
          onClick={() => {
            setLocked((prev) => !prev);
          }}
        >
          <span>{locked ? <Lock /> : <Unlock />}</span>
        </Button>
      </HeaderAction>
      <div className="grid-stack w-full">
        {items.map((v) => (
          <div
            className="grid-stack-item"
            key={v}
            gs-w="2"
            gs-h="1"
            ref={(node) => {
              const map = getMap();
              if (node) {
                map.set(v, node);
              } else {
                map.delete(v);
              }
            }}
          >
            <div className="grid-stack-item-content">
              <Widget id={v} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
