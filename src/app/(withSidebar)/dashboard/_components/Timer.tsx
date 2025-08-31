"use client";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Pause, Play, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [sessionType, setSessionType] = useState<"study" | "shortBreak" | "longBreak">("study");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const originalTimeRef = useRef(25 * 60);

  const sessionDurations = {
    study: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const sessionLabels = {
    study: "Study Session",
    shortBreak: "Short Break",
    longBreak: "Long Break",
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    if (timeLeft === 0 && isRunning) {
      handleSessionComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    setIsRunning(false);

    if (sessionType === "study") {
      onStudyComplete(25);
      setSessionsCompleted((prev) => prev + 1);

      // Determine next session type
      const nextSessionType = sessionsCompleted + 1 >= 4 ? "longBreak" : "shortBreak";
      if (nextSessionType === "longBreak") {
        setSessionsCompleted(0);
      }
      setSessionType(nextSessionType);
    } else {
      setSessionType("study");
    }

    setTimeLeft(
      sessionDurations[sessionType === "study" ? (sessionsCompleted + 1 >= 4 ? "longBreak" : "shortBreak") : "study"]
    );
    originalTimeRef.current =
      sessionDurations[sessionType === "study" ? (sessionsCompleted + 1 >= 4 ? "longBreak" : "shortBreak") : "study"];
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (sessionType === "study") {
      const minutesStudied = Math.floor((originalTimeRef.current - timeLeft) / 60);
      if (minutesStudied > 0) {
        onStudyComplete(minutesStudied);
      }
    }
    setTimeLeft(sessionDurations[sessionType]);
    originalTimeRef.current = sessionDurations[sessionType];
  };

  const handleSetSession = (type: "study" | "shortBreak" | "longBreak") => {
    if (isRunning) return;
    setSessionType(type);
    setTimeLeft(sessionDurations[type]);
    originalTimeRef.current = sessionDurations[type];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((originalTimeRef.current - timeLeft) / originalTimeRef.current) * 100;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">$1,250.00</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Visitors for the last 6 months</div>
        </CardFooter>
      </Card> */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {sessionType === "study" ? (
                <Play className="h-5 w-5 text-blue-500" />
              ) : (
                <Coffee className="h-5 w-5 text-orange-500" />
              )}
              {sessionLabels[sessionType]}
            </div>
            <Badge variant="outline">Pomodoro {sessionsCompleted + 1}/4</Badge>
          </CardTitle>
          <CardDescription>Stay focused and maintain your study momentum</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl tabular-nums text-primary">{formatTime(timeLeft)}</div>
            {/* <Progress value={progress} className="h-3" /> */}
          </div>

          <div className="flex justify-center gap-3">
            {!isRunning ? (
              <Button onClick={handleStart} size="lg" className="px-8">
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : (
              <Button onClick={handlePause} variant="outline" size="lg" className="px-8">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            <Button onClick={handleStop} variant="destructive" size="lg">
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={sessionType === "study" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSetSession("study")}
              disabled={isRunning}
            >
              Study (25m)
            </Button>
            <Button
              variant={sessionType === "shortBreak" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSetSession("shortBreak")}
              disabled={isRunning}
            >
              Break (5m)
            </Button>
            <Button
              variant={sessionType === "longBreak" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSetSession("longBreak")}
              disabled={isRunning}
            >
              Long (15m)
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-2xl text-primary">{sessionsCompleted}</p>
              <p className="text-sm text-muted-foreground">Sessions Today</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-primary">{Math.floor((originalTimeRef.current - timeLeft) / 60)}</p>
              <p className="text-sm text-muted-foreground">Minutes Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
function onStudyComplete(arg0: number) {
  throw new Error("Function not implemented.");
}
