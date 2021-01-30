export default async function fetcher(url) {
  await fetch(url).then((r) => r.json())
}
