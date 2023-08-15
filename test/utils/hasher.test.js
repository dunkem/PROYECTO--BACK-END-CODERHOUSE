import assert from 'node:assert';
import { bcCompare, hasher } from '../../src/utils/hasher.js';

describe('servicio de criptografia', () => {
  it('encripta contraseñas correctamente', () => {
    const password = '123abc';
    const passwordHasheado = hasher(password);
    assert.notStrictEqual(passwordHasheado, password);
  });

  it('compara contraseñas hasheadas correctamente', () => {
    const password = '123abc';
    const passwordHasheado = hasher(password);
    assert.ok(bcCompare(password, passwordHasheado));
  });
});
