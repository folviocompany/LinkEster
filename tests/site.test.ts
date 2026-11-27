import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mapsUrl, publicUrl, whatsappUrl, site } from '../src/config/site.ts';

test('WhatsApp preserva o número e codifica corretamente a mensagem em português', () => {
  const url = new URL(whatsappUrl(site.whatsapp.phone, site.whatsapp.message)!);
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/556792742036');
  assert.equal(url.searchParams.get('text'), site.whatsapp.message);
  assert.equal(whatsappUrl('+55 (67) 9274-2036', 'Olá!'), 'https://wa.me/556792742036?text=Ol%C3%A1!');
});
test('Dados ausentes e placeholders não criam links falsos', () => {
  for (const phone of ['', '55DDDNUMERO', '123', '556792742036?text=teste']) assert.equal(whatsappUrl(phone, 'Olá'), undefined);
  assert.equal(mapsUrl(''), undefined);
  assert.equal(publicUrl('/'), undefined);
});
test('Maps aceita o link informado ou um endereço corretamente codificado', () => {
  assert.equal(mapsUrl('', site.location.mapsUrl), site.location.mapsUrl);
  const url = new URL(mapsUrl('Rua de Exemplo, 10 & sala 2')!);
  assert.equal(url.searchParams.get('query'), 'Rua de Exemplo, 10 & sala 2');
  for (const invalid of ['javascript:alert(1)', 'https://example.com', 'https://maps.app.goo.gl.example.com/test', 'https://www.google.com/search?q=test']) assert.equal(mapsUrl('', invalid), undefined);
});
test('SEO só utiliza uma URL pública HTTPS configurada', () => {
  assert.equal(publicUrl('/og-image.png', 'https://beauty.example'), 'https://beauty.example/og-image.png');
  assert.equal(publicUrl('/', 'PREENCHER'), undefined);
  assert.equal(publicUrl('/', 'javascript:alert(1)'), undefined);
});
