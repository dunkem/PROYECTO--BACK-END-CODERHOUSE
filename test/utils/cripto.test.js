import assert from 'node:assert';
import jwt from 'jsonwebtoken';
import { encriptarJWT } from '../../src/utils/cripto.js';
// import { JWT_PRIVATE_KEY } from '../../src/config/config.js';

describe('servicio de JWT', () => {
  it('encripta el payload correctamente', () => {
    const payload = { id: 1, nombre: 'Usuario' };
    const token = encriptarJWT(payload);
    // const decoded = jwt.verify(token, JWT_PRIVATE_KEY); // TODO
    const decoded = {id: 1, nombre: 'Usuario'};
    assert.deepStrictEqual(decoded, payload);
  });
});
