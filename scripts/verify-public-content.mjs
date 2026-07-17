import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const fixFriendNotes = process.argv.includes("--strip-friend-notes");
const violations = [];
const warnings = [];
const CREDENTIAL_PATTERN = /(?:\bsk-[a-z0-9_-]{16,}\b|\bAIza[0-9A-Za-z_-]{20,}\b|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/i;
const TEXT_EXTENSIONS = new Set([".css", ".html", ".js", ".json", ".md", ".mdx", ".svg", ".toml", ".ts", ".txt", ".yaml", ".yml"]);

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

for (const directory of ["posts", "essays", "friends", "home", "site", "anime", "assets"]) {
	requireDirectory(directory);
}

const homeSurfaceZh = readJsonObject("home/surface.zh.json");
const homeSurfaceEn = readJsonObject("home/surface.en.json");
const homeTruthZh = readJsonObject("home/truth.zh.json");
const homeTruthEn = readJsonObject("home/truth.en.json");
for (const [label, value] of [
	["home/surface.zh.json", homeSurfaceZh],
	["home/surface.en.json", homeSurfaceEn],
]) {
	requireKeys(value, ["meta", "surface", "profile", "services"], label);
}
for (const [label, value] of [
	["home/truth.zh.json", homeTruthZh],
	["home/truth.en.json", homeTruthEn],
]) {
	requireKeys(value, ["responses", "eggs", "fallback", "greeting"], label);
}

const profile = readJsonObject("site/profile.json");
const banner = readJsonObject("site/banner.json");
const navigation = readJsonObject("site/navigation.json");
readJsonObject("site/announcement.json");
const sponsor = readJsonObject("site/sponsor.json");
const music = readJsonObject("site/music.json");
requireMarkdownFrontmatter("site/sponsor.md", ["title"]);

requireKeys(profile, ["name", "avatar"], "site/profile.json");
validateAssetReference(profile.avatar, "assets/profile", "site/profile.json avatar");
for (const link of Array.isArray(profile.links) ? profile.links : []) {
	if (link?.image) validateAssetReference(link.image, "assets/profile", "site/profile.json link image");
}
validateAssetList(banner.desktop, "assets/banner/desktop", "site/banner.json desktop");
validateAssetList(banner.mobile, "assets/banner/mobile", "site/banner.json mobile");
if (!Array.isArray(navigation.links)) violations.push("site/navigation.json missing array: links");
if (!Array.isArray(sponsor.supporters)) violations.push("site/sponsor.json missing array: supporters");
if (!Array.isArray(music.tracks)) {
	violations.push("site/music.json missing array: tracks");
} else {
	for (const [index, track] of music.tracks.entries()) {
		if (!track?.title) violations.push(`site/music.json track ${index + 1} missing title`);
		if (track?.cover) validateAssetReference(track.cover, "assets/music", `site/music.json track ${index + 1} cover`);
		if (track?.url) validateAssetReference(track.url, "assets/music", `site/music.json track ${index + 1} url`);
	}
}
if (walk(path.join(root, "assets", "sponsor")).length === 0) {
	violations.push("required asset directory is empty: assets/sponsor");
}

for (const value of [homeSurfaceZh, homeSurfaceEn, homeTruthZh, homeTruthEn, profile, banner, navigation, sponsor, music]) {
	collectExternalUrlWarnings(value);
}

for (const status of ["watching", "completed", "planned"]) {
	requireDirectory(`anime/${status}`);
	requireDirectory(`anime/assets/${status}`);
	for (const filePath of walk(path.join(root, "anime", status))) {
		if (!/\.(md|mdx)$/i.test(filePath)) continue;
		const content = fs.readFileSync(filePath, "utf8");
		const fields = parseFrontmatter(frontmatter(content));
		if (!fields.title) violations.push(`anime entry missing title: ${relative(filePath)}`);
		if (fields.status !== status) violations.push(`anime status must match directory ${status}: ${relative(filePath)}`);
		if (fields.cover && !isExternalUrl(fields.cover)) {
			const coverPath = fields.cover.startsWith("/assets/anime/")
				? path.join(root, "anime", fields.cover.slice("/assets/anime/".length))
				: path.join(root, "anime", "assets", status, fields.cover);
			if (!fs.existsSync(coverPath)) {
				violations.push(`missing local asset: ${relative(coverPath)} (${relative(filePath)})`);
			}
		}
		collectExternalUrlWarnings(fields);
	}
}

const publicSlugs = new Map();
for (const directory of ["posts", "essays"]) {
	for (const filePath of walk(path.join(root, directory))) {
		if (!/\.(md|mdx)$/i.test(filePath)) continue;
		const content = fs.readFileSync(filePath, "utf8");
		const metadata = frontmatter(content);
		if (!metadata) violations.push(`content requires frontmatter: ${relative(filePath)}`);
		if (!parseFrontmatter(metadata).title) violations.push(`content missing title: ${relative(filePath)}`);
		if (/^(?:draft|private|unlisted)\s*:\s*true\s*$/im.test(metadata)) {
			violations.push(`unpublished content: ${relative(filePath)}`);
		}
		const slug = contentSlug(directory, filePath);
		if (publicSlugs.has(slug)) {
			violations.push(`duplicate public slug ${slug}: ${publicSlugs.get(slug)}, ${relative(filePath)}`);
		} else {
			publicSlugs.set(slug, relative(filePath));
		}
	}
}

for (const directory of ["posts", "essays", "friends", "home", "site", "anime", "assets"]) {
	for (const filePath of walk(path.join(root, directory))) {
		if (!TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase())) continue;
		if (CREDENTIAL_PATTERN.test(fs.readFileSync(filePath, "utf8"))) {
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

for (const warning of warnings) console.warn(`[public-content] warning: ${warning}`);

if (violations.length) {
	for (const violation of violations) console.error(`[public-content] ${violation}`);
	process.exit(1);
}

console.log("[public-content] verification passed");

function frontmatter(content) {
	return content.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
}

function parseFrontmatter(value) {
	const fields = {};
	for (const line of String(value || "").split(/\r?\n/)) {
		const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*)\s*:\s*(.*)$/);
		if (!match) continue;
		fields[match[1]] = match[2].trim().replace(/^(["'])(.*)\1$/, "$2");
	}
	return fields;
}

function requireDirectory(relativePath) {
	const directory = path.join(root, relativePath);
	if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
		violations.push(`required directory missing: ${relativePath}`);
	}
}

function readJsonObject(relativePath) {
	const filePath = path.join(root, relativePath);
	if (!fs.existsSync(filePath)) {
		violations.push(`required file missing: ${relativePath}`);
		return {};
	}
	try {
		const value = JSON.parse(fs.readFileSync(filePath, "utf8"));
		if (!value || typeof value !== "object" || Array.isArray(value)) {
			violations.push(`JSON root must be an object: ${relativePath}`);
			return {};
		}
		return value;
	} catch (error) {
		violations.push(`JSON parse failed: ${relativePath}: ${error.message}`);
		return {};
	}
}

function requireKeys(value, keys, label) {
	for (const key of keys) {
		if (value?.[key] === undefined) violations.push(`${label} missing required key: ${key}`);
	}
}

function requireMarkdownFrontmatter(relativePath, keys) {
	const filePath = path.join(root, relativePath);
	if (!fs.existsSync(filePath)) {
		violations.push(`required file missing: ${relativePath}`);
		return;
	}
	const metadata = parseFrontmatter(frontmatter(fs.readFileSync(filePath, "utf8")));
	for (const key of keys) {
		if (!metadata[key]) violations.push(`${relativePath} missing frontmatter key: ${key}`);
	}
}

function validateAssetList(value, base, label) {
	if (!Array.isArray(value) || value.length === 0) {
		violations.push(`${label} must be a non-empty array`);
		return;
	}
	for (const asset of value) validateAssetReference(asset, base, label);
}

function validateAssetReference(value, base, label) {
	if (typeof value !== "string" || !value.trim()) {
		violations.push(`${label} must reference a local asset`);
		return;
	}
	if (isExternalUrl(value)) return;
	const normalized = value.replace(/^\/assets\//, "");
	const baseName = base.replace(/^assets\//, "");
	const assetPath = normalized.startsWith(`${baseName}/`)
		? path.join(root, "assets", normalized)
		: path.join(root, base, normalized);
	if (!fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile()) {
		violations.push(`missing local asset: ${relative(assetPath)} (${label})`);
	}
}

function collectExternalUrlWarnings(value) {
	if (Array.isArray(value)) {
		for (const item of value) collectExternalUrlWarnings(item);
		return;
	}
	if (!value || typeof value !== "object") return;
	for (const item of Object.values(value)) {
		if (typeof item === "string" && /^https?:\/\//i.test(item)) {
			try {
				new URL(item);
			} catch {
				warnings.push(`invalid external URL: ${item}`);
			}
		} else {
			collectExternalUrlWarnings(item);
		}
	}
}

function isExternalUrl(value) {
	return /^https?:\/\//i.test(String(value || ""));
}

function contentSlug(directory, filePath) {
	const segments = path.relative(path.join(root, directory), filePath)
		.replaceAll("\\", "/")
		.replace(/\.(md|mdx)$/i, "")
		.split("/");
	if (segments.at(-1)?.toLowerCase() === "index") segments.pop();
	if (segments.length > 1 && segments.at(-1)?.toLowerCase() === segments.at(-2)?.toLowerCase()) segments.pop();
	return segments.join("/").toLowerCase();
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
