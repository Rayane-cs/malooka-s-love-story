import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/Index";

const queryClient = new QueryClient();

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.play().catch(() => {
      // Autoplay might be blocked until user interaction
    });

    let vol = 0;
    const fadeIn = setInterval(() => {
      if (audio.volume < 0.2) {
        vol += 0.01;
        audio.volume = vol;
      } else {
        clearInterval(fadeIn);
      }
    }, 200);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <audio
          ref={audioRef}
          src="/background-music.mp3"
          loop
          autoPlay
          style={{ display: "none" }}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
