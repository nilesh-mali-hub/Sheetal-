import { createClient } from "@libsql/client";
const db = createClient({
  url: "file:data/wedding.db",
});
async function run() {
  await db.execute("DELETE FROM wishes WHERE name = 'ufgauf'");
  console.log("Deleted");
}
run();
