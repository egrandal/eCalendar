import { test } from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "../src/app.js";
test("liveness responde aunque la base de datos falle; readiness devuelve 503 sin secretos", async () => {
  const app = await buildApp({
    checkDatabase: async () => {
      throw new Error("mysql://secret");
    },
  });
  try {
    assert.equal((await app.inject("/health")).statusCode, 200);
    const ready = await app.inject("/ready");
    assert.equal(ready.statusCode, 503);
    assert.deepEqual(ready.json(), {
      status: "unavailable",
      database: "unavailable",
    });
  } finally {
    await app.close();
  }
});
test("readiness comprueba la conexión y cierra los recursos", async () => {
  let checked = false;
  let closed = false;
  const app = await buildApp({
    checkDatabase: async () => {
      checked = true;
    },
    closeDatabase: async () => {
      closed = true;
    },
  });
  try {
    const response = await app.inject("/ready");
    assert.equal(response.statusCode, 200);
    assert.equal(checked, true);
  } finally {
    await app.close();
  }
  assert.equal(closed, true);
});
