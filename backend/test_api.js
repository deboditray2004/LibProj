async function test() {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=1`);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
test();
