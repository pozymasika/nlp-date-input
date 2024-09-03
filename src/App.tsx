import "./App.css";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import * as chrono from "chrono-node";
import { useState } from "react";
import { cn } from "@/lib/utils";

function App() {
  const [text, setText] = useState("");
  const [date, setDate] = useState<Date>();

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const parsed = chrono.parseDate(value);
    if (parsed) {
      setDate(parsed);
    }

    setText(value);
  };

  const time = date?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"default"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPPp") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="w-full p-2">
            <Input
              className="w-full"
              value={text}
              onChange={onInputChange}
              placeholder="Find date"
            />
          </div>
          <Calendar
            mode="single"
            selected={date}
            month={date || new Date()}
            onSelect={setDate}
            initialFocus
          />
          {time && <div className="text-center my-2">{time}</div>}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default App;
