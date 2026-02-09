export async function submitApplicationMock(payload) {
  await new Promise((r) => setTimeout(r, 1200));
  return { ok: true, referenceId: `REF-${Date.now()}` };
}
