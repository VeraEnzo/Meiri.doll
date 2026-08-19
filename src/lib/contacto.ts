// Datos de contacto en un solo lugar. Los usan ContactSection, el botón
// flotante de WhatsApp y el Footer.
//
// Si `whatsapp` o `email` quedan vacíos, los accesos correspondientes no se
// renderizan. Así el sitio nunca publica un link a un número inventado ni un
// mailto vacío: la funcionalidad se activa sola al completar el dato.

export const contacto = {
  instagram: 'https://www.instagram.com/meiri.doll/',
  instagramUsuario: '@meiri.doll',
  tiktok: 'https://www.tiktok.com/@meiri.doll',

  // Formato internacional, solo dígitos: código de país + área + número.
  // Para un celular de Rosario: 54 + 9 + 341 + número, sin el 0 y sin el 15.
  // Ejemplo de la forma esperada: '5493411234567'
  whatsapp: '5493413198698',

  email: 'meiridoll.contacto@gmail.com',
} as const;

// Texto que aparece ya escrito al abrir el chat, para que se sepa de dónde
// viene la consulta.
const MENSAJE_WHATSAPP = '¡Hola! Me interesa una prenda de Meiri Doll ♡';
const ASUNTO_MAIL = 'Consulta desde la web';

export const linkWhatsapp = contacto.whatsapp
  ? `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(MENSAJE_WHATSAPP)}`
  : null;

export const linkMail = contacto.email
  ? `mailto:${contacto.email}?subject=${encodeURIComponent(ASUNTO_MAIL)}`
  : null;

/**
 * Link de WhatsApp para consultar por un producto puntual: el nombre viaja en
 * el mensaje, así se sabe de qué prenda se trata sin tener que preguntarlo.
 *
 * Devuelve null si no hay número configurado, para que quien lo use pueda caer
 * de vuelta en la zona de contacto.
 */
export function linkWhatsappProducto(producto: string): string | null {
  if (!contacto.whatsapp) return null;

  const texto = `¡Hola! Quiero consultar por ${producto} ♡`;

  return `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(texto)}`;
}
