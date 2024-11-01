import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

const Delete = () => {
  return (
    <Button className="bg-pink-800 text-white-1">
      <Trash className="h-4 w-4" />
    </Button>
  );
};

export default Delete;
