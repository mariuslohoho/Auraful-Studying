import React from "react";

export default function Widget({ id }: { id: number }) {
  return <div className="bg-red-500 w-full h-full">Widget {id}</div>;
}
