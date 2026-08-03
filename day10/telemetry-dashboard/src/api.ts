// api.ts
import type { Telemetry } from "./types";

const names = [
  "Engine",
  "Battery",
  "GPS",
  "Camera",
  "Motor",
  "Lidar",
  "Radar",
  "Brake",
];

const statuses: Telemetry["status"][] = [
  "Healthy",
  "Warning",
  "Critical",
];

// Initial dataset
export const mockTelemetry: Telemetry[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  name: `${names[i % names.length]} ${i + 1}`,
  temperature: Math.floor(Math.random() * 60) + 20,
  threshold: 80,
  status: "Healthy",
  updatedAt: new Date().toISOString(),
}));

export const getTelemetry = (): Promise<Telemetry[]> => {
  const delay = Math.random() * 500 + 300;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        mockTelemetry.map((sensor) => {
          // Only ~10% of sensors change
          if (Math.random() < 0.1) {
            const temperature = Math.floor(Math.random() * 60) + 20;

            let status: Telemetry["status"] = "Healthy";

            if (temperature >= sensor.threshold) {
              status = "Critical";
            } else if (temperature >= sensor.threshold - 10) {
              status = "Warning";
            }

            return {
              ...sensor,
              temperature,
              status,
              updatedAt: new Date().toISOString(),
            };
          }

          // Preserve the exact same object reference
          return sensor;
        })
      );
    }, delay);
  });
};

export const updateThreshold = async (
  id: string,
  newThreshold: number
): Promise<boolean> => {
  const delay = Math.random() * 500 + 200;

  return new Promise((resolve) => {
    setTimeout(() => {
      const sensor = mockTelemetry.find((s) => s.id === id);

      if (!sensor) {
        resolve(false);
        return;
      }

      sensor.threshold = newThreshold;
      sensor.updatedAt = new Date().toISOString();

      if (sensor.temperature >= sensor.threshold) {
        sensor.status = "Critical";
      } else if (sensor.temperature >= sensor.threshold - 10) {
        sensor.status = "Warning";
      } else {
        sensor.status = "Healthy";
      }

      resolve(true);
    }, delay);
  });
};