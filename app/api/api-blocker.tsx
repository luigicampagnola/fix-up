import { LRUCache } from 'lru-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

const rateLimitCache = new LRUCache<string, number>({
  max: 500, // cantidad máxima de entradas (IPs)
  ttl: 60 * 60 * 1000, // tiempo de vida en milisegundos (1 hora)
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ipStr = Array.isArray(ip) ? ip[0] : ip;

  // Verificamos que se haya obtenido la IP
  if (!ipStr) {
    return res
      .status(400)
      .json({ error: 'No se pudo determinar la IP del cliente.' });
  }

  const currentCount = rateLimitCache.get(ipStr) || 0;
  const MAX_REQUESTS = 1;

  if (currentCount >= MAX_REQUESTS) {
    return res.status(429).json({
      error:
        'Demasiadas solicitudes desde esta IP, por favor inténtalo de nuevo más tarde.',
    });
  }

  rateLimitCache.set(ipStr, currentCount + 1);
  res.status(200).json({ message: 'Formulario completado exitosamente!' });
}
