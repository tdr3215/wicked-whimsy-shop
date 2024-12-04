"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiTextProps {
  value: string[];
  placeholder: string;
  onChange: (args: string) => void;
  onRemove: (args: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  value,
  placeholder,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };
  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(e.currentTarget.value);
          }
        }}
      />

      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((value, index) => (
          <Badge
            key={index}
            className="bg-pink-400 text-white-1 hover:bg-pink-300"
          >
            {value}
            <button
              className="ml-1 rounded-full  hover:bg-red-700"
              onClick={() => onRemove(value)}
            >
              <X className="h-4 w-4" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
