import { LRUCache } from "lru-cache";

const rateLimitCache = new LRUCache({
  max: 500, // cantidad máxima de entradas (IPs)
  ttl: 60 * 60 * 1000, // tiempo de vida en milisegundos (1 hora)
});

export default function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const currentCount = rateLimitCache.get(ip) || 0;
  const MAX_REQUESTS = 1;

  if (currentCount >= MAX_REQUESTS) {
    return res.status(429).json({
      error:
        "Demasiadas solicitudes desde esta IP, por favor inténtalo de nuevo más tarde.",
    });
  }

  rateLimitCache.set(ip, currentCount + 1);
  res.status(200).json({ message: "Formulario completado exitosamente!" });
}
