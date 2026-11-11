// Edite os dados da profissional somente aqui.
export const site = {
  name: 'BeautyByEsterr',
  profession: 'Lash Designer',
  headline: 'Realçando sua beleza, um olhar de cada vez.',
  description: 'Um toque de delicadeza para valorizar o que há de mais bonito em você.',
  photo: '/images/esterr.webp',
  photoAlt: 'Esterr, lash designer da BeautyByEsterr, em seu espaço de atendimento.',
  whatsapp: {
    phone: '5567984532330', // Código do país + DDD + número, somente dígitos.
    message: 'Olá, Ester! Vim pelo Instagram e gostaria de agendar um horário.',
  },
  location: {
    address: '', // PREENCHER se desejar usar um endereço em vez do link abaixo.
    mapsUrl: 'https://maps.app.goo.gl/nLy3Y7Gh7RwJRH6w8',
  },
  // PREENCHER após o primeiro deploy: https://seu-projeto.vercel.app
  url: '',
  seo: {
    title: 'BeautyByEsterr | Lash Designer',
    description: 'Realçando sua beleza, um olhar de cada vez. Conheça a BeautyByEsterr, agende seu horário e encontre nosso espaço de atendimento.',
    image: '/og-image.png',
  },
} as const;

export function whatsappUrl(phone: string, message: string): string | undefined {
  const digits = phone.replace(/[\s()+.-]/g, '');
  if (!/^55[1-9]\d{9,10}$/.test(digits)) return undefined;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function mapsUrl(address: string, directUrl = ''): string | undefined {
  if (directUrl.trim()) {
    try {
      const url = new URL(directUrl);
      const allowedHosts = ['maps.app.goo.gl', 'maps.google.com', 'www.google.com', 'google.com', 'www.google.com.br'];
      if (url.protocol !== 'https:' || !allowedHosts.includes(url.hostname)) return undefined;
      if (['www.google.com', 'google.com', 'www.google.com.br'].includes(url.hostname) && !/^\/maps(?:\/|$)/.test(url.pathname)) return undefined;
      return url.href;
    } catch { return undefined; }
  }
  return address.trim() ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.trim())}` : undefined;
}

export function publicUrl(path: string, base = ''): string | undefined {
  try {
    const url = new URL(base);
    if (url.protocol !== 'https:') return undefined;
    return new URL(path, url).href;
  } catch { return undefined; }
}
