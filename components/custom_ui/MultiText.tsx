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
  const addTag = (item: string) => {
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
            addTag(e.currentTarget.value);
          }
        }}
      />

      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((tag, index) => (
          <Badge
            key={index}
            className="bg-pink-400 text-white-1 hover:bg-pink-300"
          >
            {tag}
            <Button
              className="ml-1 rounded-full outline-none hover:bg-red-700"
              onClick={() => onRemove(tag)}
            >
              <X className="h-1 w-1" />
            </Button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
