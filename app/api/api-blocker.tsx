import LRU from "lru-cache";

// Configuración del caché para rate limiting
const rateLimitCache = new LRU({
  max: 500, // cantidad máxima de entradas (IPs)
  ttl: 60 * 60 * 1000, // tiempo de vida en milisegundos (1 hora)
});

export default function handler(req, res) {
  // Obtén la IP; en producción puede venir en 'x-forwarded-for'
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Obtén el contador de solicitudes para esta IP (o 0 si no existe)
  const currentCount = rateLimitCache.get(ip) || 0;

  // Define el límite máximo de solicitudes (1 request por hora)
  const MAX_REQUESTS = 1;

  if (currentCount >= MAX_REQUESTS) {
    return res.status(429).json({
      error: "To many requests from the same IP",
    });
  }

  // Incrementa el contador y guarda en el caché
  rateLimitCache.set(ip, currentCount + 1);

  // Lógica normal de tu endpoint (ejemplo: confirmar form completado)
  res.status(200).json({ message: "Formulario completado exitosamente!" });
}
