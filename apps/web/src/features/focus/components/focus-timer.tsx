'use client';

import { Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useCompleteFocus, useStartFocus } from '../hooks/use-focus';

const DEFAULT_SECONDS = 25 * 60;
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Pomodoro focus timer. Starting persists a real focus session; finishing
 * records the elapsed time, feeding focus-hour analytics. */
export function FocusTimer() {
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS);
  const [running, setRunning] = useState(false);
  const sessionId = useRef<string | null>(null);

  const startFocus = useStartFocus();
  const completeFocus = useCompleteFocus();

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (seconds === 0 && running && sessionId.current) {
      const id = sessionId.current;
      sessionId.current = null;
      setRunning(false);
      completeFocus.mutate({ id, input: { actualSeconds: DEFAULT_SECONDS, interruptions: 0 } });
    }
  }, [seconds, running, completeFocus]);

  const toggle = async () => {
    if (!running && !sessionId.current) {
      const session = await startFocus.mutateAsync({ plannedMinutes: 25 });
      sessionId.current = session.id;
    }
    setRunning((r) => !r);
  };

  const reset = () => {
    setRunning(false);
    setSeconds(DEFAULT_SECONDS);
    sessionId.current = null;
  };

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  const progress = (seconds / DEFAULT_SECONDS) * 100;

  return (
    <div className="border-border bg-card rounded-2xl border p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
          Focus Timer
        </p>
        <span className="border-border bg-surface text-muted-foreground rounded-md border px-2 py-0.5 text-[10px]">
          Pomodoro
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <svg width="104" height="104" viewBox="0 0 104 104">
            <circle
              cx="52"
              cy="52"
              r={RADIUS}
              fill="none"
              strokeWidth="5"
              className="stroke-muted"
            />
            <circle
              cx="52"
              cy="52"
              r={RADIUS}
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE}
              className="stroke-foreground transition-[stroke-dashoffset] duration-1000 ease-linear"
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-foreground font-mono text-xl font-bold tracking-tighter">
              {mins}:{secs}
            </span>
            <span className="text-muted-foreground text-[10px]">remaining</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void toggle()}
            disabled={startFocus.isPending}
            className="bg-foreground text-background flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {running ? (
              <Pause className="fill-background size-3.5" />
            ) : (
              <Play className="fill-background size-3.5" />
            )}
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset timer"
            className="border-border text-muted-foreground hover:bg-accent hover:text-foreground flex size-8 items-center justify-center rounded-xl border transition-colors"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
