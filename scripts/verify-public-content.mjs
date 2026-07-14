import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const fixFriendNotes = process.argv.includes("--strip-friend-notes");
const violations = [];

for (const name of [".obsidian", ".env"]) {
	if (fs.existsSync(path.join(root, name))) {
		violations.push(`private path must not be published: ${name}`);
	}
}

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
	if (entry.name.startsWith("user_archive-")) {
		violations.push(`user archive must not be published: ${entry.name}`);
	}
}

for (const directory of ["posts", "essays"]) {
	for (const filePath of walk(path.join(root, directory))) {
		if (!/\.(md|mdx)$/i.test(filePath)) continue;
		const content = fs.readFileSync(filePath, "utf8");
		if (/^(?:draft|private|unlisted)\s*:\s*true\s*$/im.test(frontmatter(content))) {
			violations.push(`unpublished content: ${relative(filePath)}`);
		}
		if (/(?:\bsk-[a-z0-9_-]{16,}\b|\bAIza[0-9A-Za-z_-]{20,}\b|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/i.test(content)) {
			violations.push(`credential-like content: ${relative(filePath)}`);
		}
	}
}

for (const filePath of walk(path.join(root, "friends"))) {
	if (!/\.(md|mdx)$/i.test(filePath)) continue;
	const content = fs.readFileSync(filePath, "utf8");
	const match = content.match(/^(---\r?\n[\s\S]*?\r?\n---)\r?\n?([\s\S]*)$/);
	if (!match) {
		violations.push(`friend file requires frontmatter: ${relative(filePath)}`);
		continue;
	}
	if (match[2].trim()) {
		if (fixFriendNotes) {
			fs.writeFileSync(filePath, `${match[1]}\n`, "utf8");
		} else {
			violations.push(`friend note must be removed: ${relative(filePath)}`);
		}
	}
}

if (violations.length) {
	for (const violation of violations) console.error(`[public-content] ${violation}`);
	process.exit(1);
}

console.log("[public-content] verification passed");

function frontmatter(content) {
	return content.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
}

function walk(directory) {
	if (!fs.existsSync(directory)) return [];
	const files = [];
	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		const filePath = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...walk(filePath));
		else if (entry.isFile()) files.push(filePath);
	}
	return files;
}

function relative(filePath) {
	return path.relative(root, filePath).replaceAll("\\", "/");
}
