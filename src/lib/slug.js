export default function createSlug(title, length) {
  const time = (() => {
    const _d = new Date();
    const d = _d.getTime() / 1000000;
    return parseFloat(d.toString().split(".")[1]);
  })();
  const slug = ((finalSlug) => {
    const cleaned = title.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
    finalSlug = cleaned.replaceAll(" ", "-").toLowerCase();
    if (finalSlug.length > length) {
      return finalSlug.slice(0, length - 1);
    } else {
      return finalSlug;
    }
  })();
  return `${slug}-${time}`;
}
