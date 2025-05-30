// src/DailyProgress.tsx
import { Box, Typography, CircularProgress } from "@mui/material";

interface DailyProgressProps {
  completed: number; // e.g., 3 activities done
  total: number;     // e.g., 5 activities total
}

export function DailyProgress({ completed, total }: DailyProgressProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isGoodProgress = percentage >= 51;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "400px",
        background: "linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 100%)",
        borderRadius: "16px",
        padding: 4,
        boxShadow: "0 2px 10px rgba(236, 72, 153, 0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ec4899" }}>
        🎯 Daily Progress
      </Typography>

      {/* Circular Progress */}
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={120}
          thickness={5}
          sx={{
            color: isGoodProgress ? "#22c55e" : "#ec4899",
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: isGoodProgress ? "#22c55e" : "#ec4899" }}>
            {percentage}%
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "#6b21a8" }}>
            {completed}/{total} Done
          </Typography>
        </Box>
      </Box>

      {/* Small motivational text */}
      <Typography sx={{ fontSize: "0.9rem", textAlign: "center", color: "#831843" }}>
        {percentage === 100
          ? "🌟 Perfect day! Amazing job!"
          : percentage >= 70
          ? "💪 Almost there, keep pushing!"
          : percentage >= 30
          ? "🚀 Great start, you can do more!"
          : "✨ Let's get moving!"}
      </Typography>
    </Box>
  );
}
