async function delProductInCartShop(cid, pid) {
  const cidarr = cid.split("carts/");
  const cidt = cidarr[1];
  const FETCH_URL = `https://back-proyecto-final-production-bee0.up.railway.app/api/carts/${cidt}/product/${pid}`;
  const { status } = await fetch(FETCH_URL, { method: "DELETE" });

  if (status === 200) {
    location.reload();
  }
}
